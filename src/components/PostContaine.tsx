import { useState, useCallback, useContext } from 'react';
import { Post } from '../types/types';
import moment from 'moment';
import Popup from './Popup';
import { MdEdit, MdOutlineDelete } from 'react-icons/md';
import { api } from '../utils/api';
import { UserContext } from '../context/userContex';
import EditPopup from './EditPopup';
interface PostContainerProps {
  post: Post;
  handleRemovePostFromPage: (post: Post) => void
}

const PostContainer: React.FC<PostContainerProps> = ({ post, handleRemovePostFromPage }) => {
  const [isShown, setIsShown] = useState(false);
  const [isEditPopupShown, setIsEditPopupShown] = useState(false);
  const user = useContext(UserContext);
  const isMine = post.authorId == user.id
  const handleDeletePost = () => {
    api.deletePost(post.id).then((res: Post) => {
      handleRemovePostFromPage(res)
    })
  };

  const handleToggleEditPopup = useCallback(() => {
    if (isEditPopupShown) {
      setIsEditPopupShown(false);
    } else {
      setIsEditPopupShown(true);
    }
  }, [isEditPopupShown]);

  const handleTogglePopup = useCallback(() => {
    if (isShown) {
      setIsShown(false);
    } else {
      setIsShown(true);
    }
  }, [isShown]);

  return (
    <div className="mx-auto w-[80%]">
      <div className="flex h-20 bg-yellow-500 mb-3 px-2">
        <div className="flex flex-1 flex-row overflow-hidden" >
          {post.media && (
            <img
              src={`https://welbex-test-sjh4.onrender.com/uploads/${post.media}`}
              className="overflow-y-hidden object-contain object-center w-[30%] cursor-pointer hover:scale-150  transition duration-500"
              onClick={() => setIsShown(true)}
            ></img>
          )}
          <div className="w-auto flex flex-1 overflow-hidden items-center text-ellipsis">
            <p className="truncate  cursor-pointer hover:font-semibold" onClick={() => setIsShown(true)}>{post.body}</p>
          </div>
          {isMine && (
            <>
              <MdEdit
                size={30}
                className="self-center cursor-pointer mr-3 hover:opacity-60 transition duration-300"
                onClick={handleToggleEditPopup}
              />
              <MdOutlineDelete
                size={30}
                className="self-center cursor-pointer hover:opacity-60 transition duration-300"
                onClick={handleDeletePost}
              />
            </>
          )}
          <div className="w-fit flex flex-col items-center justify-center pointer-events-none">
            <p>{post.authorId}</p>
            <p>{moment(post.createdAt).format('L, LT')}</p>
          </div>
        </div>
      </div>
      <EditPopup
        isEditPopupShown={isEditPopupShown}
        handleToggleEditPopup={handleToggleEditPopup}
        post={post}
      />
      <Popup post={post} isShown={isShown} handleTogglePopup={handleTogglePopup} />
    </div>
  );
};

export default PostContainer;
