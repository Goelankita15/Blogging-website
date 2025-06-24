'use client';
import React, {useState,useEffect } from 'react';
import BlogItem from './BlogItem';
import axios from 'axios';
import {assets} from '@/Assets/assets'
import {blog_data} from '@/Assets/assets';
const BlogList = () =>{
    const [menu, setMenu] = useState("All");
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async() =>{
        const response = await axios.get('/api/blog');
        console.log("response", response.data.blogs);
        setBlogs(response.data.blogs);
    }

    useEffect(()=>{
        fetchBlogs();
    },[]);

    return (
        <div>
            <div className='flex justify-center gap-6 my-10'>
                <button onClick={() => setMenu('All')} className={menu==='All'? 'bg-black text-white py-1 px-4 rounded-sm':""}>All</button>
                <button onClick={ ()=> setMenu('Technology')} className={menu ==='Technology'? 'bg-black text-white py-1 px-4 rounded-sm':""}>Technology</button>
                <button onClick={()=>setMenu('Lifestyle')} className={menu ==='Lifestyle'? 'bg-black text-white py-1 px-4 rounded-sm':""}>Lifestyle</button>  
                <button onClick={()=>setMenu('Startup')} className={menu ==='Startup'? 'bg-black text-white py-1 px-4 rounded-sm':""}>Startup</button>
            </div>   
            <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
                {blogs.filter((item)=> menu==="All"?true:item.category===menu?true:false).map(
                    (item,index)=>{
                        return <BlogItem    
                            key={index}
                            id = {item._id}
                            title={item.title}
                            description={item.description}
                            category={item.category}
                            image={item.image}
                            // author={item.author}
                            // author_img={item.author_img}
                        />
                    }
                )}
            </div>
        </div>
    )
}
export default BlogList;