import React, { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EyeIcon, TrashIcon, UploadIcon } from "lucide-react";
import TagsSelector from "./tagsSelector";

const BlogCreatePage = ({ categories, tags, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [error, setError] = useState("");

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p></p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const handlePostCreate = () => {
    if (!title || !content || !selectedCategory) {
      alert("Title, content, and category are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", selectedCategory);
    formData.append("tags", JSON.stringify(selectedTags));
    formData.append("image", image);

    onSubmit(formData);
  };

  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "") {
      setError("Title is required!");
      return;
    } else if (content === "") {
      setError("Content is required!");
      return;
    } else if (image === null) {
      setError("Image is required!");
      return;
    } else if (selectedCategory === "") {
      setError("Category is required!");
      return;
    } else if (selectedTags?.length === 0) {
      setError("Tags is required!");
      return;
    } else {
      handlePostCreate();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Create New Blog Post
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Content</label>

          <div className="border rounded bg-white p-2 h-[400px]">
            {editor ? (
              <EditorContent
                editor={editor}
                className="w-full h-full outline-none [&>div]:h-full [&>div]:min-h-full overflow-y-auto [&>div]:p-2 [&>div]:text-gray-800 [&>div]:text-base [&>div]:leading-relaxed  [&>div]:max-h-[400px] [&>div]:overflow-y-auto"
              />
            ) : (
              <p className="text-gray-400">Loading editor...</p>
            )}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1"> Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />

          <div className="flex items-center gap-10 ">
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded">
              <UploadIcon className="w-4 h-4" />
              Upload image
            </button>

            {image && (
              <div className="mt-2 flex items-center gap-10">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  className="w-24 h-24 object-cover rounded border"
                />
                <div className="flex gap-6">
                  <button
                    type="button"
                    onClick={() =>
                      window.open(URL.createObjectURL(image), "_blank")
                    }
                    className="text-blue-600 hover:text-blue-800">
                    <EyeIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="text-red-600 hover:text-red-800">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            className="w-full border rounded p-2"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <TagsSelector
          tags={tags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded">
            Publish Post
          </button>
        </div>
        {error && (
          <p
            className={`${
              error === "Login Successfull!" ? "text-green-900" : "text-red-500"
            } text-sm m-1 flex justify-center`}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default BlogCreatePage;
