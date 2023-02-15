import React from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Routes, Route, Link } from "react-router-dom";
import Layout from './pages/Layout';
import Courses from './pages/courses/Welcome';
import CoursePost from "./pages/courses/CoursePost";


function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Courses />} />
         { /*<Route path="login" element={< Login />} />
          <Route path="register" element={< Register />} />
  <Route path="cart" element={<Cart />} />*/}

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="/courses/:id" element={<CoursePost/>} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}


function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
export default App;
