import { useState, useEffect } from "react";
import appwriteServise from "../appWrite/config";
import { PostCard, Container } from "../components/index";
import { set } from "react-hook-form";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteServise.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });

    if (posts.length === 0) {
      return (
        <div className="py-8">
          <Container>
            <h2 className="text-2xl font-bold text-center">No posts found</h2>
          </Container>
        </div>
      );
    }
  }, []);

  return <div></div>;
};

export default Home;
