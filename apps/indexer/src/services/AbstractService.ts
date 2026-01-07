export abstract class AbstractService {
  abstract name: string;
  abstract run: () => Promise<void>;
}