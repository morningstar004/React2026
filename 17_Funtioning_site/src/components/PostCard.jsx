import appwriteService from "../appWrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImg }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-[#BDE0FE] rounded-xl p-4">
        <div className="w-full justify-center mb-4 flex">
          <img
            src={appwriteService.getFilePreview(featuredImg)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
