import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import formattedList from './utils/formattedList'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({});
  const blogFormRef = useRef(null);

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = sortByLikes(blogs);
      setBlogs(sortedBlogs);
    });
  }, []);

  useEffect(() => {
    const userIsLogged = window.localStorage.getItem('loggedUser');
    if (userIsLogged) {
      const loggedUser = JSON.parse(userIsLogged);
      blogService.setToken(loggedUser.token);
      setUser(loggedUser);
    }
  }, []);

  const sortByLikes = blogs => [...blogs.sort((b1, b2) => b2.likes - b1.likes)];
  
  const clearLogin = () => {
    setUsername('');
    setPassword('');
  }

  const showMessage = (message, type = 'success') => {
    setNotification({
      message,
      type,
    });

    setTimeout(() => {
      setNotification({})
    }, 3000);
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService.login({ username, password });
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(loggedUser)
      );
      blogService.setToken(loggedUser.token);
      setUser(loggedUser);
      clearLogin();
      showMessage(`Welcome ${loggedUser.name}`);
      
    } catch (error) {
      const message = error.response.data.error;
      showMessage(message, 'error')
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  }

  const handleSubmitBlog = async (dataBlog) => {
    try {
      const emptyFields = Object.keys(dataBlog).filter(
        (key) => dataBlog[key] === null || dataBlog[key].trim() === ""
      );

      if (emptyFields.length !== 0) {
        showMessage(`
          The ${formattedList(emptyFields)} have invalid values`,
          'error'
        );
        return;
      }

      const newBlog = await blogService.create(dataBlog);
      const sortedBlogs = sortByLikes(blogs.concat(newBlog));
      setBlogs(sortedBlogs);
      showMessage("Blog added successfully");
      blogFormRef.current.toggleVisibility();

    } catch (error) {
      showMessage("Blog not added", 'error');
      console.log(error.response.data.error);
    }
  }

  const handleLike = (likedBlog) => {
    const sortedBlogs = sortByLikes(
      blogs.map(blog => blog.id === likedBlog.id ? likedBlog : blog)
    );
    setBlogs(sortedBlogs);
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <div style={{ display: "grid", gap: 5 }}>
            <div>
              <label>
                Username:{" "}
                <input
                  type="text"
                  value={username}
                  required
                  onChange={({ target }) => setUsername(target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Password:{" "}
                <input
                  type="password"
                  value={password}
                  required
                  onChange={({ target }) => setPassword(target.value)}
                />
              </label>
            </div>
            <div>
              <button type="submit">Log in</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      <div>
        {user.name} logged in <button onClick={handleLogOut}>Log out</button>
      </div>
      <br />
      <div>
        <Togglable buttonLabel="Create new blog" ref={blogFormRef} >
          <BlogForm onSubmit={handleSubmitBlog} />
        </Togglable>
      </div>
      <div>
        <br />
        {blogs.length !== 0
          ? blogs.map(blog => <Blog key={blog.id} blog={blog} onLike={handleLike} />) 
          : "No blogs"}
      </div>
    </div>
  );
}

export default App