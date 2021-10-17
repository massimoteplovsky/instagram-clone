import React from 'react';
import { useParams } from 'react-router-dom';

// Components
import Layout from '../components/shared/Layout';
import Post from '../components/post/Post';
import MorePostFromUser from '../components/post/MorePostsFromUser';

const PostPage = () => {
  const { postId } = useParams();

  return (
    <Layout>
      <Post postId={postId} />
      <MorePostFromUser />
    </Layout>
  );
};

export default PostPage;
