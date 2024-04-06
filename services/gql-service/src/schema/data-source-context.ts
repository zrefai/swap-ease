import { db } from '../config/db-client';
import {
  Clusters,
  ClustersAggregates,
  Collections,
  Sales,
  Tokens,
} from 'swap-ease-data';

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
    collections: new Collections(db),
    clustersAggregates: new ClustersAggregates(db),
    clusters: new Clusters(db),
    tokens: new Tokens(db),
    sales: new Sales(db),
  },
};
