import { getSignaturesForAddress } from "../utils/solana.js";
import { AbstractService } from "./AbstractService.js"
import { DLN_PROGRAMS_DIC, FETCHER_DEFAULT_MODE } from "./constants.js";
import { ProgramData, DLN_PROGRAM } from "../types.js";
import { IndexerStateRepo, TransactionsRepo } from '@debridge-test/db';

const indexerStateRepo = new IndexerStateRepo();
const transactionsRepo = new TransactionsRepo();

export class SignaturesFetcherService extends AbstractService {
  private readonly programData: ProgramData<DLN_PROGRAM>;

  constructor(public readonly name: string, program: DLN_PROGRAM) {
    super()
    this.programData = DLN_PROGRAMS_DIC[program]
  }

  run = async () => {
    const state = await indexerStateRepo.getState(this.programData.programId)
    const mode = state?.mode ?? FETCHER_DEFAULT_MODE;
    let lastSignature = state?.lastSignature;

    console.log(`fetcher for program ${this.programData.programId} runs in mode "${mode}"`);

    if (mode == "historical") {
      lastSignature = await this.fetchHistorical();
      await indexerStateRepo.setState(this.programData.programId, lastSignature, "live")

      console.log(`fetcher for program ${this.programData.programId} switches to "live"`);
    } 

    return this.fetchLive(lastSignature!)
  }

  async fetchHistorical(): Promise<string> {
    let before;
    let lastTrx;

    while(true) {
      const sigs = await getSignaturesForAddress(this.programData.programPubkey, { before });
      console.log(`indexer for program ${this.programData.programId} got ${sigs.length} signatures before ${before}`);

      if (sigs.length === 0) break;

      lastTrx = sigs.pop()!;
      before = lastTrx.signature;

      await transactionsRepo.insertTransactions(sigs.map(el => {
        return {
          blockTime: new Date((el.blockTime ?? 0) * 1000),
          programId: this.programData.programId,
          signature: el.signature,
          slot: el.slot.toString(),
          processed: false
        }
      }))

      await indexerStateRepo.setState(this.programData.programId, lastTrx.signature, "historical")
    }

    return lastTrx!.signature
  }

  async fetchLive(lastSignature: string) {
    const sigs = await getSignaturesForAddress(this.programData.programPubkey, { until: lastSignature });
    if (sigs.length > 0) {
      console.log(`fetcher for program ${this.programData.programId} got ${sigs.length} live signatures`);

      await transactionsRepo.insertTransactions(sigs.map(el => {
        return {
          blockTime: new Date((el.blockTime ?? 0) * 1000),
          programId: this.programData.programId,
          signature: el.signature,
          slot: el.slot.toString(),
          processed: false
        }
      }))

      await indexerStateRepo.setState(this.programData.programId, sigs[0].signature, "live")
    }
  }
}