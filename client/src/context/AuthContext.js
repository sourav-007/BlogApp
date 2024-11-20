import React, { useState, useEffect, useContext, } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const [getUser, setGetUser] = useState(null)
    const [showAlert, setShowAlert] = useState(false);
    


    const navigate = useNavigate()

    const [errors, setErrors] = useState({})

    const formValidate = (userData) => {

        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

        if (!userData.firstname) errors.firstname = '*First name is required'

        if (!userData.lastname) errors.lastname = '*Last name is required'

        if (!userData.email) {
            errors.email = '*Email is required'
        }
        else if (!regex.test(userData.email)) {
            errors.email = '*Invalid email format'
        }

        if (!userData.password) {
            errors.password = '*Password is required'
        }
        else if (userData.password.length < 6) {
            errors.password = '*Password must be at least 6 characters'
        }
        else if (userData.password.length > 12) {
            errors.password = '*Password must be less than 12 characters'
        }

        setErrors(errors)
        return Object.keys(errors).length === 0;
    }

    const register = async (userData) => {

        if (!formValidate(userData)) return;

        try {
            const response = await axios.post('http://localhost:5002/api/register', userData);
            console.log(response)
            if (response.status === 201) {
                setUser(response.data)
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }

        } catch (error) {
            console.error("Error :", error?.response?.data?.message)
            console.log(error.config)
        }
    }

    const login = async (credentials) => {
        console.log('login called');

        try {
            const response = await axios.post('http://localhost:5002/api/login', credentials, {
                withCredentials: true,
            })
            console.log("Login response", response.data)

            if (response.status === 200) {
                //console.log(response.data)
                // const { data } = response.data
                // const { accessToken, role } = data
                const { accessToken, role } = response.data.data

                localStorage.setItem('Token', accessToken)
                localStorage.setItem('Role', role)
                localStorage.setItem('loggedIn', 'true')

                setUser(response.data)

                await new Promise((resolve) => setTimeout(resolve, 500));
                await getUserDetails()
                setIsLoggedIn(true)
                setRole(role)

                setTimeout(() => {
                    if (role === 'admin') {
                        navigate('/dashboard');
                    }
                    else {
                        navigate('/');
                    }
                }, 500)

            }
            else {
                setIsLoggedIn(false)
            }

        } catch (error) {
            if (error?.response?.data?.message === 'Email is required') return console.error("Email is required")
            if (error?.response?.data?.message === 'Password is required') return console.error("Password is required")
            if (error?.response?.data?.message === 'User does not exist') return console.error("User does not exist")
            if (error?.response?.data?.message === 'Invalid Password') return console.error("Invalid Password")
            console.error("Error :", error)
            console.error("Error :", error?.response?.data?.message);

        }

    }

    const logout = async () => {
        try {
            const response = await axios.post('http://localhost:5002/api/logout', null, {
                withCredentials: true,
            });

            console.log(response);

            if (response.status === 200) {
                setUser(null)
                setGetUser(null)
                setIsLoggedIn(false)

                localStorage.clear();

                setTimeout(() => {
                    navigate('/login')
                }, 500);

            }

        } catch (error) {
            console.log("Error : ", error)
        }
    }

    const checkTokenExpiration = () => {
        const token = localStorage.getItem('Token');
        if (token) {
            const decodedToken = jwtDecode(token)
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                logout()
                localStorage.removeItem('Token');
                localStorage.removeItem('Role');
                localStorage.removeItem('loggedIn');
                setUser(null);
                setIsLoggedIn(false);
                navigate('/login');
            }
        }
    };


    axios.interceptors.request.use((config) => {
        checkTokenExpiration();
        const token = localStorage.getItem('Token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });


    const getUserDetails = async () => {
        const token = localStorage.getItem('Token');
        console.log('getuser called')
        if (token) {
            try {
                const response = await axios.get('http://localhost:5002/api/getuser', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('Token')}`,
                    },
                });

                if (response.status === 200) {
                    setGetUser(response.data.data);
                    setIsLoggedIn(true)
                } else {
                    console.error('Failed to fetch user details. Status code:', response.status);
                    setIsLoggedIn(false)
                }
            } catch (error) {
                console.log("Error : ", error)
                setIsLoggedIn(false)
            }
        }

    };

    useEffect(() => {
        if (isLoggedIn) {
            getUserDetails();
        }
    }, [isLoggedIn]);


    // Check login state on initial load or page refresh
    useEffect(() => {
        const token = localStorage.getItem('Token');
        const loggedIn = localStorage.getItem('loggedIn');

        if (token && loggedIn === 'true') {
            // Fetch user details when page is reloaded and token is valid
            getUserDetails();
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const avatar = async (avatarData) => {
        try {
            const response = await axios.post('http://localhost:5002/api/avatar', avatarData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`,
                },
            })
            console.log('avatar:', response);


            if (response.status === 200) {
                setGetUser(response.data.data)
            }
        } catch (error) {
            console.error("Failed to upload user avatar", error);
            console.error("Failed to upload user avatar", error?.response?.data?.message);
        }
    }

    const updateUserDetails = async (updateInfo) => {

        try {
            const response = await axios.put('http://localhost:5002/api/update-profile', updateInfo, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`,
                },
            })

            if (response.status === 200) {
                setUser(response.data.data)
                console.log('user profile updateed');
            }

        } catch (error) {
            console.error("Failed to update user profile", error);
            console.error("Failed to update user profile", error?.response?.data?.message);
        }

    }

    // useEffect(() => {
    //     const token = localStorage.getItem('Token');
    //     const storedIsLoggedIn = localStorage.getItem('loggedIn')

    //     if (token) {
    //         const getUserDetails = async () => {
    //             console.log('called')
    //             try {
    //                 const response = await axios.get('http://localhost:5002/api/getuser', {
    //                     headers: {
    //                         Authorization: `Bearer ${localStorage.getItem('Token')}`,
    //                     },
    //                 });
    //                 console.log(response);
    //                 if (response.status === 200) {
    //                     setGetUser(response.data.data);
    //                     setIsLoggedIn(true)
    //                 } else {
    //                     console.error('Failed to fetch user details. Status code:', response.status);
    //                     setIsLoggedIn(false)
    //                 }
    //             } catch (error) {
    //                 console.log("Error : ", error)
    //                 setIsLoggedIn(false)
    //             }
    //         };
    //         getUserDetails();
    //     }
    //     else {
    //         setIsLoggedIn(false)
    //     }

    // }, []);

    const forgotPassword = async (email) => {

        try {
            const response = await axios.post('http://localhost:5002/api/forgot-password', { email })

            if (response.status === 200) {
                console.log('Email sent to the users register email');
                setShowAlert(true)
                setTimeout(() => {
                    setShowAlert(false)
                }, 10000);

            }
        } catch (error) {
            setShowAlert(false)
            console.error("Failed to forgot password", error);
            console.error("Failed to forgot password", error?.response?.data?.message);
        }

    }

    const resetPassword = async (rToken, data) => {

        try {
            const response = await axios.post(`http://localhost:5002/api/reset-password/${rToken}`, data);

            if (response.status === 200) {
                console.log('Password reset sucessfully');
                setShowAlert(true)
                setTimeout(() => {
                    setShowAlert(false)
                }, 10000);
            }
        } catch (error) {
            setShowAlert(false)
            console.error("Failed to reset password", error);
            console.error("Failed to reset password", error?.response?.data?.message);
        }

    }

    
  

    return (
        <AuthContext.Provider value={{
            user, errors, login, register, logout, role, isLoggedIn, getUser, avatar, updateUserDetails,
            forgotPassword, resetPassword, showAlert, 
        }}>
            {children}
        </AuthContext.Provider>
    );


}


export const useAuth = () => { return useContext(AuthContext); }