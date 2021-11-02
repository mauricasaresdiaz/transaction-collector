const chai = require('chai');
const { Connector } = require('../../../src/transaction/connector');

const { expect } = chai;

describe('Repository', () => {
    it('should fail trying to get transaction with base Connector', async () => {
        const repository = new Connector();

        try {
            repository.getTransaction();
            expect.fail('repository.getTransaction() should fail but it executed correctly');
        } catch (error) {
            expect(error).to.be.an('Error');
            expect(error.message).to.be.equal('getTransaction not implemented in base Connector');
        }
    });

    it('should fail trying to get transaction receipt with base Connector', async () => {
        const service = new Connector();

        try {
            service.getTransactionReceipt();
            expect.fail('service.getTransactionReceipt() should fail but it executed correctly');
        } catch (error) {
            expect(error).to.be.an('Error');
            expect(error.message).to.be.equal('getTransactionReceipt not implemented in base Connector');
        }
    });
});
