import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import Map from './page/Map';
import Shop from './page/Shop';
import Signin from './page/Signin';
import Profile from './page/Profile';
import Posts from './page/Posts';
import AddPost from './component/AddPost';
import ViewPost from './page/ViewPost';
import ViewProfile from './page/ViewProfile';
import MiniApp from './page/MiniApp';
import ViewApp from './page/ViewApp';
import Reviews from './component/Reviews';
import Search from './page/Search';
import Setting from './component/Setting';
import Admin from './page/Admin';
import Docs from './page/Docs';
import Request from './page/Request';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/map' element={<Map/>}/>
        <Route path='/shop/:id' element={<Shop/>}/>
        <Route path='/shop/:id/reviews' element={<Reviews/>}/>
        <Route path='/request/shop' element={<Request/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/profile/:id' element={<ViewProfile/>}/>
        <Route path='/post' element={<Posts/>}/>
        <Route path='/post/:id' element={<ViewPost/>}/>
        <Route path='/app' element={<MiniApp/>}/>
        <Route path='/app/:id' element={<ViewApp/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/setting' element={<Setting/>}/>
        <Route path='/dashboard' element={<Admin/>}/>
        <Route path='/docs/:name' element={<Docs/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
