'use client'
import { useEffect, useRef } from 'react';
import { Imessage, useMessage } from './messages';
import { LIMIT_MESSAGE } from '../constants';

export default function InitMessages({ messages }:{ messages: Imessage[] }) {
    const initState = useRef(false);

    const hasMore = messages.length >= LIMIT_MESSAGE;
    useEffect(() => {
        if(!initState.current) {
            useMessage.setState({ messages, hasMore });
        }

        initState.current = true;
    // eslint-disable-next-line
    }, [])
    
  return (
    <>
    </>
  )
}
