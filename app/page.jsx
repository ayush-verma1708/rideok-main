"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const IndexPage = () => {
	const [carType, setCarType] = React.useState("");
	const [weather, setWeather] = React.useState("");
	const [roadType, setRoadType] = React.useState("");
	const [distance, setDistance] = React.useState("");
	const [carAverage, setCarAverage] = React.useState("");
	const [numPassengers, setNumPassengers] = React.useState("");
	const [feedback, setFeedback] = React.useState("");

	const [loading, setLoading] = React.useState(false);
	const [feedbackLoading, setFeedbackLoading] = React.useState(false);

	const [fareResultModal, setFareResultModal] = React.useState(false);
	const [fareResult, setFareResult] = React.useState(null);

	const handleCalculateFare = async () => {
		console.log("CarType        : ", carType);
		console.log("Weather        : ", weather);
		console.log("RoadType       : ", roadType);
		console.log("Distance       : ", distance);
		console.log("CarAverage     : ", carAverage);
		console.log("NumPassengers  : ", numPassengers);
		setLoading(true);

		if (
			!carType ||
			!weather ||
			!roadType ||
			!distance ||
			!carAverage ||
			!numPassengers
		) {
			toast.error("Please fill all the fields");
			setLoading(false);
			return;
		}

		try {
			const response = await axios.post("/api/fare", {
				distance,
				carAverage,
				numPassengers,
				fuelPrice: 100,
				baseFare: 0,
			});
			setFareResult(response.data);
			setFareResultModal(true);
		} catch (error) {
			console.error(error);
			setFareResultModal(false);
		} finally {
			setLoading(false);
		}
	};

	const handleFeedback = async () => {
		console.log("Feedback       : ", feedback);
		setFeedbackLoading(true);

		try {
			await axios.post("/api/feedback", {
				feedback,
			});
			toast.success("Feedback submitted successfully");
		} catch (error) {
			toast.error("Failed to submit feedback");
			console.error(error);
		} finally {
			setFeedback("");
			setFeedbackLoading(false);
		}
	};

	return (
		<main className="container mx-auto flex flex-col justify-center items-center min-h-screen w-full">
			<Card>
				<CardContent className="flex flex-col gap-3">
					<CardHeader className="flex items-center justify-center">
						<Image
							src="/logo.jpg"
							height={80}
							width={160}
							alt="RideOk Logo"
						/>
						<h1 className="text-xl font-bold uppercase text-center">
							Fare calculation demo for the RideOk app
						</h1>
					</CardHeader>
					<Select
						onValueChange={(value) => {
							setCarType(value);
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder="Car Type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="sedan">Sedan</SelectItem>
							<SelectItem value="suv">SUV</SelectItem>
							<SelectItem value="truck">Truck</SelectItem>
							<SelectItem value="van">Van</SelectItem>
							<SelectItem value="hatchback">Hatchback</SelectItem>
						</SelectContent>
					</Select>
					<Select
						onValueChange={(value) => {
							setWeather(value);
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder="Weather" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="sunny">Sunny</SelectItem>
							<SelectItem value="rainy">Rainy</SelectItem>
							<SelectItem value="cloudy">Cloudy</SelectItem>
							<SelectItem value="snowy">Snowy</SelectItem>
						</SelectContent>
					</Select>
					<Select
						onValueChange={(value) => {
							setRoadType(value);
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder="Road Type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="highway">Highway</SelectItem>
							<SelectItem value="city">City</SelectItem>
							<SelectItem value="offroad">Off-road</SelectItem>
						</SelectContent>
					</Select>
					<Input
						value={distance}
						onChange={(e) => setDistance(e.target.value)}
						placeholder="Distance (km)"
						required
					/>
					<Input
						value={carAverage}
						onChange={(e) => setCarAverage(e.target.value)}
						placeholder="Car Average (kmpl)"
						required
					/>
					<Input
						value={numPassengers}
						onChange={(e) => setNumPassengers(e.target.value)}
						placeholder="Number of passengers"
						required
					/>
				</CardContent>
				<CardFooter className="flex gap-3 md:flex-row flex-col">
					<Dialog
						onOpenChange={(value) => {
							setFareResultModal(value);
						}}
						open={fareResultModal}
					>
						<DialogTrigger asChild>
							<Button
								className="w-full"
								onClick={handleCalculateFare}
								disabled={loading}
							>
								{loading ? "Loading..." : "Calculate Fare"}
							</Button>
						</DialogTrigger>
						{fareResult && (
							<DialogContent>
								<DialogHeader>
									<DialogTitle className="text-xl font-bold uppercase text-left">
										Calculated Fare
									</DialogTitle>
								</DialogHeader>
								<Table>
									<TableCaption className="text-red-400">
										This application is based on parameters provided only. It
										ensure car owners to pay less for doing the effort of
										driving the car.
									</TableCaption>
									<TableHeader>
										<TableHead>
											<span className="flex gap-1 items-center">
												Total Fare
												<Tooltip>
													<TooltipTrigger>
														<InfoCircledIcon />
													</TooltipTrigger>
													<TooltipContent>Total Fare</TooltipContent>
												</Tooltip>
											</span>
										</TableHead>
										<TableHead>
											<span className="flex gap-1 items-center">
												Driver Fare
												<Tooltip>
													<TooltipTrigger>
														<InfoCircledIcon />
													</TooltipTrigger>
													<TooltipContent>
														Amount shared by car owner
													</TooltipContent>
												</Tooltip>
											</span>
										</TableHead>
										<TableHead>
											<span className="flex gap-1 items-center">
												Passenger Fare
												<Tooltip>
													<TooltipTrigger>
														<InfoCircledIcon />
													</TooltipTrigger>
													<TooltipContent>
														Rate for each passenger
													</TooltipContent>
												</Tooltip>
											</span>
										</TableHead>
										<TableHead>
											<span className="flex gap-1 items-center">
												Driver Payout
												<Tooltip>
													<TooltipTrigger>
														<InfoCircledIcon />
													</TooltipTrigger>
													<TooltipContent>
														Total amount received by car owner
													</TooltipContent>
												</Tooltip>
											</span>
										</TableHead>
									</TableHeader>
									<TableBody>
										<TableRow>
											<TableCell>{fareResult.totalFare.toFixed(2)}</TableCell>
											<TableCell>{fareResult.driverFare.toFixed(2)}</TableCell>
											<TableCell>
												{fareResult.passengerFare.toFixed(2)}
											</TableCell>
											<TableCell>
												{(fareResult.passengerFare * numPassengers).toFixed(2)}
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</DialogContent>
						)}
					</Dialog>
					<Dialog>
						<DialogTrigger asChild>
							<Button
								className="w-full"
								variant="outline"
							>
								Give Feedback
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle className="text-xl font-bold uppercase text-left">
									Your feedback matters.
								</DialogTitle>
								<DialogDescription>
									Please provide your feedback to help us improve the
									application.
								</DialogDescription>
							</DialogHeader>
							<section className="flex flex-col gap-3">
								<Textarea
									value={feedback}
									onChange={(e) => setFeedback(e.target.value)}
									placeholder="Feedback"
									required
								/>
							</section>
							<DialogFooter>
								<Button
									onClick={handleFeedback}
									className="w-full"
									disabled={feedbackLoading}
								>
									{feedbackLoading ? "Submitting..." : "Submit Feedback"}
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</CardFooter>
			</Card>
		</main>
	);
};

export default IndexPage;
