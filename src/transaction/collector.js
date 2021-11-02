const { TransactionRepository } = require('./repository');
const { Connector } = require('./connector');

class CollectorError extends Error {
    constructor(m) {
        super(m);
        Object.setPrototypeOf(this, CollectorError.prototype);
    }
}

class TransactionCollector {
    constructor(connector, transactionRepository) {
        if (!(connector instanceof Connector)) {
            throw new CollectorError('Error in collectTransaction constructor: connector should be an instance of Connector');
        }

        if (!(transactionRepository instanceof TransactionRepository)) {
            throw new CollectorError('Error in collectTransaction constructor: transactionRepository should be an instance of TransactionRepository');
        }

        this.connector = connector;
        this.transactionRepository = transactionRepository;
    }

    async collectTransaction(transactionHash) {
        try {
            const transaction = await this.connector.getTransaction(transactionHash);
            return await this.transactionRepository.insertTransaction(transaction);
        } catch (error) {
            throw new CollectorError(`Error in collectTransaction: ${error.message}`);
        }
    }
}

module.exports = {
    TransactionCollector,
};
