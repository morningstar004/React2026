import appwriteService from "../appWrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImg }) => {
  return (
    <Link to={`/post/${$id}`} className="group block h-full">
      <article className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition duration-200 group-hover:-translate-y-1 group-hover:border-indigo-200 group-hover:shadow-lg">
        <div className="mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
          <img
            src={appwriteService.getFilePreview(featuredImg)}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <h2 className="line-clamp-2 px-1 pb-1 text-lg font-semibold leading-snug text-slate-800">{title}</h2>
      </article>
    </Link>
  );
};

export default PostCard;
