export { Audit } from './audit';
export { Cluster } from './cluster';
export { ClustersAggregate } from './clusters-aggregate';
export {
  Collection,
  CollectionAttribute,
  CollectionAttributeValue,
} from './collection';
export { Sale, Currency, Amount, Price, FeeBreakdown } from './sale';
export { Token, TokenAttribute } from './token';

export type PartialModel<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/**
 * We replace '.' in a url source with the char below because of dot notation rules in MongoDB. Use this when we need to reformat a URL back into
 */
export const SourceSpecialChar = '*';
