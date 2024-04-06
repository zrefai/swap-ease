export class ReservoirAPI {
  private readonly apiKey: string;
  readonly apiURL: string;

  constructor() {
    this.apiKey = process.env.RESERVOIR_API_KEY as string;
    this.apiURL = process.env.RESERVOIR_API_URL as string;
  }

  async fetch(url: URL, init?: RequestInit) {
    const options = {
      headers: { accept: '*/*', 'x-api-key': this.apiKey },
      ...init,
    };

    return await fetch(url, options)
      .then((response) => response.json())
      .catch((err) => console.error(err));
  }
}
