import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './App.css';



const FileUploader = ({ onFileLoad}) => {
  return <input type="file" onChange={ (e) => onFileLoad(e.target.files[0])} />;
};

function App() {
  const template= `#include <iostream>
  using namespace std;
  
  int main() {
    // your code goes here hi
    return 0;
  }
  `;
  const [file,setFile]=useState();
  const [value, setValue]=useState();
  const [language, setLanguage] = useState('cpp');
  const handleChange = (event: SelectChangeEvent) => {
      setLanguage(event.target.value);
    };

  
  
  useEffect(() => {

    if(file) {
      var reader =new FileReader();
      reader.onload = async (e) => {
        setValue(e.target.result);
      };
      reader.readAsText(file);
      let newLanguage= 'cpp';
      const extension =file.name.split('.').pop();
      if([,'python',,'java'].includes(extension)) {
        newLanguage=extension;
      } else if (extension == 'md') {
        newLanguage='markdown';
      }
      setLanguage(newLanguage);
    }
  },[file]);

  return (
    <>
    <div>
    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="language-type">Language</InputLabel>
        <Select
          labelId="language-type-label"
          id="language-type"
          
          value={language}
          onChange={handleChange}
        >
          <MenuItem value={'cpp'}>C++</MenuItem>
          <MenuItem value={'python'}>Python3</MenuItem>
          <MenuItem value={'java'}>Java</MenuItem>
        </Select>
</FormControl>
    </div>
    <Editor height="70vh" defaultLanguage={language}  defaultValue={template}  />
    <FileUploader onFileLoad={setFile} />
    </>
    
  );
}

export default App;
