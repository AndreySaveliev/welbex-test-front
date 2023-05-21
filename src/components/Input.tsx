import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { api } from "../utils/api";
import { Post } from "../types/types";

interface InpupProps {
  setPosts: (arg1: Post) => void
  posts: Post[]
}

const Input: React.FC<InpupProps> = ({setPosts, posts}) => {

  const [selectedFile, setSelectedFile] = useState<File>();
  const [inputText, setInputText] = useState('')
  const handleSetFile = (e:  ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    if (selectedFile) {
      formData.append('filedata', selectedFile)
    }
    formData.append('body', inputText)
    api.createPost(formData).then(res => {
      console.log(res)
      selectedFile(null)
      setInputText('')
      setPosts([...posts, res])
    })
  }

  return (
    // <form className="my-5" encType="multipart/form-data"  method="post" action="http://localhost:3000/post">
    <form className="my-5" encType="multipart/form-data"  onSubmit={handleCreatePost}>
      <div>
      <textarea className="w-[100%] resize scroll-hidden" value={inputText} onChange={(e) => setInputText(e.target.value)}/>
      <div className="">
        <input type="file" accept="image/png, image/jpeg" name="filedata" onChange={handleSetFile} />
      </div>
      </div>
      <button type="submit">POST</button>
    </form>
  );
};

export default Input;
function res(value: any) {
  throw new Error("Function not implemented.");
}

