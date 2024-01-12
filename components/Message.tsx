import { Imessage, useMessage } from "@/lib/store/messages";
import React from "react";
import Image from "next/image";
// https://www.youtube.com/watch?v=-xXASlyU0Ck&t=1083s 1 hour 20mins
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useUser } from "@/lib/store/user";

export default function Message({ message }: { message: Imessage }) {
	const user = useUser((state) => state.user);

	const messageCreatedAt = new Date(message.created_at);
	const options: Intl.DateTimeFormatOptions = { month: '2-digit', day: '2-digit', year: '2-digit' };
	const formattedDate = messageCreatedAt.toLocaleDateString('en-US', options);
	const formattedTime = messageCreatedAt.toLocaleTimeString();
	const dateTimeString = `${formattedDate} - ${formattedTime}`;


	return (
		<div className="flex gap-2">
			<div>
				<Image
					src={message.users?.avatar_url!}
					alt={message.users?.display_name!}
					width={40}
					height={40}
					className=" rounded-full ring-2"
				/>
			</div>
			<div className="flex-1 bg-gray-800 p-2 rounded-lg">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<h1 className="font-bold text-primary">
							{message.users?.display_name}
						</h1>
						<h1 className="text-sm text-gray-400">
							{dateTimeString}
						</h1>
						{message.is_edit && (
							<h1 className="text-sm text-gray-500">Edited</h1>
						)}
					</div>
					{message.users?.id === user?.id && (
						<MessageMenu message={message} />
					)}
				</div>
				<p className="text-gray-300 shadow-md bg-gray-900 p-2 rounded-lg">{message.text}</p>
			</div>
		</div>
	);
}

const MessageMenu = ({ message }: { message: Imessage }) => {
	const setActionMessage = useMessage((state) => state.setActionMessage);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<MoreHorizontal />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Action</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => {
						document.getElementById("trigger-edit")?.click();
						setActionMessage(message);
					}}
				>
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						document.getElementById("trigger-delete")?.click();
						setActionMessage(message);
					}}
				>
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};