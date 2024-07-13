import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { DataSourceContext } from '../schema/data-source-context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Cursor: { input: any; output: any; }
  Date: { input: any; output: any; }
  PositiveInt: { input: any; output: any; }
  _FieldSet: { input: any; output: any; }
};

export type Attribute = {
  __typename?: 'Attribute';
  type?: Maybe<Scalars['String']['output']>;
  values?: Maybe<Array<Maybe<AttributeValues>>>;
};

export type AttributeValues = {
  __typename?: 'AttributeValues';
  count?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Cluster = {
  __typename?: 'Cluster';
  attributes: Array<Maybe<Attribute>>;
  contractAddress: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  latestSaleBlockNumber: Scalars['Int']['output'];
  rankAverage?: Maybe<Scalars['Float']['output']>;
  tokenIds: Array<Scalars['String']['output']>;
  totalSales?: Maybe<Scalars['Int']['output']>;
  totalSalesByMarketplace: Array<Maybe<SaleByMarketplace>>;
  totalVolume?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ClustersAggregate = {
  __typename?: 'ClustersAggregate';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  latestSaleBlockNumber?: Maybe<Scalars['Int']['output']>;
  totalSales?: Maybe<Scalars['Int']['output']>;
  totalSalesByMarketplace?: Maybe<Array<Maybe<SaleByMarketplace>>>;
  totalVolume?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type Collection = {
  __typename?: 'Collection';
  createdAt?: Maybe<Scalars['Date']['output']>;
  discordUrl?: Maybe<Scalars['String']['output']>;
  externalUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  totalSupply: Scalars['String']['output'];
  twitterUrl?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type CollectionAttribute = {
  __typename?: 'CollectionAttribute';
  type?: Maybe<Scalars['String']['output']>;
  values?: Maybe<Array<Maybe<CollectionAttributeValues>>>;
};

export type CollectionAttributeValues = {
  __typename?: 'CollectionAttributeValues';
  count?: Maybe<Scalars['Int']['output']>;
  tokenIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CollectionEdge = {
  __typename?: 'CollectionEdge';
  cursor: Scalars['Cursor']['output'];
  node: Collection;
};

export type CollectionsConnection = {
  __typename?: 'CollectionsConnection';
  edges: Array<Maybe<CollectionEdge>>;
  pageInfo: PageInfo;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCollection?: Maybe<MutationResponse>;
};


export type MutationAddCollectionArgs = {
  contractAddress: Scalars['String']['input'];
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type PageArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['PositiveInt']['input']>;
  last?: InputMaybe<Scalars['PositiveInt']['input']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['Cursor']['output']>;
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  cluster?: Maybe<Cluster>;
  clusters: Array<Maybe<Cluster>>;
  clustersAggregate?: Maybe<ClustersAggregate>;
  collection?: Maybe<Collection>;
  collectionAttributes?: Maybe<Array<Maybe<CollectionAttribute>>>;
  collections: CollectionsConnection;
  salesAnalysis: SalesAnalysis;
  salesForCluster: SalesConnection;
  salesForToken: SalesConnection;
  token?: Maybe<Token>;
  tokens: Array<Maybe<Token>>;
};


export type QueryClusterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClustersArgs = {
  contractAddress: Scalars['String']['input'];
};


export type QueryClustersAggregateArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCollectionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCollectionAttributesArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCollectionsArgs = {
  pageArgs?: InputMaybe<PageArgs>;
};


export type QuerySalesAnalysisArgs = {
  clusterId: Scalars['String']['input'];
};


export type QuerySalesForClusterArgs = {
  clusterId: Scalars['String']['input'];
  pageArgs?: InputMaybe<PageArgs>;
};


export type QuerySalesForTokenArgs = {
  contractAddress: Scalars['String']['input'];
  pageArgs?: InputMaybe<PageArgs>;
  tokenId: Scalars['String']['input'];
};


export type QueryTokenArgs = {
  contractAddress: Scalars['String']['input'];
  tokenId: Scalars['String']['input'];
};


export type QueryTokensArgs = {
  contractAddress: Scalars['String']['input'];
  tokenIds: Array<Scalars['String']['input']>;
};

export type Sale = {
  __typename?: 'Sale';
  batchId?: Maybe<Scalars['String']['output']>;
  block: Scalars['Int']['output'];
  clusterId: Scalars['String']['output'];
  contractAddress: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  feeBreakdown?: Maybe<Array<Maybe<SaleFeeBreakdown>>>;
  fillSource?: Maybe<Scalars['String']['output']>;
  fromAddress: Scalars['String']['output'];
  marketplaceFeeBps?: Maybe<Scalars['Int']['output']>;
  orderId: Scalars['String']['output'];
  orderKind?: Maybe<Scalars['String']['output']>;
  orderSource?: Maybe<Scalars['String']['output']>;
  paidFullRoyalty?: Maybe<Scalars['Boolean']['output']>;
  price?: Maybe<SalePrice>;
  royaltyFeeBps?: Maybe<Scalars['Int']['output']>;
  saleId: Scalars['String']['output'];
  timestamp: Scalars['Date']['output'];
  toAddress: Scalars['String']['output'];
  tokenId: Scalars['String']['output'];
  txHash: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type SaleByMarketplace = {
  __typename?: 'SaleByMarketplace';
  marketplace?: Maybe<Scalars['String']['output']>;
  numberOfSales?: Maybe<Scalars['Int']['output']>;
};

export type SaleEdge = {
  __typename?: 'SaleEdge';
  cursor: Scalars['Cursor']['output'];
  node: Sale;
};

export type SaleFeeBreakdown = {
  __typename?: 'SaleFeeBreakdown';
  bps?: Maybe<Scalars['Int']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  rawAmount?: Maybe<Scalars['String']['output']>;
  recipient?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
};

export type SalePrice = {
  __typename?: 'SalePrice';
  amount?: Maybe<SalePriceAmount>;
  currency?: Maybe<SalePriceCurrency>;
  netAmount?: Maybe<SalePriceAmount>;
};

export type SalePriceAmount = {
  __typename?: 'SalePriceAmount';
  decimal?: Maybe<Scalars['Float']['output']>;
  native?: Maybe<Scalars['Float']['output']>;
  raw?: Maybe<Scalars['String']['output']>;
  usd?: Maybe<Scalars['Float']['output']>;
};

export type SalePriceCurrency = {
  __typename?: 'SalePriceCurrency';
  contract?: Maybe<Scalars['String']['output']>;
  decimals?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
};

export type SalesAnalysis = {
  __typename?: 'SalesAnalysis';
  edges: Array<SalesScatterEdge>;
  native: SalesStats;
  salesCount: Scalars['Int']['output'];
  usd: SalesStats;
};

export type SalesConnection = {
  __typename?: 'SalesConnection';
  edges: Array<Maybe<SaleEdge>>;
  pageInfo: PageInfo;
};

export type SalesScatterEdge = {
  __typename?: 'SalesScatterEdge';
  name: Scalars['String']['output'];
  native: SalesStats;
  points: Array<Maybe<SalesScatterPoint>>;
  salesCount: Scalars['Int']['output'];
  usd: SalesStats;
};

export type SalesScatterPoint = {
  __typename?: 'SalesScatterPoint';
  blockNumber: Scalars['Int']['output'];
  native: Scalars['Float']['output'];
  timestamp: Scalars['Date']['output'];
  usd: Scalars['Float']['output'];
};

export type SalesStats = {
  __typename?: 'SalesStats';
  average: Scalars['Float']['output'];
  highest: Scalars['Float']['output'];
  lowest: Scalars['Float']['output'];
  marketplaceFeeVolume: Scalars['Float']['output'];
  royaltyFeeVolume: Scalars['Float']['output'];
  volume: Scalars['Float']['output'];
};

export type Token = {
  __typename?: 'Token';
  attributes?: Maybe<Array<Maybe<TokenAttribute>>>;
  contractAddress: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  tokenId: Scalars['String']['output'];
  totalScore?: Maybe<Scalars['Float']['output']>;
};

export type TokenAttribute = {
  __typename?: 'TokenAttribute';
  key?: Maybe<Scalars['String']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ReferenceResolver<TResult, TReference, TContext> = (
      reference: TReference,
      context: TContext,
      info: GraphQLResolveInfo
    ) => Promise<TResult> | TResult;

      type ScalarCheck<T, S> = S extends true ? T : NullableCheck<T, S>;
      type NullableCheck<T, S> = Maybe<T> extends T ? Maybe<ListCheck<NonNullable<T>, S>> : ListCheck<T, S>;
      type ListCheck<T, S> = T extends (infer U)[] ? NullableCheck<U, S>[] : GraphQLRecursivePick<T, S>;
      export type GraphQLRecursivePick<T, S> = { [K in keyof T & keyof S]: ScalarCheck<T[K], S[K]> };
    

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Attribute: ResolverTypeWrapper<Attribute>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  AttributeValues: ResolverTypeWrapper<AttributeValues>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Cluster: ResolverTypeWrapper<Cluster>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ClustersAggregate: ResolverTypeWrapper<ClustersAggregate>;
  Collection: ResolverTypeWrapper<Collection>;
  CollectionAttribute: ResolverTypeWrapper<CollectionAttribute>;
  CollectionAttributeValues: ResolverTypeWrapper<CollectionAttributeValues>;
  CollectionEdge: ResolverTypeWrapper<CollectionEdge>;
  CollectionsConnection: ResolverTypeWrapper<CollectionsConnection>;
  Cursor: ResolverTypeWrapper<Scalars['Cursor']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<MutationResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  PageArgs: PageArgs;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']['output']>;
  Query: ResolverTypeWrapper<{}>;
  Sale: ResolverTypeWrapper<Sale>;
  SaleByMarketplace: ResolverTypeWrapper<SaleByMarketplace>;
  SaleEdge: ResolverTypeWrapper<SaleEdge>;
  SaleFeeBreakdown: ResolverTypeWrapper<SaleFeeBreakdown>;
  SalePrice: ResolverTypeWrapper<SalePrice>;
  SalePriceAmount: ResolverTypeWrapper<SalePriceAmount>;
  SalePriceCurrency: ResolverTypeWrapper<SalePriceCurrency>;
  SalesAnalysis: ResolverTypeWrapper<SalesAnalysis>;
  SalesConnection: ResolverTypeWrapper<SalesConnection>;
  SalesScatterEdge: ResolverTypeWrapper<SalesScatterEdge>;
  SalesScatterPoint: ResolverTypeWrapper<SalesScatterPoint>;
  SalesStats: ResolverTypeWrapper<SalesStats>;
  Token: ResolverTypeWrapper<Token>;
  TokenAttribute: ResolverTypeWrapper<TokenAttribute>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Attribute: Attribute;
  String: Scalars['String']['output'];
  AttributeValues: AttributeValues;
  Int: Scalars['Int']['output'];
  Cluster: Cluster;
  ID: Scalars['ID']['output'];
  Float: Scalars['Float']['output'];
  ClustersAggregate: ClustersAggregate;
  Collection: Collection;
  CollectionAttribute: CollectionAttribute;
  CollectionAttributeValues: CollectionAttributeValues;
  CollectionEdge: CollectionEdge;
  CollectionsConnection: CollectionsConnection;
  Cursor: Scalars['Cursor']['output'];
  Date: Scalars['Date']['output'];
  Mutation: {};
  MutationResponse: MutationResponse;
  Boolean: Scalars['Boolean']['output'];
  PageArgs: PageArgs;
  PageInfo: PageInfo;
  PositiveInt: Scalars['PositiveInt']['output'];
  Query: {};
  Sale: Sale;
  SaleByMarketplace: SaleByMarketplace;
  SaleEdge: SaleEdge;
  SaleFeeBreakdown: SaleFeeBreakdown;
  SalePrice: SalePrice;
  SalePriceAmount: SalePriceAmount;
  SalePriceCurrency: SalePriceCurrency;
  SalesAnalysis: SalesAnalysis;
  SalesConnection: SalesConnection;
  SalesScatterEdge: SalesScatterEdge;
  SalesScatterPoint: SalesScatterPoint;
  SalesStats: SalesStats;
  Token: Token;
  TokenAttribute: TokenAttribute;
}>;

export type ContactDirectiveArgs = {
  description?: Maybe<Scalars['String']['input']>;
  email?: Maybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type ContactDirectiveResolver<Result, Parent, ContextType = DataSourceContext, Args = ContactDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AttributeResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Attribute'] = ResolversParentTypes['Attribute']> = ResolversObject<{
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  values?: Resolver<Maybe<Array<Maybe<ResolversTypes['AttributeValues']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AttributeValuesResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['AttributeValues'] = ResolversParentTypes['AttributeValues']> = ResolversObject<{
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClusterResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Cluster'] = ResolversParentTypes['Cluster']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Cluster']>, { __typename: 'Cluster' } & (GraphQLRecursivePick<ParentType, {"id":true}> | GraphQLRecursivePick<ParentType, {"contractAddress":true}>), ContextType>;
  attributes?: Resolver<Array<Maybe<ResolversTypes['Attribute']>>, ParentType, ContextType>;
  contractAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  latestSaleBlockNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rankAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  tokenIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  totalSales?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalSalesByMarketplace?: Resolver<Array<Maybe<ResolversTypes['SaleByMarketplace']>>, ParentType, ContextType>;
  totalVolume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClustersAggregateResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['ClustersAggregate'] = ResolversParentTypes['ClustersAggregate']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['ClustersAggregate']>, { __typename: 'ClustersAggregate' } & GraphQLRecursivePick<ParentType, {"id":true}>, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  latestSaleBlockNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalSales?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalSalesByMarketplace?: Resolver<Maybe<Array<Maybe<ResolversTypes['SaleByMarketplace']>>>, ParentType, ContextType>;
  totalVolume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CollectionResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Collection']>, { __typename: 'Collection' } & GraphQLRecursivePick<ParentType, {"id":true}>, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  discordUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  externalUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalSupply?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  twitterUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CollectionAttributeResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CollectionAttribute'] = ResolversParentTypes['CollectionAttribute']> = ResolversObject<{
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  values?: Resolver<Maybe<Array<Maybe<ResolversTypes['CollectionAttributeValues']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CollectionAttributeValuesResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CollectionAttributeValues'] = ResolversParentTypes['CollectionAttributeValues']> = ResolversObject<{
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tokenIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CollectionEdgeResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CollectionEdge'] = ResolversParentTypes['CollectionEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Collection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CollectionsConnectionResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CollectionsConnection'] = ResolversParentTypes['CollectionsConnection']> = ResolversObject<{
  edges?: Resolver<Array<Maybe<ResolversTypes['CollectionEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface CursorScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cursor'], any> {
  name: 'Cursor';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MutationResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addCollection?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, RequireFields<MutationAddCollectionArgs, 'contractAddress'>>;
}>;

export type MutationResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  cluster?: Resolver<Maybe<ResolversTypes['Cluster']>, ParentType, ContextType, RequireFields<QueryClusterArgs, 'id'>>;
  clusters?: Resolver<Array<Maybe<ResolversTypes['Cluster']>>, ParentType, ContextType, RequireFields<QueryClustersArgs, 'contractAddress'>>;
  clustersAggregate?: Resolver<Maybe<ResolversTypes['ClustersAggregate']>, ParentType, ContextType, RequireFields<QueryClustersAggregateArgs, 'id'>>;
  collection?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType, RequireFields<QueryCollectionArgs, 'id'>>;
  collectionAttributes?: Resolver<Maybe<Array<Maybe<ResolversTypes['CollectionAttribute']>>>, ParentType, ContextType, RequireFields<QueryCollectionAttributesArgs, 'id'>>;
  collections?: Resolver<ResolversTypes['CollectionsConnection'], ParentType, ContextType, Partial<QueryCollectionsArgs>>;
  salesAnalysis?: Resolver<ResolversTypes['SalesAnalysis'], ParentType, ContextType, RequireFields<QuerySalesAnalysisArgs, 'clusterId'>>;
  salesForCluster?: Resolver<ResolversTypes['SalesConnection'], ParentType, ContextType, RequireFields<QuerySalesForClusterArgs, 'clusterId'>>;
  salesForToken?: Resolver<ResolversTypes['SalesConnection'], ParentType, ContextType, RequireFields<QuerySalesForTokenArgs, 'contractAddress' | 'tokenId'>>;
  token?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QueryTokenArgs, 'contractAddress' | 'tokenId'>>;
  tokens?: Resolver<Array<Maybe<ResolversTypes['Token']>>, ParentType, ContextType, RequireFields<QueryTokensArgs, 'contractAddress' | 'tokenIds'>>;
}>;

export type SaleResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Sale'] = ResolversParentTypes['Sale']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Sale']>, { __typename: 'Sale' } & (GraphQLRecursivePick<ParentType, {"contractAddress":true,"tokenId":true}> | GraphQLRecursivePick<ParentType, {"clusterId":true}>), ContextType>;
  batchId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  block?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  clusterId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contractAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  feeBreakdown?: Resolver<Maybe<Array<Maybe<ResolversTypes['SaleFeeBreakdown']>>>, ParentType, ContextType>;
  fillSource?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fromAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  marketplaceFeeBps?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  orderId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orderKind?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orderSource?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paidFullRoyalty?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['SalePrice']>, ParentType, ContextType>;
  royaltyFeeBps?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  saleId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  toAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaleByMarketplaceResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['SaleByMarketplace'] = ResolversParentTypes['SaleByMarketplace']> = ResolversObject<{
  marketplace?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  numberOfSales?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaleEdgeResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['SaleEdge'] = ResolversParentTypes['SaleEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Sale'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaleFeeBreakdownResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['SaleFeeBreakdown'] = ResolversParentTypes['SaleFeeBreakdown']> = ResolversObject<{
  bps?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  kind?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rawAmount?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  recipient?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SalePriceResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['SalePrice'] = ResolversParentTypes['SalePrice']> = ResolversObject<{
  amount?: Resolver<Maybe<ResolversTypes['SalePriceAmount']>, ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['SalePriceCurrency']>, ParentType, ContextType>;
  netAmount?: Resolver<Maybe<ResolversTypes['SalePriceAmount']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SalePriceAmountResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['SalePriceAmount'] = ResolversParentTypes['SalePriceAmount']> = ResolversObject<{
  decimal?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  native?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  raw?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  usd?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SalePriceCurrencyResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['SalePriceCurrency'] = ResolversParentTypes['SalePriceCurrency']> = ResolversObject<{
  contract?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  decimals?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SalesAnalysisResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['SalesAnalysis'] = ResolversParentTypes['SalesAnalysis']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['SalesScatterEdge']>, ParentType, ContextType>;
  native?: Resolver<ResolversTypes['SalesStats'], ParentType, ContextType>;
  salesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  usd?: Resolver<ResolversTypes['SalesStats'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SalesConnectionResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['SalesConnection'] = ResolversParentTypes['SalesConnection']> = ResolversObject<{
  edges?: Resolver<Array<Maybe<ResolversTypes['SaleEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SalesScatterEdgeResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['SalesScatterEdge'] = ResolversParentTypes['SalesScatterEdge']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  native?: Resolver<ResolversTypes['SalesStats'], ParentType, ContextType>;
  points?: Resolver<Array<Maybe<ResolversTypes['SalesScatterPoint']>>, ParentType, ContextType>;
  salesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  usd?: Resolver<ResolversTypes['SalesStats'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SalesScatterPointResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['SalesScatterPoint'] = ResolversParentTypes['SalesScatterPoint']> = ResolversObject<{
  blockNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  native?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  usd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SalesStatsResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['SalesStats'] = ResolversParentTypes['SalesStats']> = ResolversObject<{
  average?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  highest?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  lowest?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  marketplaceFeeVolume?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  royaltyFeeVolume?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  volume?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Token']>, { __typename: 'Token' } & GraphQLRecursivePick<ParentType, {"contractAddress":true,"tokenId":true}>, ContextType>;
  attributes?: Resolver<Maybe<Array<Maybe<ResolversTypes['TokenAttribute']>>>, ParentType, ContextType>;
  contractAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenAttributeResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['TokenAttribute'] = ResolversParentTypes['TokenAttribute']> = ResolversObject<{
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = DataSourceContext> = ResolversObject<{
  Attribute?: AttributeResolvers<ContextType>;
  AttributeValues?: AttributeValuesResolvers<ContextType>;
  Cluster?: ClusterResolvers<ContextType>;
  ClustersAggregate?: ClustersAggregateResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  CollectionAttribute?: CollectionAttributeResolvers<ContextType>;
  CollectionAttributeValues?: CollectionAttributeValuesResolvers<ContextType>;
  CollectionEdge?: CollectionEdgeResolvers<ContextType>;
  CollectionsConnection?: CollectionsConnectionResolvers<ContextType>;
  Cursor?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PositiveInt?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Sale?: SaleResolvers<ContextType>;
  SaleByMarketplace?: SaleByMarketplaceResolvers<ContextType>;
  SaleEdge?: SaleEdgeResolvers<ContextType>;
  SaleFeeBreakdown?: SaleFeeBreakdownResolvers<ContextType>;
  SalePrice?: SalePriceResolvers<ContextType>;
  SalePriceAmount?: SalePriceAmountResolvers<ContextType>;
  SalePriceCurrency?: SalePriceCurrencyResolvers<ContextType>;
  SalesAnalysis?: SalesAnalysisResolvers<ContextType>;
  SalesConnection?: SalesConnectionResolvers<ContextType>;
  SalesScatterEdge?: SalesScatterEdgeResolvers<ContextType>;
  SalesScatterPoint?: SalesScatterPointResolvers<ContextType>;
  SalesStats?: SalesStatsResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  TokenAttribute?: TokenAttributeResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = DataSourceContext> = ResolversObject<{
  contact?: ContactDirectiveResolver<any, any, ContextType>;
}>;
