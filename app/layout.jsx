import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export const metadata = {
	title: "RideOk - A ride sharing app",
	description:
		"RideOk is a ride sharing app that connects drivers and passengers in a close community such as your society or workplace.",
	keywords: [
		"ride sharing",
		"carpooling",
		"ride sharing app",
		"carpooling app",
	],
	author: [
		{
			name: "Aditya Tripahti",
			url: "https://adityatripathi.vercel.app",
		},
		{
			name: "Ayush Verma",
			url: "https://ayush-verma-1708.netlify.app",
		},
	],
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="antialiased">
				<ToastContainer theme="light" />
				<TooltipProvider>
					<main className="min-h-[calc(100vh-5rem)]">{children}</main>
				</TooltipProvider>
			</body>
		</html>
	);
}
