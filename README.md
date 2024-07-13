# Swap Ease

Mono-repo for all the components of the swap-ease project. A project that enables people to arbitrage trade NFT tokens using insightful data.

// TODO: Maybe we can have the scatter plot switch between native and USD prices
// TODO: Follow this for alias resolutions https://github.com/ilearnio/module-alias/issues/74

## Setup

### Environment variables

All components use environment variable files. Each README within a component specifies which ENV variables are needed. Go to each component listed below and make sure to create the necessary `.env` variable file for each.

Current components:

- `/services`:

  - `/add-collection`
  - `/gql-service`
  - `/sale-ingestor`

- `/clients`:
  - `/swap-ease`

### Install dependencies

This mono-repo is managed by npm workspaces. All we need to do to install dependencies:

```
// In root folder
npm install
```

### Build all components

All packages and components need to be built, so run:

```
// In root folder
npm run build
```

This will run the build command within every Typescript component, starting with the packages and then the components.

For information about setting up the `cluster-collection` service, [start here](./services/cluster-collection/README.md)

## Managing the mono-repo

### Adding a package for local development (unpublished npm package)

Here is the current list of local packages used:

- `libraries`:

  - `data`: A package containing common data patterns and models used across different components within the swap-ease mono-repo.
  - `utils`: A package containing common utilities used across different components within the swap-ease mono-repo.

If a new package is needed, we can add one using these instructions:

1. Under `/libraries` create a new folder for the package

```
mkdir new_package
```

2. Step into the new folder and initialize a new `package.json` file:

```
npm init
```

3. Install these devDependencies in `new_package`:

```
npm install ts-node tsup npm-run-all prettier rimraf typescript
```

4. Add these scripts within `package.json`:

```json
"scripts": {
    "clean": "rimraf ./dist",
    "format": "npx prettier --write src",
    "build": "npm-run-all clean format && tsc && tsup"
}
```

5. Create a `tsconfig.json` file:

```
// Ensure that `outDir` is set to `dist`
// You can copy one of the existing tsconfig.json files from the other packages.
// OR
tsc --init
```

6. Create a `tsup.config.ts` file and copy these contents into the file:

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  splitting: false,
  sourcemap: true,
  clean: true,
});
```

7. Finally, create `/src` and `/src/index.ts` and everything should be setup

### Using a local package as a dependency

We have some components that use our local packages as dependencies. For example, `/libraries/data` is a dependency in `/services/add-collection`, `/services/gql-service`, and `/services/sale-ingestor`.

If we have a local package under `/libraries` titled `new_package`, we can add it to `/services/component` like so:

```
npm install ./libraries/new_package -w ./services/component
```
