import { useState } from "react"

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      {showInfo ? (
        <Info blog={blog} toggle={toggleInfo} />
      ) : (
        <p>
          {blog.title} <button onClick={toggleInfo}>View</button>
        </p>
      )}
    </div>
  );
}

const Info = ({ blog, toggle }) => 
  <>
    <p> {blog.title} <button onClick={toggle}>Hide</button> </p>
    <p> {blog.url} </p>
    <p> Likes: {blog.likes} </p>
    <p> {blog.author} </p>
  </>

export default Blog