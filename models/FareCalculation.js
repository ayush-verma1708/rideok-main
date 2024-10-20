import mongoose from "mongoose";

const fareCalculationSchema = new mongoose.Schema(
	{
		carType: {
			type: String,
			required: false,
		},
		weather: {
			type: String,
			required: false,
		},
		roadType: {
			type: String,
			required: false,
		},
		distance: {
			type: Number,
			required: false,
		},
		timeTaken: {
			type: Number,
			required: false,
		},
		carAverage: {
			type: Number,
			required: false,
		},
		numPassengers: {
			type: Number,
			required: false,
		},
		fuelPrice: {
			type: Number,
			required: false,
		},
		trafficCondition: {
			type: String,
			required: false,
		},
		baseFare: {
			type: Number,
			required: false,
		},
		totalFare: {
			type: Number,
			required: false,
		},
		driverFare: {
			type: Number,
			required: false,
		},
		passengerFare: {
			type: Number,
			required: false,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.FareCalculation ||
	mongoose.model("FareCalculation", fareCalculationSchema);
