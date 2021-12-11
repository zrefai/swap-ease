export type NavigationKey = 'root' | 'trading';

export const NavigationConfig: {
  [key in NavigationKey]: {
    route: string;
  };
} = {
  root: {
    route: '/',
  },
  trading: {
    route: '/trading',
  },
};
