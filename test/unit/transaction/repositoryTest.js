const chai = require('chai');
const { TransactionRepository } = require('../../../src/transaction/repository');

const { expect } = chai;

describe('Repository', () => {
    it('should fail trying to insertTransaction with base TransactionRepository', async () => {
        const repository = new TransactionRepository();

        try {
            repository.insertTransaction();
            expect.fail('service.insertTransaction() should fail but it executed correctly');
        } catch (error) {
            expect(error).to.be.an('Error');
            expect(error.message).to.be.equal('insertTransaction method not implemented in base class TransactionRepository');
        }
    });

    it('should fail trying to findTransaction with base TransactionRepository', async () => {
        const service = new TransactionRepository();

        try {
            service.findTransaction();
            expect.fail('service.findTransaction() should fail but it executed correctly');
        } catch (error) {
            expect(error).to.be.an('Error');
            expect(error.message).to.be.equal('findTransaction method not implemented in base class TransactionRepository');
        }
    });
});
