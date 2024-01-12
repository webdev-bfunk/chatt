"use client";
import React from "react";
import { Button } from "./ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Provider, User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import ChatPresence from "./ChatPresence";

export default function ChatHeader({ user }: { user: User | undefined }) {
  const router = useRouter();
  const supabase = supabaseBrowser();

  const userName = user?.user_metadata?.user_name;
  const userImage = user?.user_metadata?.avatar_url;
//   const handleLoginWithGithub = () => {
//     const supabase = supabaseBrowser();

//     supabase.auth.signInWithOAuth({
//       provider: "github",
//       options: {
//         redirectTo: location.origin + "/auth/callback",
//       },
//     });
//   };


// const handleLoginWithProvider = async (provider: Provider) => {
//     const redirectTo = location.origin + "/auth/callback";
//     await supabase.auth.signInWithOAuth({
//       provider,
//       options: {
//         redirectTo,
//       },
//     });
//   };

  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="h-20 bg-secondary rounded-lg">
      <div className="p-5 md:border-b flex items-center justify-between h-full">
        <div className="flex gap-2">
          <h1 className="text-2xl font-bold ml-2">
            Daily Chat
            <ChatPresence />
          </h1>
        </div>
		{user ? (
			<div className="flex gap-2 items-center">
			<img src={userImage} alt={userName} width={40} height={40} className="rounded-full ring-2" />
			<div className="flex flex-col">
			  <h3 className="text-sm leading-none">Logged in as</h3>
			  <h3 className="text-green-500"><b>{userName}</b></h3>
			</div>
		  </div>
		) : (
			<></>
		)}

{user ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <>
            {/* <Button onClick={() => handleLoginWithProvider('github')}>Login with GitHub</Button>
            <Button onClick={() => handleLoginWithProvider('google')}>Login with Google</Button> */}
          </>
        )}
      </div>
    </div>
  );
}
