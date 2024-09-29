'use client';

import React, {useEffect, useState} from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';

interface Blog {
    id: number;
    author: string;
    date: string;
    title: string;
    description: string;
    imageUrl: string;
}

const BlogList: React.FC = () => {
    const [data, setData] = useState<Blog[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const blogs: Blog[] = JSON.parse(localStorage.getItem('myData') || '[]');
        setData(blogs);
        setLoading(false);
    }, []);

    const deleteBlog = (id: number) => {
        const updatedData = data.filter(blog => blog.id !== id);
        setData(updatedData);
        localStorage.setItem('myData', JSON.stringify(updatedData));
    };

    let filteredData = data;
    if (searchQuery.trim() !== '') {
        filteredData = data.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    const dataTobBeDisplayed = () => (searchQuery.trim() !== '') ? filteredData : data;

    return (
        <div className="h-full w-full min-h-screen flex flex-col">
            <Navbar/>

            {/* search input */}
            <div className="container flex justify-center my-4">
                <input
                    type="text"
                    className="form-control mb-2 p-2 border border-gray-300 rounded mx-auto h-[40px] w-[200px]"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* loading indicator */}
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <p className="text-2xl font-bold text-gray-500">Loading...</p>
                </div>
            ) : (
                <div
                    style={{minHeight: "calc(100vh - 140px)"}}
                    className="flex flex-col items-center justify-center overflow-y-auto"
                >
                    {dataTobBeDisplayed().length === 0 && (
                        <p className="text-center text-2xl font-bold text-gray-500">No blogs found</p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {dataTobBeDisplayed().map((item) => (
                            <div key={item.id} className="card mb-3 bg-white shadow-md rounded">
                                {item.imageUrl && <Image
                                    src={item.imageUrl}
                                    height={200}
                                    width={300}
                                    className="w-full h-48 object-cover rounded-t"
                                    alt="Blog"
                                    priority
                                />}
                                <div className="card-body p-4">
                                    <h5 className="card-title text-xl font-bold">{item.title}</h5>
                                    <p className="card-text">
                                        {`${item.description.substring(0, 20)}...`}
                                    </p>
                                    <div className="flex justify-between items-center mt-2">
                                        <div>
                                            <p className="m-0 text-sm">{"posted by "}{item.author}</p>
                                            <small className="text-gray-500">{item.date}</small>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <Link href={`/${item.id}`}>
                                            <button
                                                className="btn btn-primary mt-2 text-blue-500 hover:underline"
                                            >
                                                Read more
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => deleteBlog(item.id)}
                                            className="btn btn-danger mt-2 text-blue-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogList;