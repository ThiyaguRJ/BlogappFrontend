import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AUTH_API, BASE_API } from "../service/baseservice";
import LikeButton from "./likebutton";

const BlogViewPage = () => {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetchPost();
    setUsername(localStorage.getItem("userName") || "Guest");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${BASE_API.GET_SINGLE_BLOG}/${id}`);
      setPost(res.data.post);
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  };

  const handleLike = async () => {
    await axios.post(`${BASE_API.LIKE_BLOG}/${post._id}`);
    fetchPost();
  };

  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;
    try {
      await axios.post(`${BASE_API.COMMENT_BLOG}/${post._id}`, {
        user: username,
        text: commentText.trim(),
      });
      setCommentText("");
      fetchPost(); 
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  if (!post) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6 mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-2">Category: {post.category}</p>
      <p className="text-sm text-gray-500 mb-4">Tags: {post.tags.join(", ")}</p>

      {post.imageUrl && (
        <img
          src={`${AUTH_API}${post.imageUrl}`}
          alt="Blog"
          className="w-full h-64 object-fit rounded mb-6"
        />
      )}

      <div
        className="prose max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: post.content }}></div>

      <div className="mt-6 flex gap-4">
        <LikeButton post={post} onLike={() => handleLike(post._id)} />

        <div className="flex items-center border rounded-full px-3 py-1 w-full  bg-white">
          <input
            type="text"
            className="flex-grow outline-none p-2 text-sm w-full"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmitComment();
            }}
          />
          <button
            onClick={handleSubmitComment}
            className={`text-sm font-medium ${
              commentText.trim() ? "text-blue-500" : "text-gray-400"
            }`}
            disabled={!commentText.trim()}>
            Post
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Comments</h2>
        {post.comments && post.comments.length > 0 ? (
          <ul className="space-y-2">
            {post.comments.map((cmt, idx) => (
              <li key={idx} className="border-b pb-2">
                <span className="font-medium">{cmt.user}</span>: {cmt.text}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default BlogViewPage;
