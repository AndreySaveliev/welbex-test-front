import { Post } from '../types/types';
import moment from 'moment';
import { MdClose } from 'react-icons/md';

interface PopupProps {
  post: Post;
  isShown: boolean;
  handleTogglePopup: () => void;
}

const Popup: React.FC<PopupProps> = ({ post, isShown, handleTogglePopup }) => {
  return (
    <div className={`relative w-full h-full bg-black/40 ${isShown ? 'block' : 'hidden'} mb-3`}>
      <div className="h-max bg-black flex flex-col mt-4">
        <div className="flex flex-row justify-between">
          <div className="text-yellow-500 pt-3 pl-3">
            <p>{post.authorId}</p>
            {moment(post.createdAt).format('L, LT')}
          </div>
          <MdClose
            className="text-yellow-500 justify-self-end cursor-pointer pt-3"
            size={60}
            onClick={() => handleTogglePopup()}
          />
        </div>
        {post.media && (
          <img
            src={`https://welbex-test-8zw6.onrender.com/uploadfile/${post.media}`}
            className="overflow-y-hidden object-contain object-center self-center w-3/6 p-3"
          ></img>
        )}
        <div className="w-auto flex items-center p-3">
          <p className="text-yellow-500">{post.body}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
