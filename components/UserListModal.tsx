"use client";
import { CgUserList } from 'react-icons/cg'
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useUser } from "@/lib/store/user";

export default function UserListModal() {
  const user = useUser((state) => state.user);

  const supabase = supabaseBrowser();

  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    const channel = supabase.channel("room1");

    channel
      .on("presence", { event: "sync" }, () => {
        console.log("Synced presence state: ", channel.presenceState());

        const userIds = [];

        for (const id in channel.presenceState()) {
          //@ts-ignore
          userIds.push(channel.presenceState()[id][0].user_id);
        }

        setOnlineUsers(userIds); // Update the online users state
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: user?.id,
          });
        }
      });
  }, [user]);

  useEffect(() => {
    if (!user) return;

    async function fetchUserDisplayNames(userIds: string[]) {
      const { data, error } = await supabase
        .from("users")
        .select("id, display_name")
        .in("id", userIds);

      if (error) {
        console.error("Error fetching user display names:", error.message);
        return;
      }

      const displayNames = data?.map((user) => user.display_name) || [];
      setOnlineUsers(displayNames);
    }

    if (onlineUsers.length > 0) {
      fetchUserDisplayNames(onlineUsers);
    }
  }, [onlineUsers, user, supabase]);

  if (!user) {
    return <div className="h-3 w-1"></div>;
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
        <div className="mt-2 flex items-center  gap-2 text-sm hover:scale-110 transition-all duration-300">
              <CgUserList className="h-6 w-6"/>
              
              <h2 className="text-green-300">Users Online</h2>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <h1 className="text-2xl underline underline-offset-8 text-green-500 font-bold">
                Users Online
            </h1>
            <AlertDialogTitle>
            <div className="flex flex-col text-md font-light">
                  {onlineUsers.map((userId) => (
                    <span key={userId}>{userId}</span>
                  ))}
              </div>
            
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

