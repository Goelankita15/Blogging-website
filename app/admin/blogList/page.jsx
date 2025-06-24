'use client'

import React, { useState, useEffect } from 'react';
import BlogTableItem from '../../../components/adminComp/BlogTableItem';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {assets} from '@/Assets/assets'
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const Page = () => {
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('/api/blog');
            setBlogs(response.data.blogs);
        } catch (error) {
            console.error("Failed to fetch blogs", error);
            toast.error("Error fetching blogs");
        }
    };

    const handleDeleteBlog = async (mongoid) => {
        try {
            const response = await axios.delete('/api/blog', {
                params: { id: mongoid }
            });
            toast.success(response.data.message);
            await fetchBlogs(); // Refresh blog list after deletion
        } catch (error) {
            console.error("Blog deletion failed", error);
            toast.error("Failed to delete blog");
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <ToastContainer />
            <h1 className='text-xl font-bold mb-4'>All Blogs</h1>
            <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
                        <tr>
                            <th scope='col' className='hidden sm:block px-6 py-3'>Author name</th>
                            <th scope='col' className='px-6 py-3'>Blog Title</th>
                            <th scope='col' className='px-6 py-3'>Blog Date</th>
                            <th scope='col' className='px-6 py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((item, index) => (
                            <BlogTableItem
                                key={index}
                                author_img={item.author_img}
                                author={item.author}
                                title={item.title}
                                date={item.date}
                                mongoid={item._id}
                                deleteBlog={handleDeleteBlog}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page;
