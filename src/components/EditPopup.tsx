import React, { ChangeEvent, useEffect, useState } from 'react';
import { Post } from '../types/types';
import { api } from "../utils/api";

interface EditPopupProps {
  isEditPopupShown: boolean;
  handleToggleEditPopup: () => void;
  post: Post;
}

const EditPopup: React.FC<EditPopupProps> = ({ isEditPopupShown, post }) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState('');
  const [text, setText] = useState(post.body)
  const handleSetFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleEditPost = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    if (selectedFile) {
      formData.append('filedata', selectedFile)
    }
    if (text) {
      formData.append('body', text)
    }
    api.editPost(post.id, formData)
  }

  useEffect(() => {
    if (!selectedFile) {
        setPreview('')
        return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
}, [selectedFile])

  return (
    <div className={`relative w-full bg-black/40 ${isEditPopupShown ? 'visible' : 'hidden'}`}>
      <form
        className="my-5 flex flex-col items-center"
        encType="multipart/form-data"
        onSubmit={handleEditPost}
      >
        <div className="w-full flex flex-col items-center">
          <textarea className="w-[60%] resize scroll-hidden self center" value={text} onChange={(e) => setText(e.target.value)}/>
          <div className="">
            <label className="text-yellow-500 mr-3">Выберете новую каринку</label>
            {selectedFile && <img className='w-20' src={preview}></img>}
            <input
              type="file"
              accept="image/png, image/jpeg"
              name="filedata"
              onChange={handleSetFile}
            />
          </div>
        </div>
        <button type="submit">EDIT</button>
      </form>
    </div>
  );
};

export default EditPopup;
