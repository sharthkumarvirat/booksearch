import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Favourite({ deleteFromFav }) {

    const [addFav, setAddFav] = useState(JSON.parse(localStorage.getItem('books')) || []);
    const [deleted, setDeleted] = useState(true);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('books'))
        setAddFav(data);
    }, [deleted])

    const notify = () => toast.success("Book removed from favorites!");

    const removeFav = (key)=>{
        notify();
        deleteFromFav(key)
        setDeleted(!deleted);
    }

    return (
        <div className='p-6'>
            <div className='flex items-center justify-center'>
                <Link to="/"> <button className='btn btn-primary'> Home </button></Link>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4 mt-10'>
            {
                addFav.map((book, index) => {
                    return (
                        <div key={index} className="card w-full p-4 border-4 border-gray-500">
                            <div className="card-body">
                                <h2 className="card-title text-lg">{book.title}</h2>
                                <div className="flex flex-wrap">
                                    {book.author_name.map((name, index) => {
                                        return (
                                            <h1 key={index} className="author-name font-normal text-base">{name}</h1>
                                        )
                                    })}
                                </div>
                                <p className="font-normal text-sm text-gray-600">Edition Count - {book.edition_count}</p>
                                <div className="flex justify-end">
                                    <button className="btn btn-outline btn-primary" onClick={() => { removeFav(book.key) }}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
            <ToastContainer />
        </div>
    )
}
