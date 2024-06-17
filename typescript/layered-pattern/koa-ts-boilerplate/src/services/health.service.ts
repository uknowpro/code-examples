import { GetHealthQuery } from 'src/core/queries';

export class GetHealthService implements GetHealthQuery {
  private static instance: GetHealthService | null = null;

  static getInstance(): GetHealthService {
    if (!GetHealthService.instance) {
      GetHealthService.instance = new GetHealthService();
    }
    return GetHealthService.instance;
  }

  async health(): Promise<undefined> {}
}
