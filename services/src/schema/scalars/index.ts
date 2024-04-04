import { Resolvers } from '../../__generated__/resolvers-types';
import cursorScalar from './cursor';
import dateScalar from './date';
import positiveIntScalar from './positive-int';

export const Scalars: Resolvers = {
  Date: dateScalar,
  Cursor: cursorScalar,
  PositiveInt: positiveIntScalar,
};
