class Connector {
    getTransaction() {
        throw Error('getTransaction not implemented in base Connector');
    }

    getTransactionReceipt() {
        throw Error('getTransactionReceipt not implemented in base Connector');
    }
}

module.exports = {
    Connector,
};
