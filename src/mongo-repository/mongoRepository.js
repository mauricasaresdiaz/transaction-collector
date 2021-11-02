const { TransactionModel } = require('./transaction');
const { TransactionRepository } = require('../transaction/repository');

class TransactionMongoRepository extends TransactionRepository {
    constructor(collectionName) {
        super();
        this.repository = new TransactionModel(collectionName).model;
    }

    async insertTransaction(transaction) {
        let insertedTransaction;

        try {
            insertedTransaction = await this.repository.create(transaction);
        } catch (error) {
            throw new Error(`Error inserting transaction in TransactionMongoRepository: ${error.message}`);
        }

        if (!insertedTransaction) {
            throw new Error('Error inserting transaction in TransactionMongoRepository: '
                + 'the transaction was not inserted in the MongoDB');
        }

        return insertedTransaction;
    }

    async findTransaction(hash) {
        if (!hash) {
            throw new Error('Error finding transaction in TransactionMongoRepository: '
                + 'an empty transactionHash is not allowed in find method');
        }

        let transaction;

        try {
            transaction = await this.repository.findOne({ hash });
        } catch (error) {
            throw new Error(`Error finding transaction in TransactionMongoRepository: ${error.message}`);
        }

        if (!transaction) {
            throw new Error('Error finding transaction in TransactionMongoRepository: '
                + `no transaction found for transaction hash: ${hash}`);
        }

        return transaction;
    }
}

module.exports = {
    TransactionMongoRepository,
};
