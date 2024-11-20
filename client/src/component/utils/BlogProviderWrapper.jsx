import { BlogProvider } from '../../context/BlogContext';
import { Outlet } from 'react-router-dom';
import { FavoriteProvider } from '../../context/FavoriteContext';

const BlogProviderWrapper = () => {
  return (
    <BlogProvider>
      <FavoriteProvider>
        <Outlet />
      </FavoriteProvider>
    </BlogProvider>
  );
};

export default BlogProviderWrapper;
