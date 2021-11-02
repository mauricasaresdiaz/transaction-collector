const Web3 = require('web3');
const { Connector } = require('../transaction/connector');

/**
 * Represents a Connector that obtains transactions from the network using Web3.
 */
class Web3Connector extends Connector {
    constructor(rpcURI) {
        super();
        this.rpcURI = rpcURI;
        this.web3 = new Web3(this.rpcURI);
    }

    /**
     * Get a transaction with an specific hash using web3
     * @params transactionHash a transaction hash to get a transaction from the network
     * @returns a transaction with an specific hash
     */
    async getTransaction(transactionHash) {
        const transaction = await this.web3.eth.getTransaction(transactionHash);
        transaction.receipt = await this.getTransactionReceipt(transactionHash);

        return transaction;
    }

    /**
     * Get all logs of a transaction with an specific hash using web3
     * @params transactionHash a transaction hash to get all logs from that transaction
     * @returns all logs of a transaction with an specific hash
     */
    getTransactionReceipt(transactionHash) {
        return this.web3.eth.getTransactionReceipt(transactionHash);
    }
}

module.exports = {
    Web3Connector,
};
