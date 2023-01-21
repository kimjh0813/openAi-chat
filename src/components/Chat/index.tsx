import type { InputRef } from "antd";

import { Button, Input } from "antd";
import { useRef, useState } from "react";
import { chatQuery } from "../../utils";

interface Chat {
  user?: string;
  ai?: string;
}

const Chat = () => {
  const inputRef = useRef<InputRef>(null);

  const [userText, setUserText] = useState<Chat[]>([]);

  const openAi = async () => {
    const userChat = inputRef.current?.input?.value;

    if (!userChat) return;

    setUserText((prev) => [...prev, { user: userChat }]);

    const response = await chatQuery({
      prompt: userChat,
    });
    if (!response) return;
    console.log(response);
    setUserText((prev) => [
      ...prev,
      { ai: response.replace("\n", "").replace("\n", "") },
    ]);
  };

  return (
    <div>
      <div className="bg-[#ccc] h-[calc(100vh-64px)] overflow-y-auto">
        <div className="flex flex-col mb-8">
          {userText.length > 0 &&
            userText.map(({ user, ai }, index) => {
              return (
                <div key={index} className="flex">
                  {user && (
                    <div className="ml-auto mt-2 mr-2 p-2 bg-[#fff] max-w-[400px] whitespace-pre-line">
                      {user}
                    </div>
                  )}
                  {ai && (
                    <div className="mt-2 ml-2 p-2 bg-[#fff] max-w-[400px] whitespace-pre-line">
                      {ai}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <div className="w-full fixed left-0 bottom-0">
        <div className="flex mx-auto max-w-[500px] w-full bg-[#777] p-4 justify-between ">
          <Input ref={inputRef} size="large" className="w-[390px]" />
          <Button onClick={openAi} className="text-white h-[40px]">
            전송
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
