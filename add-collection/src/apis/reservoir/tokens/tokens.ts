import { paths } from "@reservoir0x/reservoir-sdk";
import { ReservoirAPI } from "../reservoir-api";
import assert from "assert";
import { mapToken } from "./mappers/map-token";

export class Tokens extends ReservoirAPI {
  constructor() {
    super();
  }

  async getAllTokensInCollection(contractAddress: string) {
    // Construct URL with parameters
    const params = new URLSearchParams({
      collection: contractAddress,
      sortBy: "updatedAt",
      limit: "1000",
      includeAttributes: "true",
    });
    const url = new URL(`tokens/v7?${params.toString()}`, this.apiURL);

    // Fetch first response
    const response = (await super.fetch(url, {
      method: "GET",
    })) as paths["/tokens/v7"]["get"]["responses"]["200"]["schema"];

    assert(
      response.tokens,
      `Tokens was undefined on first pass for contract address: ${contractAddress}`,
    );

    const tokens = [...response.tokens];
    let continuationToken = response.continuation;

    console.log(`Total tokens retrieved: ${tokens.length}`);

    // When continuation token exists, get the rest of the collection
    while (continuationToken) {
      // Set continuation token in URL parameters
      params.set("continuation", continuationToken);
      const newUrl = new URL(`tokens/v7?${params.toString()}`, this.apiURL);

      const newResponse = (await super.fetch(newUrl, {
        method: "GET",
      })) as paths["/tokens/v7"]["get"]["responses"]["200"]["schema"];

      assert(
        newResponse.tokens,
        `Tokens was undefined while fetching more tokens for contract address: ${contractAddress}`,
      );

      tokens.push(...newResponse.tokens);

      // Replace previous token with new one from latest response
      continuationToken = newResponse.continuation;
      console.log(`Total tokens retrieved: ${tokens.length}`);
    }

    return tokens.map((token) => mapToken(token));
  }
}
