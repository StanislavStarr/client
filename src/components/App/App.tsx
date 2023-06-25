import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Posts from '../Posts/Posts';
import NavBar from '../NavBar/NavBar';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NewPost from '../NewPost/NewPost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="posts" element={<Posts />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="newpost" element={<NewPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
