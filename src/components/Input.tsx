import { ChangeEvent, useState } from 'react';
import { api } from '../utils/api';
import { Post } from '../types/types';

interface InputProps {
  handleAddPost: (post: Post) => void;
}

const Input: React.FC<InputProps> = ({ handleAddPost }) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [inputText, setInputText] = useState('');
  const handleSetFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedFile) {
      formData.append('filedata', selectedFile);
    }
    formData.append('body', inputText);
    api.createPost(formData).then((res: Post) => {
      console.log(res);
      console.log(document.getElementById('fileinput'));
      setInputText('');
      handleAddPost(res);
    });
  };

  return (
    // <form className="my-5" encType="multipart/form-data"  method="post" action="http://localhost:3000/post">
    <form className="my-5" encType="multipart/form-data" onSubmit={handleCreatePost}>
      <div>
        <textarea
          className="w-[100%] resize scroll-hidden"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="">
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="fileinput"
            name="filedata"
            onChange={handleSetFile}
          />
        </div>
      </div>
      <button type="submit">POST</button>
    </form>
  );
};

export default Input;
