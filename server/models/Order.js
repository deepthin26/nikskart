import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    badge: { type: String },
    quantity: { type: Number, required: true }
  },
  { _id: false }
);

const AddressSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    pincode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    locality: { type: String },
    addressLine: { type: String, required: true },
    landmark: { type: String },
    addressType: { type: String, required: true }
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    items: { type: [OrderItemSchema], required: true },
    totalPrice: { type: Number, required: true },
    shipping: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    address: { type: AddressSchema, required: true },
    status: { type: String, default: 'Processing' }
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', OrderSchema);
