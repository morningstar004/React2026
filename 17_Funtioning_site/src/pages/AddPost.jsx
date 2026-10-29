import { PostForm, Container } from "../components/index";

const AddPost = () => {
  return (
    <div className="py-8 sm:py-12">
      <Container>
        <div className="mb-7 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Write something worth sharing</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Create a post</h1>
          <p className="mt-3 text-slate-600">Give your story a clear title, add the details readers need, then choose a cover image. You can save it as a draft or publish it to the feed.</p>
        </div>
        <PostForm />
      </Container>
    </div>
  );
};

export default AddPost;
