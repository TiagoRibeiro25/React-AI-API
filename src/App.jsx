import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import { InfinitySpin } from "react-loader-spinner";

import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    try {
      setIsLoading(true);

      const res = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });

      setIsLoading(false);
      setResult(res.data.data[0].url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h3>Generate an Image using Open AI API</h3>
      <input
        type="text"
        className="app-prompt"
        placeholder="Type something to generate an image"
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
      />
      <button onClick={() => generateImage()}>Generate an Image</button>

      {isLoading ? <InfinitySpin width="200" color="purple" /> : null}

      {result && !isLoading ? (
        <img className="image-result" src={result} alt="Generated Image" />
      ) : null}

      <div className="made-by">
        Made By{" "}
        <a href="https://github.com/TiagoRibeiro25" target="_blank">
          Tiago Ribeiro
        </a>
      </div>
    </div>
  );
}

export default App;
