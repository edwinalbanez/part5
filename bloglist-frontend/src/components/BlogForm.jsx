import { useState } from "react";
import blogsService from "../services/blogs";


const BlogForm = ({ onSubmit }) => {
  const emptyBlog = {
    title: "",
    author: "",
    url: "",
  };

  const [data, setData] = useState(emptyBlog);

  const handleChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    setData(data => ({
      ...data,
      [key]: value
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBlog = await blogsService.create(data);
    onSubmit(newBlog);
    setData(emptyBlog);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{display: 'grid', gap: 4}}>
          <div>
            <label>
              Title:{" "}
              <input 
                id="title"
                type="text"
                value={data.title}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Author{" "}
              <input
                id="author"
                type="text"
                value={data.author}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              URL:{" "}
              <input
                id="url"
                type="text"
                value={data.url}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <button>Create</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BlogForm
