import type { InputRef } from "antd";

import { Button, Input } from "antd";
import { useRef, useState } from "react";
import { chatQuery } from "../../utils";
import Loader from "../loader";

interface Chat {
  user?: string;
  ai?: string;
}

const Chat = () => {
  const [chatText, setChatText] = useState<Chat[]>([]);
  const [inputValue, setInputValue] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openAi = async () => {
    if (!inputValue) return;
    if (inputValue === "clear") {
      setChatText([]);
      setInputValue("");
      return;
    }

    setChatText((prev) => [...prev, { user: inputValue }]);

    setInputValue("");
    setIsLoading(true);
    const response = await chatQuery({
      prompt: inputValue,
    });
    if (!response) return;

    setChatText((prev) => [
      ...prev,
      { ai: response.replace("\n", "").replace("\n", "") },
    ]);
    setIsLoading(false);
  };

  return (
    <div>
      <div className="bg-[#ccc] h-[calc(100vh-64px)] overflow-y-auto">
        <div className="flex flex-col mb-8">
          {chatText.length > 0 &&
            chatText.map(({ user, ai }, index) => {
              return (
                <div key={index} className="flex">
                  {user && (
                    <div className="ml-auto mt-4 mr-2 p-2 bg-[#fff] max-w-[350px] whitespace-pre-line">
                      {user}
                    </div>
                  )}
                  {ai && (
                    <div className="mt-4 ml-2 p-2 bg-[#fff] max-w-[350px] whitespace-pre-line">
                      {ai}
                    </div>
                  )}
                </div>
              );
            })}
          {isLoading && (
            <div className="mt-2 ml-2 bg-[#fff] w-[200px] h-[67px]">
              <Loader />
            </div>
          )}
        </div>
      </div>
      <div className="w-full fixed left-0 bottom-0">
        <div className="flex mx-auto max-w-[500px] w-full bg-[#777] p-4 justify-between ">
          <Input
            value={inputValue}
            size="large"
            className="w-[390px]"
            disabled={isLoading}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onPressEnter={(e) => {
              if (e.nativeEvent.isComposing) return;
              openAi();
            }}
          />
          <Button
            onClick={openAi}
            disabled={isLoading}
            className="text-white h-[40px]"
          >
            전송
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
