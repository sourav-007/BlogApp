import React from 'react'
import t2img from '../../assets/img/t2img.png'
import { FaAngleDoubleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


function Entertainment() {

    const { isLoggedIn } = useAuth
    // const isLoggedIn = localStorage.getItem('loggedIn')

    const articles = [
        {
            image: "/placeholder.svg?height=400&width=600",
            date: "Ukraine, 24 april 2022",
            title: "Zelensky accuses Russia of worst crimes since WW2",
            description: "The Ukrainian leader says Russia must face an international trial as he calls for the country to be thrown off the UN Security Council."
        },
        {
            image: "/placeholder.svg?height=400&width=600",
            date: "Ukraine, 24 april 2022",
            title: "Zelensky accuses Russia of worst crimes since WW2",
            description: "The Ukrainian leader says Russia must face an international trial as he calls for the country to be thrown off the UN Security Council."
        },
        {
            image: "/placeholder.svg?height=400&width=600",
            date: "Ukraine, 24 april 2022",
            title: "Zelensky accuses Russia of worst crimes since WW2",
            description: "The Ukrainian leader says Russia must face an international trial as he calls for the country to be thrown off the UN Security Council."
        },
        {
            image: "/placeholder.svg?height=400&width=600",
            date: "Ukraine, 24 april 2022",
            title: "Zelensky accuses Russia of worst crimes since WW2",
            description: "The Ukrainian leader says Russia must face an international trial as he calls for the country to be thrown off the UN Security Council."
        }
    ];
    return (
        <>
            <section className="container mx-auto px-4 py-8 border-2 border-solid border-red-700">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-primary-text text-4xl font-bold">Entertainment</h2>
                    <button className="bg-primary-btn text-primary-btn-text flex items-center max-w-fit px-10 py-2 rounded-2xl cursor-pointer"
                        disabled={!isLoggedIn}
                    >
                        View All
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {articles.slice(0, 4).map((article, index) => (
                        <div key={index} className="flex flex-col h-full relative group">
                            <div className="relative">
                                <img
                                    src={t2img}
                                    alt={article.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-t-lg sm:h-40 md:h-32 lg:h-32 xl:h-36 2xl:h-56 w-full"
                                />
                            </div>
                            <div className="flex-grow bg-white p-2 rounded-b-lg">
                                <p className="text-sm text-muted-foreground text-gray-700 mb-2">{article.date}</p>
                                <h3 className="text-xl font-semibold text-primary-text mb-2">{article.title}</h3>
                                {/* <p className="text-muted-foreground text-gray-700 mb-2">{article.description}</p> */}

                                <Link to='/blogs' className={`flex items-center gap-1 w-fit text-primary-text text-lg font-semibold group cursor-pointer`}
                                    disabled={!isLoggedIn}>
                                    <span className="flex items-center transform -translate-x-0 opacity-0 transition-all duration-300 ease-in-out 
                                    group-hover:translate-x-0 group-hover:opacity-100">
                                        Read more...
                                    </span>
                                    <FaAngleDoubleRight className="w-5 h-5 transform -translate-x-28 opacity-100 transition-all duration-300 ease-in-out 
                                    group-hover:translate-x-0 group-hover:opacity-100"
                                    />
                                </Link>

                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Entertainment