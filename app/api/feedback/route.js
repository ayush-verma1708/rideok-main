import Feedback from "@/models/Feedback.js";

import connectToDb from "@/utils/db";

export const POST = async (req) => {
	connectToDb();

	const { feedback } = await req.json();

	try {
		const newFeedback = new Feedback({ feedback });
		await newFeedback.save();

		return Response.json(
			{ message: "Feedback submitted successfully!" },
			{ status: 201 }
		);
	} catch (error) {
		console.error(error);
		return Response.json(
			{ message: "Error submitting feedback." },
			{ status: 500 }
		);
	}
};

export const GET = async (req) => {
	connectToDb();

	const accessId = req.nextUrl.searchParams.get("accessId");

	console.log(`Access ID: ${accessId}`);
	console.log(`Actual ID: ${process.env.ACCESS_KEY}`);

	if (accessId !== process.env.ACCESS_KEY) {
		return Response.json({ message: "Unauthorized access." }, { status: 401 });
	}

	try {
		const feedbacks = await Feedback.find();

		return Response.json(feedbacks, { status: 200 });
	} catch (error) {
		return Response.json(
			{ message: error ?? "Error fetching feedbacks." },
			{ status: 500 }
		);
	}
};

export const DELETE = async (req) => {
	connectToDb();

	const id = req.nextUrl.searchParams.get("id");

	try {
		await Feedback.findByIdAndDelete(id);

		return Response.json(
			{ message: "Feedback deleted successfully!" },
			{ status: 200 }
		);
	} catch (error) {
		return Response.json(
			{ message: error ?? "Error deleting feedback." },
			{ status: 500 }
		);
	}
};
