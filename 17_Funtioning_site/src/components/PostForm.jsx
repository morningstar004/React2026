import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../components/index";
import appwriteService from "../appWrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useToast } from "./ToastProvider";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const PostForm = ({ post }) => {
  const navigate = useNavigate();
  const notify = useToast();
  const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);
  const fileInput = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(Boolean(post));
  const [submitStage, setSubmitStage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const title = watch("title", "");
  const slug = watch("slug", "");
  const slugTransform = useCallback((value) => {
    if (!value || typeof value !== "string") return "";
    return value
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 36)
      .replace(/-+$/g, "");
  }, []);

  useEffect(() => {
    if (!post && !slugManuallyEdited) {
      setValue("slug", slugTransform(title), { shouldValidate: Boolean(title) });
    }
  }, [post, setValue, slugManuallyEdited, slugTransform, title]);

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setImagePreview("");
  }, [imageFile]);

  const imageRegistration = register("image", {
    validate: (files) => post || files?.length > 0 || "Choose a cover image for your post.",
  });
  const slugRegistration = register("slug", {
    required: "A URL slug is required.",
    maxLength: { value: 36, message: "Slugs can be up to 36 characters." },
    pattern: {
      value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      message: "Use lowercase letters, numbers, and hyphens only.",
    },
  });

  const handleImageChange = (event) => {
    imageRegistration.onChange(event);
    const file = event.target.files?.[0];
    if (!file) {
      setImageFile(null);
      return;
    }
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      event.target.value = "";
      setValue("image", undefined, { shouldValidate: true });
      setImageFile(null);
      notify("Choose a JPG, PNG, WebP, or GIF image.", "error");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      event.target.value = "";
      setValue("image", undefined, { shouldValidate: true });
      setImageFile(null);
      notify("Cover images must be 10 MB or smaller.", "error");
      return;
    }
    setImageFile(file);
  };

  const submit = async (data) => {
    if (!authStatus || !userData) {
      notify("Sign in before publishing a post.", "error");
      navigate("/login");
      return;
    }

    const normalizedSlug = slugTransform(data.slug || data.title);
    if (!normalizedSlug) {
      notify("Add a title so we can create a URL for your post.", "error");
      return;
    }

    setSubmitStage("Preparing post…");
    let uploadedFileId = null;
    try {
      let featuredImg = post?.featuredImg || "";
      const selectedFile = data.image?.[0];

      if (selectedFile instanceof File) {
        setSubmitStage("Uploading cover image…");
        const uploadedFile = await appwriteService.uploadFile(selectedFile);
        if (!uploadedFile) throw new Error("The cover image could not be uploaded. Check your connection and try again.");
        uploadedFileId = uploadedFile.$id;
        featuredImg = uploadedFileId;
      }

      setSubmitStage("Saving post…");
      const savedPost = post
        ? await appwriteService.updatePost(post.$id, {
            title: data.title.trim(),
            featuredImg,
            content: data.content,
            status: data.status,
          })
        : await appwriteService.createPost({
            title: data.title.trim(),
            slug: normalizedSlug,
            featuredImg,
            content: data.content,
            status: data.status,
            userId: userData.$id,
          });

      if (!savedPost) {
        throw new Error("The post could not be saved. Its URL may already be in use, or Appwrite may not allow this action.");
      }

      if (post && uploadedFileId && post.featuredImg) {
        await appwriteService.deleteFile(post.featuredImg);
      }

      notify(post ? "Your changes have been saved." : "Your post is published.", "success");
      navigate(`/post/${savedPost.$id}`);
    } catch (error) {
      if (uploadedFileId) await appwriteService.deleteFile(uploadedFileId);
      notify(error?.message || "Something went wrong while saving your post.", "error");
    } finally {
      setSubmitStage("");
    }
  };

  const onInvalid = (invalidFields) => {
    const firstError = Object.values(invalidFields)[0];
    const firstField = Object.keys(invalidFields)[0];
    const message = firstError?.message || "Complete the required fields before publishing.";
    notify(message, "error");

    requestAnimationFrame(() => {
      const field = document.querySelector(`[data-form-field="${firstField}"]`);
      field?.scrollIntoView({ behavior: "smooth", block: "center" });
      if (firstField === "image") fileInput.current?.focus();
      else if (firstField === "content") field?.querySelector("iframe")?.focus();
      else field?.focus?.();
    });
  };
  const previewSrc = imagePreview || (post?.featuredImg ? appwriteService.getFilePreview(post.featuredImg) : "");

  return (
    <form
      onSubmit={handleSubmit(submit, onInvalid)}
      className="grid grid-cols-1 gap-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-[minmax(0,2fr)_minmax(17rem,1fr)]"
    >
      <div className="flex min-w-0 flex-col gap-5">
        <Input
          label="Post title"
          placeholder="A clear, specific title"
          maxLength={120}
          aria-invalid={Boolean(errors.title)}
          className={errors.title ? "border-rose-500 focus:border-rose-500 focus:ring-rose-100" : ""}
          data-form-field="title"
          aria-describedby="title-help title-error"
          {...register("title", {
            required: "Add a title for your post.",
            maxLength: { value: 120, message: "Titles can be up to 120 characters." },
          })}
        />
        <p id="title-help" className="-mt-4 text-xs text-slate-500">A good title helps readers know what they’ll get from your story.</p>
        {errors.title && <p id="title-error" className="-mt-4 text-sm text-rose-700">{errors.title.message}</p>}

        <div>
          <Input
            label="Post URL"
            placeholder="my-first-post"
            autoCapitalize="none"
            autoComplete="off"
            readOnly={Boolean(post)}
            aria-invalid={Boolean(errors.slug)}
            className={errors.slug ? "border-rose-500 focus:border-rose-500 focus:ring-rose-100" : ""}
            data-form-field="slug"
            aria-describedby="slug-help slug-error"
            {...slugRegistration}
            onChange={(event) => {
              if (post) return;
              setSlugManuallyEdited(true);
              setValue("slug", slugTransform(event.target.value), {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
          />
          <p id="slug-help" className="mt-2 text-xs text-slate-500">
            {post
              ? "This post’s URL stays the same after publishing."
              : <>This becomes <span className="font-medium text-slate-700">/post/{slug || "your-post-url"}</span>. You can edit it before publishing.</>}
          </p>
          {errors.slug && <p id="slug-error" className="mt-1 text-sm text-rose-700">{errors.slug.message}</p>}
          {!post && slugManuallyEdited && (
            <button
              type="button"
              onClick={() => {
                setSlugManuallyEdited(false);
                setValue("slug", slugTransform(title), { shouldDirty: true, shouldValidate: true });
              }}
              className="mt-2 text-xs font-semibold text-indigo-700 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-900"
            >
              Generate from title
            </button>
          )}
        </div>

        <RTE
          label="Your story"
          name="content"
          control={control}
          defaultValue={post?.content || ""}
          rules={{
            validate: (value) => {
              const plainText = new DOMParser()
                .parseFromString(value || "", "text/html")
                .body.textContent?.replace(/\u00a0/g, " ")
                .trim();
              return Boolean(plainText) || "Write a little about your topic before saving.";
            },
          }}
          error={errors.content?.message}
          invalid={Boolean(errors.content)}
          data-form-field="content"
        />
      </div>

      <aside className="flex min-w-0 flex-col gap-5 rounded-xl bg-slate-50 p-4 sm:p-5">
        <section>
          <h2 className="text-sm font-semibold text-slate-800">Cover image</h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">Choose an image that gives readers a preview of your story.</p>
          <div data-form-field="image" className={`relative mt-3 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-white px-4 py-5 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40 focus-within:ring-4 focus-within:ring-indigo-100 ${errors.image ? "border-rose-500 ring-4 ring-rose-100" : "border-slate-300"}`}>
            <input
              {...imageRegistration}
              ref={(element) => {
                imageRegistration.ref(element);
                fileInput.current = element;
              }}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              aria-label="Choose a cover image"
              aria-invalid={Boolean(errors.image)}
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              onChange={handleImageChange}
            />
            <span className="mb-2 grid size-10 place-items-center rounded-full bg-indigo-100 text-indigo-700" aria-hidden="true">↑</span>
            <span className="text-sm font-semibold text-indigo-700">{imageFile ? "Choose a different image" : "Choose a cover image"}</span>
            <span className="mt-1 max-w-full break-all text-xs text-slate-500">
              {imageFile?.name || (post?.featuredImg ? "Current image kept unless you choose another" : "JPG, PNG, WebP, or GIF · up to 10 MB")}
            </span>
          </div>
          {errors.image && <p className="mt-2 text-sm text-rose-700">{errors.image.message}</p>}
          {previewSrc && (
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
              <img src={previewSrc} alt="Cover preview" className="aspect-[16/10] w-full object-cover" />
              {imageFile && (
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setValue("image", undefined, { shouldValidate: true });
                    if (fileInput.current) fileInput.current.value = "";
                  }}
                  className="w-full border-t border-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Remove selected image
                </button>
              )}
            </div>
          )}
        </section>

        <section>
          <Select
            label="Visibility"
            options={[
              { value: "active", label: "Published" },
              { value: "inactive", label: "Draft" },
            ]}
            aria-describedby="visibility-help"
            aria-invalid={Boolean(errors.status)}
            data-form-field="status"
            {...register("status", { required: true })}
          />
          <p id="visibility-help" className="mt-2 text-xs leading-relaxed text-slate-500">Published posts appear in the feed. Drafts stay hidden until you publish them.</p>
        </section>

        <div className="mt-auto border-t border-slate-200 pt-4">
          <Button type="submit" className="w-full" disabled={Boolean(submitStage)}>
            {submitStage || (post ? "Save changes" : "Publish post")}
          </Button>
          <p className="mt-2 text-center text-xs text-slate-500">You can edit your post after saving.</p>
        </div>
      </aside>
    </form>
  );
};

export default PostForm;
