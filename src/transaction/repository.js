class TransactionRepository {
    insertTransaction() {
        throw new Error('insertTransaction method not implemented in base class TransactionRepository');
    }

    findTransaction() {
        throw new Error('findTransaction method not implemented in base class TransactionRepository');
    }
}

module.exports = {
    TransactionRepository,
};
