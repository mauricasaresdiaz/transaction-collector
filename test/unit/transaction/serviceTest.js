const chai = require('chai');
const { TransactionService } = require('../../../src/transaction/service');

const { expect } = chai;

describe('Transaction Service', () => {
    it('should fail trying to insertTransaction with base service', async () => {
        const service = new TransactionService();

        try {
            service.insertTransaction();
            expect.fail('service.insertTransaction() should fail but it executed correctly');
        } catch (error) {
            expect(error).to.be.an('Error');
            expect(error.message).to.be.equal('insertTransaction method not implemented in base class TransactionService');
        }
    });

    it('should fail trying to findTransaction with base service', async () => {
        const service = new TransactionService();

        try {
            service.findTransaction();
            expect.fail('service.findTransaction() should fail but it executed correctly');
        } catch (error) {
            expect(error).to.be.an('Error');
            expect(error.message).to.be.equal('findTransaction method not implemented in base class TransactionService');
        }
    });
});
