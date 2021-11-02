class TransactionService {
    insertTransaction() {
        throw new Error('insertTransaction method not implemented in base class TransactionService');
    }

    findTransaction() {
        throw new Error('findTransaction method not implemented in base class TransactionService');
    }
}

module.exports = {
    TransactionService,
};
