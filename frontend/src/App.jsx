import { useEffect, useState } from 'react'
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";      // Dark theme
import Editor from 'react-simple-code-editor'
import axios from 'axios';
import Markdown from 'react-markdown';
import './App.css'

const App = () => {

  const [review, setReview] = useState("")
  const [code, setCode] = useState(` function sum() {
  return 1 + 1
}`)


  useEffect(() => {
    Prism.highlightAll(); // highlights all <code> blocks
  }, [code]);

  async function reviewCode() {
    try {
      const response = await axios.post('http://localhost:8080/ai/get-review', { code });
      setReview(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error reviewing code:', error);
    }
  }

  return (
    <div className="bg-gray-800 min-h-screen">
      <main className="min-h-screen w-full p-6 flex gap-4">
        {/* Left Panel */}
        <div className="relative flex flex-col basis-1/2 rounded-[0.7rem] overflow-hidden bg-[#0c0c0c] text-white p-2">
          <div className="flex-1 h-full w-full rounded-[0.7rem]">

            <Editor
              value={code}
              onValueChange={setCode}
              highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
              padding={10}
              className="h-full w-full text-[1.2rem] bg-[#0c0c0c] text-white"
              style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: '1.2rem' }}
            />

          </div>
          <div className="absolute bottom-4 right-4 bg-[rgb(219,219,255)] text-black px-8 py-2 font-medium cursor-pointer select-none rounded-[0.7rem]"

            onClick={reviewCode}>
            Button
          </div>
        </div>

        {/* Right Panel */}
        <div className="basis-1/2 rounded-[0.7rem] bg-[#343434] px-8 py-4 text-[1.2rem] overflow-auto max-h-[calc(100vh-3rem)] text-white">
          <Markdown />
          {review}

        </div>
      </main>
    </div>

  )
}

export default App