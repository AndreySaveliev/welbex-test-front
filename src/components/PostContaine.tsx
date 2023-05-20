import { useState, useMemo, useCallback } from 'react';
import { Post } from '../types/types';
import moment from 'moment';
import Popup from './Popup';

interface PostContainerProps {
  post: Post;
}

const PostContainer: React.FC<PostContainerProps> = ({ post }) => {
  const [isShown, setIsShown] = useState(false);

  const handleTogglePopup = useCallback(() => {
    if (isShown) {
      setIsShown(false)
    } else {
      setIsShown(true)
    }
  }, [isShown])

  return (
    <>
      <div
        className="w-[60%] flex flex-row h-20 bg-yellow-500 mb-3 cursor-pointer px-2"
        onClick={() => setIsShown(true)}
      >
        {post.media && (
          <img
            src={`http://localhost:3000/uploadfile/${post.media}`}
            className="overflow-y-hidden object-contain object-center w-[30%]"
          ></img>
        )}
        <div className="w-auto flex items-center flex-1">
          <p>{post.body}</p>
        </div>
        <div className="w-auto flex flex-col items-center flex-1 justify-end">
          <p>{post.authorId}</p>
          <p>{moment(post.createdAt).format('L, LT')}</p>
        </div>
      </div>
      <div
        className={`absolute w-full h-full bg-black/40 cursor-pointer ${
          isShown ? 'block' : 'hidden'
        }`}
      >
        <Popup post={post} isShown={isShown} handleTogglePopup={handleTogglePopup}/>
      </div>
    </>
  );
};

export default PostContainer;
