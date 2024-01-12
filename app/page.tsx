import ChatAbout from "@/components/ChatAbout";
import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import InitUser from "@/lib/store/InitUser";
import { supabaseServer } from "@/lib/supabase/server";

export default async function Page() {

	const supabase = supabaseServer();

	const { data } = await supabase.auth.getSession();

	return (
		<>
			<div className="max-w-3xl mx-auto md:py-10 h-screen overflow-x-hidden">
				<div className="h-full md:border md:rounded-md flex flex-col relative bg-secondary">
					<ChatHeader user={data.session?.user} />
					
				{data.session?.user ? (
					<>

					<ChatMessages />

					<ChatInput />
					</>
				) : (
					<ChatAbout />
				)}
					
				</div>
			</div>
      				<InitUser user={data.session?.user} />
		</>
	);
}