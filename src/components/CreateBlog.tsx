'use client';

import React, {useEffect, useState} from 'react';
import Navbar from '@/components/Navbar';

interface Blog {
    id: number;
    author: string;
    date: string;
    title: string;
    description: string;
    imageUrl: string;
}

const CreateBlog: React.FC = () => {
    const [author, setAuthor] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const initialBlogs: Blog[] = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('myData') || '[]') : [];
    const [data, setData] = useState<Blog[]>(initialBlogs);

    useEffect(() => {
        localStorage.setItem('myData', JSON.stringify(data));
    }, [data]);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!author.trim()) newErrors.author = 'Author is required';
        if (!title.trim()) newErrors.title = 'Title is required';
        if (!description.trim()) newErrors.description = 'Description is required';
        if (!imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
        return newErrors;
    };

    const addData = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const currentDate = new Date().toLocaleDateString();
        const newData: Blog = {
            id: data.length + 1,
            author: author,
            date: currentDate,
            title: title,
            description: description,
            imageUrl: imageUrl
        };
        const updatedData = [...data, newData];
        setData(updatedData);
        setAuthor('');
        setTitle('');
        setDescription('');
        setImageUrl('');
        setErrors({});
    };

    return (
        <div>
            <Navbar/>
            <div className="container mx-auto p-5">
                <div className="grid grid-cols-1 gap-4">
                    <input
                        type="text"
                        className="form-control mb-2 p-2 border border-gray-300 rounded"
                        placeholder="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    <div className="min-h-[20px]">
                        {errors.author && <p className="text-red-500">{errors.author}</p>}
                    </div>
                    <input
                        type="text"
                        className="form-control mb-2 p-2 border border-gray-300 rounded"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="min-h-[20px]">
                        {errors.title && <p className="text-red-500">{errors.title}</p>}
                    </div>
                    <textarea
                        className="form-control mb-2 p-2 border border-gray-300 rounded"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="min-h-[20px]">
                        {errors.description && <p className="text-red-500">{errors.description}</p>}
                    </div>
                    <input
                        type="text"
                        className="form-control mb-2 p-2 border border-gray-300 rounded"
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <div className="min-h-[20px]">
                        {errors.imageUrl && <p className="text-red-500">{errors.imageUrl}</p>}
                    </div>
                    <button onClick={addData} className="mb-2 py-2 bg-gray-100">
                        Add Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateBlog;