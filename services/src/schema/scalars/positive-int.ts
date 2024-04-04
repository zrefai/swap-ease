import { GraphQLScalarType, Kind } from 'graphql';

const positiveIntScalar = new GraphQLScalarType({
  name: 'PositiveInt',
  description: 'PositiveInt custom scalar type',
  serialize(value) {
    if (value instanceof Number && value.valueOf() > 0) {
      return value.valueOf();
    }
    throw Error(
      'GraphQL PositiveInt Scalar serializer expected a `Number` object or value greater than 0'
    );
  },
  parseValue(value) {
    if (typeof value === 'number' && value > 0) {
      return value;
    }
    throw new Error(
      'GraphQL Positive Scalar parser expected a `number` or value greater than 0'
    );
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT && parseInt(ast.value) > 0) {
      // Convert hard-coded AST string to integer
      return parseInt(ast.value);
    }
    // Invalid hard-coded value (not an integer or greater than 0)
    return null;
  },
});

export default positiveIntScalar;
