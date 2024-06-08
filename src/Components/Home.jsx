import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home({ apiData, pending, addtoFav, setSearch, setPending }) {

    const handleSearch = (e) => {
        setTimeout(() => {
            setSearch(e.target.value);
            setPending(true);
        }, 2000);
    }

    const notify = (msg) => toast.success(`${msg} added to favorites!`);

    const addTofav = (element) => {
        addtoFav(element);
        notify(element.title);
    }

    return (
        <div className='p-6'>
            <div className='flex items-center justify-center w-full gap-4'>
                <Link to='/favourite'><button className='btn btn-primary'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    Favorites
                </button></Link>
                <input type="text" placeholder="Search book" onChange={(e) => { handleSearch(e) }} className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4 mt-10">
                {
                    !pending && apiData.map((element, index) => {
                        return (
                            <div key={index} className="card w-full p-4 border-4 border-gray-500">
                                <div className="card-body">
                                    <h2 className="card-title text-lg">{element.title}</h2>
                                    <div className="flex flex-wrap">
                                        {element.author_name.map((name, index) => {
                                            return (
                                                <h1 key={index} className="author-name font-normal text-base">{name}</h1>
                                            )
                                        })}
                                    </div>
                                    <p className="font-normal text-sm text-gray-600">Edition Count - {element.edition_count}</p>
                                    <div className="flex justify-end">
                                        <button className="btn btn-outline btn-primary" onClick={() => { addTofav(element) }}>Add to Favorites</button>
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
