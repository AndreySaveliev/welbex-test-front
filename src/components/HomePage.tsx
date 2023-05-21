import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { Post } from '../types/types';
import PostContainer from './PostContaine';
import Input from './Input';
// import { UserContext } from '../context/userContex';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  // const user: User = JSON.parse(JSON.stringify(localStorage.getItem('user')))

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  useEffect(() => {
    api.getAllPosts().then((res) => setPosts(res));
  }, []);

  return (
    // <UserContext.Provider value={user}>
      <div className="flex h-full min-h-screen flex-col items-center bg-blue-900">
        <Input setPosts={setPosts} posts={posts}/>
        {posts?.reverse().map((post) => (
          <PostContainer post={post} key={post.id} />
        )).reverse()}
        <MdLogout className="fixed top-10 right-10 text-yellow-500 cursor-pointer" size={40} onClick={handleLogout}/>
      </div>
    // </UserContext.Provider>
  );
};

export default HomePage;
