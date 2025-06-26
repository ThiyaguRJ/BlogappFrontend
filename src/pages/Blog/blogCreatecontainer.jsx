import axios from "axios";
import BlogCreatePage from "./blogcreate";
import { useState } from "react";
import { BASE_API } from "../../service/baseservice";
import { useNavigate } from "react-router-dom";

const BlogCreateContainer = () => {

  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [categories, setCategories] = useState([
    { _id: "cat1", name: "Web Development" },
    { _id: "cat2", name: "Machine Learning" },
    { _id: "cat3", name: "Mobile Apps" },
    { _id: "cat4", name: "Cybersecurity" },
  ]);
  // eslint-disable-next-line no-unused-vars
  const [tags, setTags] = useState([
    { _id: "tag1", name: "React" },
    { _id: "tag2", name: "Node.js" },
    { _id: "tag3", name: "TailwindCSS" },
    { _id: "tag4", name: "API" },
    { _id: "tag5", name: "Deep Learning" },
    { _id: "tag6", name: "Flutter" },
  ]);

  // useEffect(() => {
  //   axios.get("/api/categories").then((res) => setCategories(res.data));
  //   axios.get("/api/tags").then((res) => setTags(res.data));
  // }, []);

  const handleSubmit = async (formData) => {
    console.log("Form data:", formData);
    try {
      const res = await axios.post(
        `${BASE_API.CREATE_BLOG}`,

        formData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      throw new Error("Error in login: " + error.message);
    }
  };

  return (
    <BlogCreatePage
      categories={categories}
      tags={tags}
      onSubmit={handleSubmit}
    />
  );
};

export default BlogCreateContainer;
