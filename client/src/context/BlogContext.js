import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


const BlogContext = createContext();

export const BlogProvider = ({ children }) => {

  const [posts, setPosts] = useState([]);
  const [categoryPost, setCategoryPost] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null)
  const [latestPost, setLatestPost] = useState([])
  const [trendingPost, setTrendingPost] = useState([])

  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const limit = 9;

  const getBlogs = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5002/api/posts?page=${currentPage}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Token')}`,
        },
      });
      console.log('all res:',response);
      
      if (response.status === 200) {
        setPosts(response.data.data.blogPosts);
        setTotalPages(response.data.data.totalPages);
      }
    } catch (error) {
      console.error("Failed to show blog posts.");
    }
  }, [currentPage])

  useEffect(() => {
    if (isLoggedIn) {
      getBlogs()
    }
  }, [isLoggedIn, currentPage, getBlogs]);

  const getLatestPosts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/latest-posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Token')}`,
        },
      } )
      if(response.status === 200){
        console.log('LP:', response.data.data);
        
        setLatestPost(response.data.data)
      }
    } catch (error) {
      console.error('Failed to show latest posts');
    }
  }, [])


  const getTrendingPost = useCallback(async () => {
    try {
      const response =  await axios.get('http://localhost:5002/api/trending-posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Token')}`,
        },
      })
      if (response.status === 200) {
        console.log('Trending posts:', response.data.data);
        setTrendingPost(response.data.data); 
      }
    } catch (error) {
      console.error('Failed to show latest posts');
    }
  }, [])


  const createBlog = async (blogData) => {
    console.log('blogData:', blogData);

    try {
      const response = await axios.post('http://localhost:5002/api/posts', blogData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Token')}`,
        },
      });

      if (response.status === 201) {
        setPosts((prevPosts) => [response.data, ...prevPosts]);
        navigate(0)
      }
    } catch (error) {
      console.error("Failed to create blog.");
    }
  }

  const deleteBlog = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5002/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Token')}`,
        },
      });

      if (response.status === 200) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete blog post.");
    }
  }

  const updateBlog = async (postId, updatedPost) => {
    
    try {
      console.log('Updated Post:', updatedPost);
      const response = await axios.put(
        `http://localhost:5002/api/posts/${postId}`,
        updatedPost,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('Token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('entered frontend');

      if (response.status === 200) {
        // setPosts((prevPosts) =>
        //   prevPosts.map((post) => (post._id === postId ? updatedPost : post))
        // );
        getBlogs();
        console.log('entered frontend res::', response.data);
      }
    } catch (error) {
      console.error("Failed to update post.");
    }
  }

  const getPostById = useCallback(async (id) => {
    console.log("id", id);

    try {
      const response = await axios.get(`http://localhost:5002/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Token')}`
        }
      });

      if (response.status === 200) {
        // const post = posts.find(post => post._id === parseInt(id));
        console.log(response.data);

        setSelectedPost(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch post:", error);
    }
  }, [])


  const getFilteredPost = useCallback(async (category) => {

    try {
      const response = await axios.post(`http://localhost:5002/api/posts/category?page=${currentPage}&limit=${limit}`, { category }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Token')}`
        }
      })
      console.log("filter", response.data.data);

      if (response.status === 200) {
        setCategoryPost(response.data.data.categoryPost)
        setTotalPages(response.data.data.totalPages)
        setTotalPosts(response.data.data.totalPosts)        
      }
    } catch (error) {
      console.error("Failed to filtered posts", error);
      console.error("Failed to filtered posts", error?.response?.data?.message);
    }

  }, [currentPage])


  const getSortedPost = useCallback(async (sortValue) => {

    try {
      const response = await axios.post('http://localhost:5002/api/posts/sort', sortValue, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Token')}`
        }
      })
      console.log("sort", response.data.data);

      if (response.status === 200) {
        setPosts(response.data.data)
        setCategoryPost(response.data.data)
        setSearchResults(response.data.data)
      }

    } catch (error) {
      console.error("Failed to filtered posts", error);
      console.error("Failed to filtered posts", error?.response?.data?.message);
    }

  }, [])


  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    const search = async () => {

      if (!query) {
        console.log("searchResults :", query);
        setSearchResults([]);
        return;
      }

      setIsLoading(true)
      setError(null)

      try {
        console.log('entered search');

        const response = await axios.get(`http://localhost:5002/api/search?query=${encodeURIComponent(query)}`)

        if (response.status === 200) {
          setSearchResults(response.data.data);
          console.log('sr:', response.data.data);
          localStorage.setItem('searchResults', JSON.stringify(response.data.data));
          localStorage.setItem('searchQuery', query)
        }
      } catch (error) {
        setError('An error occurred while searching. Please try again.');
        console.error("Failed to search", error);
        console.error("Failed to search", error?.response?.data?.message);
      }

    }

    const debounceTimer = setTimeout(search, 300);

    return () => clearTimeout(debounceTimer)

  }, [query])

  useEffect(() => {
    const savedResults = localStorage.getItem('searchResults');
    const savedQuery = localStorage.getItem('searchQuery');

    if (savedResults && savedQuery) {
      setSearchResults(JSON.parse(savedResults));
      setQuery(savedQuery);
    }
  }, []);



  return (
    <BlogContext.Provider
      value={{
        posts,
        currentPage,
        setCurrentPage,
        totalPages,
        totalPosts,
        createBlog,
        deleteBlog,
        updateBlog,
        selectedPost,
        setSelectedPost,
        getLatestPosts,
        latestPost,
        getTrendingPost,
        trendingPost,
        getPostById,
        getFilteredPost,
        categoryPost,
        getSortedPost,
        setQuery,
        searchResults,
        setSearchResults,
        isLoading,
        error
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
