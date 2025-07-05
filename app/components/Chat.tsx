"use client";

import { collection, orderBy, query } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import Message from "./Message";
import HomeContent from "./HomeContent";
import { firestore, auth } from "../lib/firebase";

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const [user] = useAuthState(auth);
  const messageEndRef = useRef<null | HTMLDivElement>(null);

  const [messages] = useCollection(
    user &&
      query(
        collection(
          firestore,
          `users/${user.email}/chats/${chatId}/messages`
        ),
        orderBy("createdAt", "asc")
      )
  );

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
      {messages?.empty && (
        <>
          <HomeContent />
        </>
      )}
      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))}
      <div ref={messageEndRef} />
    </div>
  );
}

export default Chat;
