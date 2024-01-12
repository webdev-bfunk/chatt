'use client'
import { supabaseBrowser } from '@/lib/supabase/browser';
import { Provider } from '@supabase/supabase-js';
import { BsGithub, BsGoogle } from "react-icons/bs";
import { Button } from './ui/button';

export default function ChatAbout() {
  const supabase = supabaseBrowser();
  const handleLoginWithProvider = async (provider: Provider) => {
    const redirectTo = location.origin + "/auth/callback";
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
      },
    });
  };

  return (
    <div className='flex-1 flex flex-col w-full items-center justify-center space-y-5 leading-10'>
        <h1 className='text-4xl md:text-5xl font-bold text-center'>Welcome <br />to Daily Chat</h1>
        <p className='text-center'>
            This is a chat application that is <br />
            powered by <b>Supabase</b>, a realtime database.<br />
            Please login to send a message.
        </p>

        <Button onClick={() => handleLoginWithProvider('github')}>Login with &nbsp;<BsGithub />&nbsp; <b>GitHub</b></Button>
        <Button onClick={() => handleLoginWithProvider('google')}>Login with &nbsp;<BsGoogle />&nbsp; <b>Google</b></Button>
    </div>
  )
}
