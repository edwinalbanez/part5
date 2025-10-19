import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

  useEffect(() => {
    const userIsLogged = window.localStorage.getItem('loggedUser');
    if (userIsLogged) {
      const loggedUser = JSON.parse(userIsLogged);
      setUser(loggedUser);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService.login({ username, password });
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(loggedUser)
      );
      setUser(loggedUser);
      
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div style={{display: 'grid', gap: 5}}>
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
                  type="text"
                  value={password}
                  required
                  onChange={({ target }) => setPassword(target.value)}
                />
              </label>
            </div>
            <div>
              <button type="submit">Enviar</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <div>
        {user.name} logged in{' '}
        <button onClick={handleLogOut}>Log out</button>
      </div><br />
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App