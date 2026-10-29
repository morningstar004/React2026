import { useEffect, useState } from "react";
import appwriteService from "../appWrite/config";
import { PostCard, Container } from "../components/index";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    appwriteService
      .getPosts([])
      .then((result) => {
        if (!active) return;
        if (result) setPosts(result.documents);
        else setFailed(true);
      })
      .catch(() => {
        if (active) setFailed(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="w-full py-10 sm:py-14">
      <Container>
        <div className="mb-8 flex flex-col gap-2 sm:mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">The collection</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">All posts</h1>
          <p className="max-w-2xl text-slate-600">Browse the latest stories and ideas from the community.</p>
        </div>
        {loading ? (
          <p className="py-12 text-center text-slate-500" role="status">Loading posts…</p>
        ) : failed ? (
          <p className="rounded-xl bg-white p-8 text-center text-slate-600">Posts could not be loaded. Please try again.</p>
        ) : posts.length ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => <PostCard key={post.$id} {...post} />)}
          </div>
        ) : (
          <p className="rounded-xl bg-white p-8 text-center text-slate-600">No posts yet. Check back soon.</p>
        )}
      </Container>
    </div>
  );
};

export default AllPosts;
