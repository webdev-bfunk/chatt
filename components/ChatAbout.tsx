import React from 'react'

export default function ChatAbout() {
  return (
    <div className='flex-1 flex flex-col w-full items-center justify-center space-y-5 leading-10'>
        <h1 className='text-4xl md:text-5xl font-bold text-center'>Welcome <br />to Daily Chat</h1>
        <p className='text-center'>
            This is a chat application that is <br />
            powered by <b>Supabase</b>, a realtime database.<br />
            Please login to send a message.
        </p>
    </div>
  )
}
