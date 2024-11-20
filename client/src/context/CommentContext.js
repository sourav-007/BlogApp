import axios from "axios";
import React, { createContext, useCallback, useContext, useState } from "react";


const CommentContext = createContext()

export const CommentProvider = ({ children }) => {

    const [comments, setComments] = useState([])

    const getComments = useCallback(async (postId) => {
        console.log('entered com');

        try {
            const response = await axios.get(`http://localhost:5002/api/posts/${postId}/comments`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`,
                },
            })
            if (response.status === 200) {
                setComments(response.data.data);
                console.log('comres:', response.data.data);
            }

        } catch (error) {
            console.error('Error fetching comments', error);
        }
    }, [setComments, localStorage.getItem('Token')])

    const createComment = async (postId, content) => {
        try {
            const response = await axios.post(`http://localhost:5002/api/posts/${postId}/comments`, {content}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`,
                },
            })
            if (response.status === 201) {
                setComments((prevComments) => [response.data.data, ...prevComments]);
                // await getComments(postId);
            }
        } catch (error) {
            console.error('Error creating comment', error);
        }
    }

    const updateComment = async (postId, commentId, content) => {
        try {
            const response = await axios.put(`http://localhost:5002/api/posts/${postId}/comments/${commentId}`, { content }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`,
                },
            })
            if (response.status === 200) {
                setComments((prevComments) =>
                    prevComments.map((comment) => (comment._id === commentId ? response.data.data : comment))
                );
                // await getComments(postId);
            }
        } catch (error) {
            console.error('Error updating comment', error);
        }
    }

    const deleteComment = async (postId, commentId) => {
        try {
            const response = await axios.delete(`http://localhost:5002/api/posts/${postId}/comments/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`,
                },
            })
            if (response.status === 200) {
                setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
                // await getComments(postId);
            }
        } catch (error) {
            console.error('Error deleting comment', error);
        }
    }





    return (
        <CommentContext.Provider value={{ comments, getComments, createComment, updateComment, deleteComment }}>
            {children}
        </CommentContext.Provider>
    )

}

export const useComment = () => useContext(CommentContext);
