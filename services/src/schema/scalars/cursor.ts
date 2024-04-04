import { GraphQLScalarType, Kind } from 'graphql';
import { ObjectId } from 'mongodb';

const cursorScalar = new GraphQLScalarType({
  name: 'Cursor',
  description: 'Cursor custom scalar type, used in pagination',
  serialize(value) {
    if (value instanceof ObjectId) {
      return value.toString();
    }
    throw Error(
      'GraphQL Cursor Scalar serializer expected an `ObjectId` object'
    );
  },
  parseValue(value) {
    if (typeof value === 'string') {
      return new ObjectId(value);
    }
    throw new Error('GraphQL Cursor Scalar parser expected a `string`');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      // Convert hard-coded AST string to integer and then to Date
      return new ObjectId(ast.value);
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

export default cursorScalar;
