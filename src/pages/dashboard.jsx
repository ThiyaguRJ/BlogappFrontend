import React, { useState, useEffect } from "react";
import axios from "axios";
import { AUTH_API, BASE_API } from "../service/baseservice";
import { Link } from "react-router-dom";
import LikeButton from "../Components/likebutton";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3); 

  useEffect(() => {
    const updateLimit = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setLimit(6); 
      } else if (window.matchMedia("(min-width: 640px)").matches) {
        setLimit(4); 
      } else {
        setLimit(2); 
      }
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);

    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  useEffect(() => {
    fetchDashboardData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page, limit]);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(`${BASE_API.GET_ALL_BLOG}`, {
        params: { search, page, limit },
      });
      setPosts(res.data.posts);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Blog Post Management
        </h1>

        {/* Search */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full border rounded p-2"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow overflow-hidden flex flex-col h-[350px]">
              <Link
                to={`/blog/${post._id}`}
                className="flex flex-row sm:flex-row md:flex-row h-full">
                <div className="flex-1 p-4 flex flex-col gap-2 w-[200px] h-[270px]">
                  <h3 className="text-lg font-bold text-gray-800">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{post.category}</p>
                  <p className="text-sm text-gray-500">
                    Tags: {post.tags.join(", ")}
                  </p>
                  <p
                    className="text-gray-700 mt-2 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>

                <div className="sm:w-40 sm:h-auto flex-shrink-0">
                  <img
                    src={`${AUTH_API}${post.imageUrl}`}
                    alt="Post"
                    className="w-[160px] h-full object-cover"
                  />
                </div>
              </Link>

              <Link to={`/blog/${post._id}`}>
                <div className="flex justify-between p-4 ">
                  <LikeButton post={post} />
                  <button className="text-green-600 hover:text-green-800 font-medium">
                    💬 Comment
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-3 py-1 rounded ${
              page === 1
                ? "bg-gray-300"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}>
            Previous
          </button>

          <span>Page {page}</span>

          <button
            disabled={posts.length < limit}
            onClick={() => setPage(page + 1)}
            className={`px-3 py-1 rounded ${
              posts.length < limit
                ? "bg-gray-300"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
