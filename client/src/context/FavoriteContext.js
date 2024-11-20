import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";



export const FavoriteContext = React.createContext()

export const FavoriteProvider = ({ children }) => {

    const { isLoggedIn } = useAuth()
    const [favoriteList, setFavoriteList] = useState([])

    const savedPost = async (blogId) => {

        try {
            const response = await axios.post(`http://localhost:5002/api/saved-favorite/${blogId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`,
                },
            })
            console.log('savepost:', response.data.data);
            
            

            if (response.status === 200) {
                console.log("blog saved on user savelist");
                setFavoriteList((prev) => [...prev, response.data.data])
            }

        } catch (error) {
            console.error("Failed to save blog", error);
            console.error("Failed to save blog", error?.response?.data?.message);
        }

    }


    const unsavedPost = async (blogId) => {

        try {
            const response = await axios.delete(`http://localhost:5002/api/unsaved-favorite/${blogId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`,
                },
            })
            console.log('unsavepost:', response);

            if (response.status === 200) {
                console.log("blog unsaved from user savelist");
                setFavoriteList((prev) => prev.filter((blog)=> blog._id !== blogId))
            }

        } catch (error) {
            console.error("Failed to unsave blog", error);
            console.error("Failed to unsave blog", error?.response?.data?.message);
        }

    }

    const favoritePost = async () => {

        try {
            const response = await axios.get('http://localhost:5002/api/favorite', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`,
                },
            })
            console.log('fav:', response.data.data);
            
            if (response.status === 200) {
                setFavoriteList(response.data.data)           
            }
        } catch (error) {
            console.error("Failed to fetch favorite posts", error);
            console.error("Failed to fetch favorite posts", error?.response?.data?.message);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            favoritePost();
        }
    }, [isLoggedIn]);




    return (
        <FavoriteContext.Provider value={{ savedPost, unsavedPost, favoritePost, favoriteList }}>
            {children}
        </FavoriteContext.Provider>
    )


}

export const useFavorite = () => { return useContext(FavoriteContext); }