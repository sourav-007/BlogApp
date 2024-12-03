import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './component/Auth/Register'
import Login from './component/Auth/Login'
import { Layout } from './component/Layouts/Layout'
import BlogPost from './component/Blogs/BlogPost'
import { AuthProvider } from './context/AuthContext'
import Home from './component/Home/Home'
import { BlogProvider } from './context/BlogContext'
import NotFound from './component/utils/NotFound'
import Unauthorized from './component/utils/Unauthorized'
import Account from './component/Profile/Account'
import ForgotPassword from './component/Profile/ForgotPassword'
import ResetPassword from './component/Profile/ResetPassword'
import AllBlogs from './component/Blogs/AllBlogs'
import Favorite from './component/Blogs/Favorite'
import HealthBlogs from './component/Blogs/HealthBlogs'
import BusinessBlogs from './component/Blogs/BusinessBlogs'
import { FavoriteProvider } from './context/FavoriteContext'
import SearchResult from './component/Search/SearchResult'
import SportsBlogs from './component/Blogs/SportsBlogs'
import Dash from './component/Admin/Dash'
import CreateBlog from './component/Admin/CreateBlog'
import BlogDetails from './component/Blogs/BlogDetails'
import { CommentProvider } from './context/CommentContext'
import TechBlogs from './component/Blogs/TechBlogs'
import EditBlog from './component/Admin/EditBlog'
import PublicRoute from './component/utils/PublicRoute'


function App() {

  return (
    <Router>
      <AuthProvider>
        <BlogProvider>
          <CommentProvider>
            <FavoriteProvider>
              <Routes>

                <Route element={<Layout />}>

                  <Route path='/register' element={<PublicRoute> <Register /> </PublicRoute>}></Route>
                  <Route path='/login' element={<PublicRoute> <Login /> </PublicRoute>}></Route>

                  <Route path='/' element={<Home />}></Route>

                  <Route path='/blogs' element={<BlogPost />} />
                  <Route path='/blogs/:id' element={<BlogDetails />} />
                  <Route path='/all-blogs' element={<AllBlogs />} />
                  <Route path='/sports' element={<SportsBlogs />} />
                  <Route path='/health' element={<HealthBlogs />} />
                  <Route path='/business' element={<BusinessBlogs />} />
                  <Route path='/tech' element={<TechBlogs />} />
                  <Route path='/favorite' element={<Favorite />} />
                  
                  <Route path='/search' element={<SearchResult />} />
                  <Route path='/profile' element={<Account />} />
                  <Route path='/forgot-password' element={<ForgotPassword />} />
                  <Route path='/reset-password/:token' element={<ResetPassword />} />
                  <Route path='*' element={<NotFound />} />

                  <Route path='/dashboard' element={<Dash />} />
                  <Route path='/dashboard/create-blog' element={<CreateBlog />} />
                  <Route path='/edit-blog/blogs/:id' element={<EditBlog />} />

                  <Route path='/unauthorized' element={<Unauthorized />} />
                </Route>

              </Routes>
            </FavoriteProvider>
          </CommentProvider>
        </BlogProvider>

      </AuthProvider>
    </Router>
  )
}

export default App