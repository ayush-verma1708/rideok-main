import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
	feedback: {
		type: String,
		required: true,
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.Feedback ||
	mongoose.model("Feedback", feedbackSchema);
