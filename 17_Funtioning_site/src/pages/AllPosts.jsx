import { useState, useEffect } from "react";
import appwriteService from "../appWrite/config";
import { PostCard, Container } from "../components/index";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const data = await appwriteService.getAllPosts();
  //     setPosts(data.posts);
  //   };
  //   fetchPosts();
  // }, []);
  useEffect(() => {}, []);

  appwriteService.getPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
    }
  });
  return (
    <div className="py-8 w-full">
      <Container>
        <div className="flex gap-4 flex-wrap ">
          {posts.map((post) => (
            <PostCard
              key={post.$id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              {...post}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
