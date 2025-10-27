import { useState } from "react"
import blogsService from "../services/blogs";

const Blog = ({ blog, onLike }) => {
  const [showInfo, setShowInfo] = useState(false);
  const toggleInfo = () => {
    setShowInfo(show => !show)
  }

  const blogStyle = {
    padding: '0px 5px',
    border: "solid 1px",
    marginBottom: 5,
    borderRadius: 5
  };

  const handleLike = async (blogId) => {
    const blog = await blogsService.like(blogId);
    onLike(blog);
  };

  return (
    <div style={blogStyle}>
      {showInfo ? (
        <Info
          blog={blog}
          toggle={toggleInfo}
          onLike={handleLike}
        />
      ) : (
        <p>
          {blog.title} <button onClick={toggleInfo}>View</button>
        </p>
      )}
    </div>
  );
}

const Info = ({ blog, toggle, onLike }) => 
  <>
    <p> {blog.title} <button onClick={toggle}>Hide</button> </p>
    <p> {blog.url} </p>
    <p>
      Likes: {blog.likes}{' '}
      <button onClick={() => onLike(blog.id)}>Like</button>
    </p>
    <p> {blog.author} </p>
  </>

export default Blog