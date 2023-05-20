import { ChangeEvent, useEffect, useState } from 'react';
import { api } from '../utils/api';
import { Post } from '../types/types';
import PostContainer from './PostContaine';
import Input from './Input';

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  

  useEffect(() => {
    api.getAllPosts().then((res) => setPosts(res));
  }, []);

  return (
    <div className="h-screen flex flex-col items-center bg-blue-900">
      <Input/>
      {posts?.map((post) => (
        <PostContainer post={post} key={post.id} />
      ))}
    </div>
  );
};

export default HomePage;
