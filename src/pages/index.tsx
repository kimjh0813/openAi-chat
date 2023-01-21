import { chatQuery } from "../utils";

const Chat = () => {
  const openAi = async () => {
    const response = await chatQuery({
      prompt: "what your name?",
    });
    console.log(response.replaceAll("\n", ""));
  };

  return (
    <div>
      <button onClick={openAi}>dd</button>
    </div>
  );
};

export default Chat;
