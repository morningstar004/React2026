import React from "react";
import AppwriteServices from "../appWrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImg }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-grey-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4 flex">
          <img
            src={AppwriteServices.getFilePreview(featuredImg)}
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
