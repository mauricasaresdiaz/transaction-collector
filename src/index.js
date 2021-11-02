const { connect, disconnect } = require('mongoose');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { BscService } = require('./service/bscService');

const { argv } = yargs(hideBin(process.argv)).option('transactionHash', { string: true });

/**
 * Just an example of how you can insert and look up a transaction in the Binance Smart Chain
 * using the BscService.
 */
async function main() {
    if (!argv.mongoUri || !argv.transactionHash) {
        throw new Error('Missing parameters');
    }

    try {
        await connect(argv.mongoUri);
        console.log('Connected to MongoDB successfully!');
    } catch (err) {
        throw new Error(`Connection to MongoDB failed: ${err.message}`);
    }

    const bscService = new BscService(true);

    try {
        const transactionInserted = await bscService.insertTransaction(argv.transactionHash);

        if (transactionInserted) {
            console.log('Transaction Successfully inserted');
        }
    } catch (err) {
        console.log(`Error in bscService.insertTransaction: ${err.message}`);
    }

    try {
        const transaction = await bscService.findTransaction(argv.transactionHash);

        if (transaction) {
            console.log(JSON.stringify(transaction, null, 4));
        }
    } catch (err) {
        console.log(`Error in bscService.insertTransaction: ${err.message}`);
    }
}

main().finally(async () => {
    await disconnect();
});
