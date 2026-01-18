"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

import Loader from "@Components/shared/loader/Loader";

import Image from "next/image";
import chatbot_image from "@Images/logos/chatbot_logo.png";
import send_icon from "@Images/logos/send.png";
import { CHAT_MESSAGE_T } from "@/src/types/shared/types";

const cardVariants = {
	open: { scale: 1, x: 0, y: 0 },
	close: { scale: 0, x: 150, y: 200 },
};

const Chatbot = () => {
	const [chatbotOpen, setChatbotOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const lastChatRef = useRef<HTMLDivElement | null>(null);
	const [chats, setChats] = useState<CHAT_MESSAGE_T[]>([
		{
			role: "model",
			content: "hello, welcome to my website",
		},
	]);

	async function askgpt(query: string, history: CHAT_MESSAGE_T[]) {
		const response = await fetch("/api/v2/chatbot", {
			method: "POST",
			body: JSON.stringify({ query, history }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		return data.message;
	}

	const handlesubmit = async (
		e:
			| React.MouseEvent<HTMLButtonElement>
			| React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (query === "") return;
		e.preventDefault();
		const history = chats;
		setChats((chats) => [...chats, { role: "user", content: query }]);
		setQuery("");
		setIsLoading(true);
		const message = await askgpt(query, history);
		setIsLoading(false);
		setChats((chats) => [...chats, { role: "model", content: message }]);
	};

	useEffect(() => {
		if (lastChatRef.current) {
			lastChatRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [chats]);

	const sendchats = async (currentChats: CHAT_MESSAGE_T[]) => {
		const data = {
			email: "form chatbot",
			subject: "User chat history",
			message: currentChats,
		};
		const JSONData = JSON.stringify(data);
		const endpoint = "/api/send";
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSONData,
		};
		const response = await fetch(endpoint, options);
		const resData = await response.json();
		if (response.status === 200) {
			console.log("Message Sent.");
		}
		return resData;
	};

	useEffect(() => {
		const handleBeforeUnload = async () => {
			const currentChats = chats;
			if (currentChats.length === 1) return;
			await sendchats(currentChats);
		};
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [chats]);

	return (
		<div
			className={
				"chatbot-container fixed z-50 bottom-4 right-4 flex flex-col-reverse items-end md:bottom-10 md:right-10 font-sans"
			}
		>
			{/* Toggle Button */}
			<div
				onClick={() => setChatbotOpen(!chatbotOpen)}
				className={`bot-icon cursor-pointer m-2 mr-0 flex justify-center items-center transition-all duration-300 shadow-lg hover:shadow-xl
      ${chatbotOpen ? "bg-zinc-800 rotate-90" : "bg-black hover:bg-zinc-800"} 
      w-14 h-14 rounded-full border border-zinc-700/50`}
			>
				{/* Added invert to make black icons white in dark mode */}
				<Image
					className="invert opacity-80"
					src={chatbot_image}
					alt="chatbot_logo"
					width={30}
					height={30}
				/>
			</div>

			{/* Chat Window */}
			<motion.div
				variants={cardVariants}
				animate={chatbotOpen ? "open" : "close"}
				transition={{
					duration: 0.3,
					type: "spring",
					stiffness: 260,
					damping: 20,
				}}
				className={`flex flex-col relative overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl rounded-2xl
      ${chatbotOpen ? "h-[500px] w-[350px] opacity-100" : "h-0 w-0 opacity-0"} `}
			>
				{/* Header */}
				<div className="bg-zinc-950/50 backdrop-blur-md p-4 border-b border-zinc-800 flex items-center justify-between">
					<span className="text-zinc-200 text-sm font-medium tracking-wide">
						AI Assistant
					</span>
					<div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
				</div>

				{/* Chat Area */}
				<div className="chats h-full flex flex-col overflow-y-auto no-scrollbar p-4 space-y-4 bg-zinc-900">
					{chats.map((chat, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							className={`flex w-full ${chat.role === "model" ? "justify-start" : "justify-end"}`}
						>
							<div
								className={`max-w-[85%] text-sm px-4 py-2.5 shadow-sm
            ${
				chat.role === "model"
					? "bg-zinc-800 text-zinc-100 rounded-2xl rounded-tl-sm"
					: "bg-blue-600 text-white rounded-2xl rounded-tr-sm"
			}`}
							>
								<ReactMarkdown
									components={{
										p: ({ node, ...props }) => (
											<p
												className="m-0 leading-relaxed"
												{...props}
											/>
										),
									}}
								>
									{chat.content}
								</ReactMarkdown>
							</div>
						</motion.div>
					))}

					{isLoading && (
						<div className="self-start ml-2">
							<Loader />{" "}
							{/* Ensure your Loader component is styled for dark mode */}
						</div>
					)}

					<div ref={lastChatRef}></div>
				</div>

				{/* Input Area */}
				<div className="user-input flex items-center p-3 bg-zinc-950 border-t border-zinc-800 gap-2">
					<input
						className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 border-none focus:ring-0 focus:outline-none px-2"
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Type a message..."
						value={query}
						type="text"
						autoFocus
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handlesubmit(e);
							}
						}}
					/>
					<button
						onClick={handlesubmit}
						className="p-2 rounded-full hover:bg-zinc-800 transition-colors flex items-center justify-center group"
					>
						<Image
							className="invert opacity-60 group-hover:opacity-100 transition-opacity"
							src={send_icon}
							alt="send_icon"
							width={20}
							height={20}
						/>
					</button>
				</div>
			</motion.div>
		</div>
	);
};

export default Chatbot;
