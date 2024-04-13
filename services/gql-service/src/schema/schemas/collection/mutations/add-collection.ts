import { DataSourceContext } from '@server/schema/data-source-context';
import {
  MutationAddCollectionArgs,
  MutationResponse,
  Resolver,
  ResolverTypeWrapper,
} from '@server/__generated__/resolvers-types';
import { produce } from '@server/config/rabbit-mq-client';

export const addCollection: Resolver<
  ResolverTypeWrapper<MutationResponse>,
  {},
  DataSourceContext,
  Partial<MutationAddCollectionArgs>
> = async (_parent, { contractAddress }) => {
  // Need to add separate collection to track contract addresses that were just entered
  const result = await produce(contractAddress);

  if (result) {
    return {
      code: 200,
      message: 'Successfully posted to message to MQ',
      success: true,
    };
  }

  return {
    code: 500,
    message: 'Could not send message to MQ',
    success: false,
  };
};
