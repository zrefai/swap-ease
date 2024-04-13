import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer, ContextFunction } from '@apollo/server';
import resolvers from '@server/schema';
import { loadFiles } from '@graphql-tools/load-files';
import { GraphQLError } from 'graphql';
import {
  StandaloneServerContextFunctionArgument,
  startStandaloneServer,
} from '@apollo/server/standalone';
import {
  DataSourceContext,
  dataSourceContext,
} from '@server/schema/data-source-context';

const port = process.env.PORT ?? '4001';
const subgraphName = require('../../package.json').name;
const routerSecret = process.env.ROUTER_SECRET;

const context: ContextFunction<
  [StandaloneServerContextFunctionArgument],
  DataSourceContext
> = async ({ req }) => {
  if (routerSecret && req.headers['router-authorization'] !== routerSecret) {
    throw new GraphQLError('Missing router authentication', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    });
  }

  return {
    ...dataSourceContext,
    auth: req.headers.authorization,
  };
};

async function startApolloServer() {
  const typeDefs = await loadFiles('./src/**/*.graphql');
  const schema = buildSubgraphSchema({ typeDefs, resolvers });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    context,
    listen: { port: Number.parseInt(port) },
  });

  console.log(`🚀  Subgraph ${subgraphName} ready at ${url}`);
  console.log(`Run rover dev --url ${url} --name ${subgraphName}`);
}

export default startApolloServer;
