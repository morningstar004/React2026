import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appWrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../components/ToastProvider";

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const notify = useToast();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((result) => {
        if (result) setPost(result);
        else {
          notify("We couldn’t find that post or you don’t have permission to edit it.", "error");
          navigate("/all-posts");
        }
      }).finally(() => setLoading(false));
    } else {
      navigate("/");
    }
  }, [slug, navigate, notify]);
  return loading ? (
    <div className="py-16 text-center text-sm text-slate-500" role="status">Loading post…</div>
  ) : post ? (
    <div className="py-8 sm:py-12">
      <Container>
        <div className="mb-7">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Keep the story current</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Edit post</h1>
          <p className="mt-2 text-slate-600">Update your title, story, cover image, or visibility. The published URL stays the same.</p>
        </div>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
