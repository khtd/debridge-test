import { AbstractService } from "./AbstractService.js";
import { DailyVolumeRepo } from '@debridge-test/db';

const dailyVolumeRepo = new DailyVolumeRepo();

export class DailyVolumeSerive extends AbstractService {
  constructor(public readonly name: string) {
    super()
  }

  async run() {
    await dailyVolumeRepo.recomputeAll();
  }
}