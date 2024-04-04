import { Tokens } from '../data/tokens';
import { Clusters } from '../data/clusters';
import { ClustersAggregates } from '../data/clustersAggregates';
import { Collections } from '../data/collections';
import { Sales } from '../data/sales';

//This interface is used with graphql-codegen to generate types for resolvers context
export interface DataSourceContext {
  dataSources: {
    collections: Collections;
    clustersAggregates: ClustersAggregates;
    clusters: Clusters;
    tokens: Tokens;
    sales: Sales;
  };
  auth?: string;
}

export const dataSourceContext: DataSourceContext = {
  dataSources: {
    collections: new Collections(),
    clustersAggregates: new ClustersAggregates(),
    clusters: new Clusters(),
    tokens: new Tokens(),
    sales: new Sales(),
  },
};
