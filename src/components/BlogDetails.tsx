'use client';

import React, {useEffect, useState} from 'react';
import Navbar from '@/components/Navbar';
import Image from "next/image";
import {useParams} from "next/navigation";

interface Blog {
    id: number;
    author: string;
    date: string;
    title: string;
    description: string;
    imageUrl: string;
}

const BlogDetails: React.FC = () => {
    const [blogDetail, setBlogDetail] = useState<Blog | null>(null);
    const {id} = useParams();

    useEffect(() => {
        const blogs: Blog[] = JSON.parse(localStorage.getItem('myData') || '[]');
        const selectedBlog = blogs.find(blog => blog.id === parseInt(id as string));
        setBlogDetail(selectedBlog || null);
    }, [id]);

    if (!blogDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto">
            <Navbar/>
            <div className="card mt-5">
                {blogDetail.imageUrl && <Image
                    src={blogDetail.imageUrl}
                    className="w-full max-h-80 object-cover"
                    alt="Blog"
                    width={300}
                    height={200}
                />}
                <div className="card-body p-5">
                    <h1 className="text-3xl font-bold mb-4">{blogDetail.title}</h1>
                    <p className="mb-2">Author: {blogDetail.author}</p>
                    <p className="text-gray-500">Date: {blogDetail.date}</p>
                    <p className="mb-4">{blogDetail.description}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;