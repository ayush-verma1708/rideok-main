"use client";

import {
	Card,
	CardContent,
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
import { SelectSeparator } from "@/components/ui/select";

const FareCalculationsPage = () => {
	const { id } = useParams();

	const [fareCalculations, setFareCalculations] = useState([]);
	const [loading, setLoading] = useState(false);
	const [unauthorized, setUnauthorized] = useState(false);

	const fetchAllFareCalculations = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`/api/fare?accessId=${id}`);

			setFareCalculations(response.data);
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
		fetchAllFareCalculations();
	}, [id]);

	const deleteFeedback = async (id) => {
		await axios.delete(`/api/fare?id=${id}`);
		fetchAllFareCalculations();
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
	} else if (fareCalculations.length === 0) {
		return (
			<section className="h-screen w-screen flex flex-col items-center justify-center">
				<span>No fare calculations found, check again later.</span>

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
				{fareCalculations?.map((fare, i) => {
					return (
						<Card key={i}>
							<CardHeader>
								<CardTitle className="flex flex-col">
									{fare._id}
									{moment(fare.createdAt).format("LLLL")}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex flex-col">
									<span>Distance: {fare.distance.toFixed(2)}</span>
									<span>Car Mileage: {fare.carAverage.toFixed(2)}</span>
									<span>Number of passengers: {fare.numPassengers}</span>
									<span>Fuel Price: {fare.fuelPrice.toFixed(2)}</span>
									<span>Base Fare: {fare.baseFare.toFixed(2)}</span>
									<span>Total Fare: {fare.totalFare.toFixed(2)}</span>
									<span>Driver Fare: {fare.driverFare.toFixed(2)}</span>
									<span>Passenger Fare: {fare.passengerFare.toFixed(2)}</span>
								</div>
							</CardContent>
							<SelectSeparator className="mb-6" />
							<CardFooter>
								<Button
									onClick={() => deleteFeedback(fare._id)}
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

export default FareCalculationsPage;
