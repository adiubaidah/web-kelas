import { useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";

import { Chat as ChatType, NewChat } from "@/types";
import ServiceChat from "@/actions/chat";
import { pusher } from "@/lib/pusher";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

const Chat = () => {
  const [chats, setChats] = useState<ChatType[]>([]);
  // const lastMessageRef = useRef<HTMLParagraphElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<NewChat>();
  const getChatQuery = useQuery({
    queryKey: ["chats"],
    queryFn: ServiceChat.getAll,
  });

  const createChatMutation = useMutation({
    mutationKey: ["create-chat"],
    mutationFn: async (chat: NewChat) => {
      const result = await ServiceChat.createChat(chat);
      return result.data;
    },
    onSuccess: () => {
      reset();
    },
  });

  useEffect(() => {
    if (getChatQuery.isSuccess) {
      setChats(getChatQuery.data.data);
    }
  }, [getChatQuery.isSuccess, getChatQuery.data]);

  useEffect(() => {
    pusher.subscribe("public-chat");

    pusher.bind(
      "incoming-message",
      (data: ChatType) => {
        console.log(data);
        setChats((prev) => [...prev, data]);
      },
      pusher.unbind()
    );
    return () => pusher.unsubscribe("public-chat");
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      //scrollHeight -> banyak content
      //scrollTop -> posisi scroll
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const onSubmit: SubmitHandler<NewChat> = (payload) => {
    createChatMutation.mutate(payload);
  };

  return (
    <section className="container max-w-full flex flex-col items-center relative overflow-x-hidden">
      <div className="w-80 h-80 background-blur-right" />
      <div>
        <h2 className="font-lemon text-center text-xl md:text-3xl text-yellow-300">
          Ruang Chat
        </h2>
        <div className="w-full max-w-[1000px]">
          <div
            ref={chatContainerRef}
            className="mt-10 bg-black rounded-2xl text-[12px] py-6 px-4 space-y-3 h-[300px] overflow-y-auto custom-scrollbar"
          >
            {chats.map((chat: ChatType) => (
              <p
                className="bg-blue-950 rounded-2xl px-4 py-3 w-fit"
                key={chat.id}
              >
                {chat.message}
              </p>
            ))}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <Textarea
              className="px-5 py-2"
              rows={3}
              placeholder="Halo guys, gimana kabarnya ?"
              disabled={createChatMutation.isPending}
              {...register("message", { required: "Pesan diperlukan" })}
            />
            {createChatMutation.isPending ? (
              <Button
                variant="success"
                className="bg-green-700"
                type="button"
                disabled
              >
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Mengirim pesan
              </Button>
            ) : (
              <Button variant="success" type="submit">
                Kirim
              </Button>
            )}
          </form>
          {errors.message && (
            <small className="text-red-600">{errors.message.message}</small>
          )}
        </div>
      </div>
    </section>
  );
};

export default Chat;
