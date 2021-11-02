const chai = require('chai');
const sinon = require('sinon');
const { TransactionCollector } = require('../../../src/transaction/collector');
const { Connector } = require('../../../src/transaction/connector');
const { TransactionRepository } = require('../../../src/transaction/repository');

const { expect } = chai;

describe('Repository', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should create a TransactionCollector successfully', async () => {
        const connector = new Connector();
        const repository = new TransactionRepository();
        const collector = new TransactionCollector(connector, repository);

        expect(!!collector).to.be.equal(true);
    });

    it('should fail trying to create a TransactionCollector with an invalid connector', async () => {
        const connector = 'Invalid connector';
        const repository = new TransactionRepository();

        try {
            const collector = new TransactionCollector(connector, repository);
            expect(!!collector).to.be.equal(false);
            expect.fail('new TransactionCollector() should fail but it executed correctly');
        } catch (error) {
            expect(error).to.be.an('Error');
            expect(error.message).to.be.equal('Error in collectTransaction constructor: connector should be an instance of Connector');
        }
    });

    it('should fail trying to create a TransactionCollector with an invalid repository', async () => {
        const connector = new Connector();
        const repository = 'Invalid repository';

        try {
            const collector = new TransactionCollector(connector, repository);
            expect(!!collector).to.be.equal(false);
            expect.fail('new TransactionCollector() should fail but it executed correctly');
        } catch (error) {
            expect(error).to.be.an('Error');
            expect(error.message).to.be.equal('Error in collectTransaction constructor: transactionRepository should be an instance of TransactionRepository');
        }
    });

    it('should collect a transaction successfully', async () => {
        const connector = new Connector();
        const repository = new TransactionRepository();
        const collector = new TransactionCollector(connector, repository);

        const transaction = { hash: '0x' };
        expect(!!collector).to.be.equal(true);

        const stubConnector = sinon.stub(connector, 'getTransaction');
        stubConnector.onCall(0).returns(Promise.resolve(transaction));

        const stubRepository = sinon.stub(repository, 'insertTransaction');
        stubRepository.onCall(0).returns(Promise.resolve(transaction));

        const collectedTransaction = await collector.collectTransaction(transaction.hash);

        expect(collectedTransaction).to.be.deep.equal(transaction);
    });

    it('should fail collecting a transaction due to a connector error', async () => {
        const connector = new Connector();
        const repository = new TransactionRepository();
        const collector = new TransactionCollector(connector, repository);

        const transaction = { hash: '0x' };
        expect(!!collector).to.be.equal(true);

        const stubConnector = sinon.stub(connector, 'getTransaction');
        stubConnector.onCall(0).returns(Promise.reject(new Error('Error in Connector')));

        const stubRepository = sinon.stub(repository, 'insertTransaction');
        stubRepository.onCall(0).returns(Promise.resolve(transaction));

        try {
            await collector.collectTransaction(transaction.hash);
            expect.fail('collector.collectTransaction() should fail but it executed correctly');
        } catch (error) {
            expect(error).to.be.an('Error');
            expect(error.message).to.be.equal('Error in collectTransaction: Error in Connector');
        }
    });

    it('should fail collecting a transaction due to a repository error', async () => {
        const connector = new Connector();
        const repository = new TransactionRepository();
        const collector = new TransactionCollector(connector, repository);

        const transaction = { hash: '0x' };
        expect(!!collector).to.be.equal(true);

        const stubConnector = sinon.stub(connector, 'getTransaction');
        stubConnector.onCall(0).returns(Promise.resolve(transaction));

        const stubRepository = sinon.stub(repository, 'insertTransaction');
        stubRepository.onCall(0).returns(Promise.reject(new Error('Error in Repository')));

        try {
            await collector.collectTransaction(transaction.hash);
            expect.fail('collector.collectTransaction() should fail but it executed correctly');
        } catch (error) {
            expect(error).to.be.an('Error');
            expect(error.message).to.be.equal('Error in collectTransaction: Error in Repository');
        }
    });
});
