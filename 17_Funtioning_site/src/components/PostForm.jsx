import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../components/index";
import { service as appwriteServise } from "../appWrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.slug || "",
        featuredImg: post?.featuredImg || "",
        status: post?.status || "active",
      },
    });
  const userData = useSelector((state) => state.user.userData);

  const submit = async (data) => {
    if (post) {
      const file = (await data.image[0])
        ? appwriteServise.uploadFile(data.image[0])
        : null;
      if (file) {
        appwriteServise.deleteFile(post.featuredImg);
      }
      const dbPost = await appwriteServise.updatePost(post.$id, {
        ...data,
        featuredImg: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteServise.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImg = fileId;
        const dbPost = await appwriteServise.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
    navigate("/");
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value,{name})=>{
        if(name === "title"){
            setValue('slug', slugTransform(value.title,
                {shouldValidate: true}
            ));
        }    
    });

    return() => {
        subscription.unsubscribe();
    }
  }, [register, slugTransform, setValue, watch]);

  return <div>PostForm</div>;
};

export default PostForm;
