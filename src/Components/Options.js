import React from 'react';
import Select from 'react-select';
import './Options.css';

const Options = ({userLang, setUserLang}) => {
	const languages = [
		{ value: "cpp", label: "C++" },
		{ value: "c", label: "C" },
		{ value: "python", label: "Python" },
		{ value: "java", label: "Java" },
	];
	return (
		<div className="options">
			
			<Select options={languages} value={userLang}
					onChange={(e) => setUserLang(e.value)}
					placeholder={userLang} />
		</div>
	)
}

export default Options
