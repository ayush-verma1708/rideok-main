"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-toastify";

const FeedbacksPage = () => {
	const { id } = useParams();

	const [feedbacks, setFeedbacks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [unauthorized, setUnauthorized] = useState(false);

	const fetchAllFeedbacks = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`/api/feedback?accessId=${id}`);

			setFeedbacks(response.data);
			setLoading(false);
		} catch (error) {
			if (error.status === 401) {
				toast.error("Unauthorized access.");
			}
			setUnauthorized(true);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAllFeedbacks();
	}, [id]);

	const deleteFeedback = async (id) => {
		await axios.delete(`/api/feedback?id=${id}`);
		fetchAllFeedbacks();
	};

	if (loading) {
		return (
			<section className="h-screen w-screen flex items-center justify-center">
				Loading...
			</section>
		);
	} else if (unauthorized) {
		return (
			<section className="h-screen w-screen flex flex-col items-center justify-center">
				<span>You are not authorized to view this page.</span>

				<Link
					className="text-blue-600"
					href="/"
				>
					Go back
				</Link>
			</section>
		);
	} else if (feedbacks.length === 0) {
		return (
			<section className="h-screen w-screen flex flex-col items-center justify-center">
				<span>No feedbacks found, check again later.</span>

				<Link
					className="text-blue-600"
					href="/"
				>
					Go back
				</Link>
			</section>
		);
	} else {
		return (
			<section className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
				{feedbacks?.map((feedback, i) => {
					return (
						<Card key={i}>
							<CardHeader>
								<CardTitle>{feedback._id}</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									{moment(feedback.createdAt).format("LLLL")}
								</CardDescription>
								<p>{feedback.feedback}</p>
							</CardContent>
							<CardFooter>
								<Button
									onClick={() => deleteFeedback(feedback._id)}
									variant="destructive"
								>
									Delete
								</Button>
							</CardFooter>
						</Card>
					);
				})}
			</section>
		);
	}
};

export default FeedbacksPage;
