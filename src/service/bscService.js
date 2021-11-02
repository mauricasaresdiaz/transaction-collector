const { TransactionService } = require('../transaction/service');
const { TransactionCollector } = require('../transaction/collector');
const { TransactionMongoRepository } = require('../mongo-repository/mongoRepository');
const { Web3Connector } = require('../web3-collector/webTConnector');

class BscService extends TransactionService {
    constructor(mainnet) {
        super();
        const mainnetRpcUri = 'https://bsc-dataseed1.binance.org:443';
        const testnetRpcUri = 'https://data-seed-prebsc-1-s1.binance.org:8545';

        const rpcUri = mainnet ? mainnetRpcUri : testnetRpcUri;
        this.web3Connector = new Web3Connector(rpcUri);
        this.mongoRepository = new TransactionMongoRepository('bsc_Transactions');
        this.collector = new TransactionCollector(this.web3Connector, this.mongoRepository);
    }

    insertTransaction(hash) {
        return this.collector.collectTransaction(hash);
    }

    findTransaction(hash) {
        return this.mongoRepository.findTransaction(hash);
    }
}

module.exports = {
    BscService,
};
