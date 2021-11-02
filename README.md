# Transaction Collector


This module aims to obtain transactions from different blockchain networks through their transaction hash.
However, it currently only supports searching for transactions on the Binance Smart Chain.

## Scripts

### Run Transaction Collector

```
node src/index.js --mongoUri=<<a_mongo_uri>> --transactionHash=<<a_transaction_hash>>
```
For instance:
```
node src/index.js --mongoUri=mongodb://localhost:27017/transactions --transactionHash="0x105e93511e04a18aa9af281b137c2768ce1b70fdf3d7a508e3c52d24304c8b29"
```

### Run eslint:

```
npm run lint
```

### Run tests:

```
npm run test
```
