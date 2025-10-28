import { useState } from "react"

const Blog = ({ blog, onLike, onDelete }) => {
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
    onLike(blogId);
  };

  const handleDelete = async (blog) => {
    onDelete(blog);
  }

  return (
    <div style={blogStyle}>
      {showInfo ? (
        <Info
          blog={blog}
          toggle={toggleInfo}
          onLike={handleLike}
          onDelete={handleDelete}
        />
      ) : (
        <p>
          {blog.title} <button onClick={toggleInfo}>View</button>
        </p>
      )}
    </div>
  );
}

const Info = ({ blog, toggle, onLike, onDelete }) => 
  <>
    <p> {blog.title} <button onClick={toggle}>Hide</button> </p>
    <p> {blog.url} </p>
    <p>
      Likes: {blog.likes}{' '}
      <button onClick={() => onLike(blog.id)}>Like</button>
    </p>
    <p> {blog.author} </p>
    <button style={{margin: '0px 0px 10px'}} onClick={() => onDelete(blog)}>
      Remove
    </button>
  </>

export default Blog