import Editor from "@monaco-editor/react";
import Options from './Components/Options';
import Axios from 'axios';
import spinner from './assets/spinner';
import { useState } from 'react';
import './App.css';


function App() {

const [userCode, setUserCode] = useState(``);
const [userLang, setUserLang] = useState("cpp");
const [userInput, setUserInput] = useState("");
const [userOutput, setUserOutput] = useState("");
const [loading, setLoading] = useState(false);

function compile() {
	setLoading(true);
	if (userCode === ``) {
	return
	}
  const body = {
    code: userCode,
    language: userLang,
    input: userInput };
    console.log(body);
	Axios.post(``, body).then((res) => {
	setUserOutput(res.data.output);
	}).then(() => {
	setLoading(false);
	})
}
function clearOutput() {
	setUserOutput("");
}

return (
	<div className="App">
	<Options userLang={userLang} setUserLang={setUserLang} />
	<div className="main">
		<div className="left-container">
		<Editor
			height="100vh"
			width="100%"
			defaultLanguage="cpp"
			defaultValue="//Enter your code here"
			onChange={(value) => { setUserCode(value) }}
		/>
		<button className="run-btn" onClick={() => compile()}>
			Run
		</button>
		</div>
		<div className="right-container">
		<h4>Input:</h4>
		<div className="input-box">
			<textarea id="code-inp" onChange=
			{(e) => setUserInput(e.target.value)}>
			</textarea>
		</div>
		<h4>Output:</h4>
		{loading ? (
			<div className="spinner-box">
			<img src={spinner} alt="Loading..." />
			</div>
		) : (
			<div className="output-box">
			<pre>{userOutput}</pre>
			<button onClick={() => { clearOutput() }}	className="clear-btn">
				Clear
			</button>
			</div>
		)}
		</div>
	</div>
	</div>
);
}

export default App;
