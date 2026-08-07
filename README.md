# MobX and Redux, side by side

[![CircleCI](https://circleci.com/gh/alpersonalwebsite/react-mobx-redux.svg?style=shield)](https://circleci.com/gh/alpersonalwebsite/react-mobx-redux)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

The same small app implemented twice, in two columns on one page: the left half gets
its users from **MobX**, the right half from **Redux**. Both render through the same
`UserList`, so the only difference on screen is where the data came from.

| | MobX | Redux |
| --- | --- | --- |
| where state lives | class instances with `observable` fields | one plain object in a single store |
| how it changes | assign inside `runInAction` | dispatch an action, reducer returns a new object |
| how a component subscribes | `inject('UserStore')` + `observer` | `connect(mapStateToProps)` |
| what re-renders | components that *read* a changed observable | components whose `mapStateToProps` output changed |
| async | just `await` inside a store method | needs middleware (`redux-thunk` here) |

The short version: MobX tracks reads and re-renders what depends on them, so you write
less plumbing. Redux makes every change an explicit, serialisable event, so you can see
the whole history. Neither is the answer; the shapes of the two files are the argument.

## The MobX side shows two arrangements

- `src/mobexStores/` — a `RootStore` that constructs `UserStore` and `OtherUserStore`
  and hands each a reference to itself. This is what you want once stores need to talk.
- `src/SingleMobexStore.js` — a standalone store exported as a ready-made instance,
  with no root store around it. Fine until two stores need each other.

Both are passed to `<Provider>` in `src/index.js`, which is why `inject` can name any
of the three.

## Two things that were wrong, and are worth recognising

**The reducer appended instead of replacing.** `case FETCH_USERS: return [...state,
...action.payload]`. One mount hides it; dispatch twice and every user appears twice.
A `FETCH_USERS` payload is the current answer to "who are the users", not an increment.

**Neither side could report a failure.** Both the thunk and all three MobX stores
caught their errors and called `console.log`, so a dead endpoint left the UI showing
an empty list, identical to a successful fetch that returned nobody. Both sides now
carry `loading` and `error` next to the data, and the MobX ones assign them inside
`runInAction`, which is what MobX requires for observers to be notified.

## Pointing it at an API

`REACT_APP_API_URL`, defaulting to `http://localhost:3333/api/users`, which is
[node-express-postgresql](https://github.com/alpersonalwebsite/node-express-postgresql)
running locally. That is the project the original hardcoded endpoint
(`node-express-postgre.herokuapp.com`) served, before Heroku retired its free dynos.

```shell
cp .env.example .env      # then edit it, .env is gitignored
```

Create React App **inlines** `REACT_APP_` variables into the bundle at build time, so
an endpoint URL is fine there and a token is not.

## Installation, running, and the one gotcha

```shell
npm ci
npm start
npm run lint
npm test
npm run build
```

`babel-eslint` is pinned to exactly `10.0.1`. `react-scripts` 3.0.1 runs a preflight
check that refuses to build when `node_modules` holds a different version of it, so
`^10.0.3` fails the build outright with a long "Check if babel-eslint is outside your
project directory" message that never mentions the actual mismatch.

`.eslintrc` sets `parser: babel-eslint`. Without it, eslint's default parser hits the
class properties in the MobX stores and stops with `Parsing error: Unexpected token =`,
which is why `npm run lint` had never completed a run here.

**On Node 17 or newer `npm run build` fails** with `ERR_OSSL_EVP_UNSUPPORTED`: webpack 4
asking OpenSSL 3 for MD4, not a problem with this code. The versions here are
deliberately frozen, so pass the flag:

```shell
NODE_OPTIONS=--openssl-legacy-provider npm run build
```
