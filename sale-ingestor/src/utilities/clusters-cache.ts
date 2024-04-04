import { Clusters } from '@server/data/clusters';
import { Cluster } from '@server/models/cluster';

/**
 * A Cache for all clusters and their tokens.
 *
 * Primary key is the contractAddress
 * Value is another Map where the primary key is the tokenId and the value is a clusterId
 */
export class ClustersCache {
  cache: Map<string, Map<string, string>>;
  private clusters: Clusters;

  constructor() {
    this.cache = new Map<string, Map<string, string>>();
    this.clusters = new Clusters();
  }

  /**
   * Gets all clusters from the DB and fills the cache with the necessary data
   */
  public async fillCache() {
    const clusters = await this.clusters.getClusterDataForCache();

    for (const cluster of clusters) {
      this.add(cluster);
    }
  }

  /**
   * Adds tokenIds from a cluster to the cache for a given contractAddress
   * @param cluster Cluster to add
   */
  public add(cluster: Cluster) {
    const tokenMap = this.cache.get(cluster.contractAddress);
    if (tokenMap) {
      for (const tokenId of cluster.tokenIds) {
        tokenMap.set(tokenId, cluster.id);
      }
    } else {
      const newMap = new Map<string, string>();

      for (const tokenId of cluster.tokenIds) {
        newMap.set(tokenId, cluster.id);
      }

      this.cache.set(cluster.contractAddress, newMap);
    }

    return;
  }

  /**
   * Gets the clusterId associated with a tokenId for a contractAddress
   * @param contractAddress The contractAddress to search within
   * @param tokenId The tokenId to get
   * @returns clusterId or undefined if it does not exist
   */
  public getClusterId(
    contractAddress: string,
    tokenId: string
  ): string | undefined {
    const tokenMap = this.cache.get(contractAddress);

    if (tokenMap) {
      return tokenMap.get(tokenId);
    }
    return undefined;
  }

  /**
   * Get all contract addresses from the cache
   * @returns A list of all the contract addresses from the cache
   */
  public getAllContractAddresses() {
    return Array.from(this.cache.keys());
  }
}
