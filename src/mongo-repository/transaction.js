const { model, Schema } = require('mongoose');

const transactionSchema = new Schema(
    {
        hash: {
            type: Schema.Types.String,
            required: true,
            unique: true,
        },
        transactionIndex: {
            type: Schema.Types.Number,
            required: true,
        },
        type: {
            type: Schema.Types.Number,
            required: true,
        },
        blockHash: {
            type: Schema.Types.String,
            required: true,
        },
        gas: {
            type: Schema.Types.String,
            required: true,
        },
        input: {
            type: Schema.Types.String,
            required: true,
        },
        from: {
            type: Schema.Types.String,
            required: true,
        },
        to: {
            type: Schema.Types.String,
            required: true,
        },
        nonce: {
            type: Schema.Types.Number,
            required: true,
        },
        gasPrice: {
            type: Schema.Types.String,
            required: true,
        },
        blockNumber: {
            type: Schema.Types.Number,
            required: true,
        },
        v: {
            type: Schema.Types.String,
        },
        s: {
            type: Schema.Types.String,
        },
        r: {
            type: Schema.Types.String,
        },
        value: {
            type: Schema.Types.String,
        },
        receipt: {
            status: {
                type: Schema.Types.Boolean,
            },
            to: {
                type: Schema.Types.String,
            },
            blockHash: {
                type: Schema.Types.String,
            },
            blockNumber: {
                type: Schema.Types.Number,
            },
            cumulativeGasUsed: {
                type: Schema.Types.String,
            },
            logsBloom: {
                type: Schema.Types.String,
            },
            transactionHash: {
                type: Schema.Types.String,
            },
            transactionIndex: {
                type: Schema.Types.String,
            },
            type: {
                type: Schema.Types.String,
            },
            contractAddress: {
                type: Schema.Types.String,
            },
            from: {
                type: Schema.Types.String,
            },
            gasUsed: {
                type: Schema.Types.String,
            },
            logs: [
                {
                    address: {
                        type: Schema.Types.String,
                        required: true,
                    },
                    topics: [{ type: String }],
                    data: {
                        type: Schema.Types.String,
                        required: true,
                    },
                    blockNumber: {
                        type: Schema.Types.Number,
                        required: true,
                    },
                    transactionHash: {
                        type: Schema.Types.String,
                        required: true,
                    },
                    transactionIndex: {
                        type: Schema.Types.Number,
                        required: true,
                    },
                    blockHash: {
                        type: Schema.Types.String,
                        required: true,
                    },
                    logIndex: {
                        type: Schema.Types.Number,
                        required: true,
                    },
                    id: {
                        type: Schema.Types.String,
                        required: true,
                    },
                },
            ],
        },
    },
);

class TransactionModel {
    constructor(name) {
        this.transactionModel = model(name, transactionSchema);
    }

    get model() {
        return this.transactionModel;
    }
}

module.exports = {
    TransactionModel,
};
