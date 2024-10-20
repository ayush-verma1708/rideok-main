import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['car_owner', 'passenger'],
    required: true,
    default: 'passenger',
  },
  // Fields for Car Owners
  carDetails: {
    carModel: {
      type: String,
      required: function () {
        return this.role === 'car_owner';
      },
    },
    carType: {
      type: String,
      enum: ['sedan', 'suv', 'truck', 'van', 'hatchback'],
      required: function () {
        return this.role === 'car_owner';
      },
    },
    licensePlate: {
      type: String,
      required: function () {
        return this.role === 'car_owner';
      },
      unique: true,
    },
    seatingCapacity: {
      type: Number,
      required: function () {
        return this.role === 'car_owner';
      },
    },
    carAverage: {
      type: Number, // km per liter
      required: function () {
        return this.role === 'car_owner';
      },
    },
  },

  reviews: [
    {
      carOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
