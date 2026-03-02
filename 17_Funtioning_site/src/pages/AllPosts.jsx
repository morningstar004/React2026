import { useState, useEffect } from "react";

import appwriteServise from "../appWrite/config";
import { PostCard, Container } from "../components/index";
import { set } from "react-hook-form";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const data = await appwriteServise.getAllPosts();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  appwriteServise.getPosts([]).then((posts) => setPosts(posts));

  return (
    <div className="py-8">
      <Container>
        <div className="flex- flex-wrap ">
          {posts.map((post) => (
            <PostCard key={post.$id} post={post} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
