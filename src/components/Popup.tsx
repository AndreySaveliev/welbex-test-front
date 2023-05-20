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
    <div
      className={`relative w-[50%] h-full bg-black left-[50%] translate-x-[-50%] cursor-default flex flex-col  ${
        isShown ? 'block' : 'hidden'
      }`}
    >
      <div>
        <MdClose
          className="text-yellow-500 right-0 absolute cursor-pointer"
          size={50}
          onClick={() => handleTogglePopup()}
        />
      </div>
      <div className="text-yellow-500">
        {post.authorId}
        {moment(post.createdAt).format('L, LT')}
      </div>
      <img
        src={`http://localhost:3000/uploadfile/${post.media}`}
        className="overflow-y-hidden object-contain object-center w-[30%]"
      ></img>
      <div className="w-auto flex items-center">
        <p className="text-yellow-500">{post.body}</p>
      </div>
    </div>
  );
};

export default Popup;
