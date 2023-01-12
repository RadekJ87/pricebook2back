import mongoose from 'mongoose';

const {Schema} = mongoose;

function getCosts(value) {
    if (typeof value !== 'undefined') {
        return parseFloat(value.toString());
    }
    return value;
};

const productSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    drawingNumber: {
        type: String,
        required: true,
    },
    revision: {
        type: String,
        default: '',
    },
    itemNumber: {
        type: String,
        default: '',
    },
    moq: {
        type: String,
        required: true,
    },
    price: {
        type: Schema.Types.Decimal128,
        // type: Number,
        required: true,
        get: getCosts,
    },
    offerNumber: {
        type: String,
        default: '',
    },
    id: false
}, {toJSON: {getters: true}, timestamps: true});

export const Product = mongoose.model('Product', productSchema);
