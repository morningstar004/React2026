import { useEffect, useState } from "react";
import appwriteService from "../appWrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    setLoading(true);
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-16 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-lg font-medium text-slate-500" role="status">Loading posts…</h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0 && !authStatus) {
    return (
      <div className="w-full py-20 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold text-slate-800">
                Sign in to explore the stories
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-20 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold text-slate-800">No posts available yet</h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-10 sm:py-14">
      <Container>
        <div className="mb-8 flex flex-col gap-2 sm:mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Ideas worth sharing</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Stories from the community</h1>
          <p className="max-w-2xl text-slate-600">Thoughts, lessons, and inspiration from writers like you.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
