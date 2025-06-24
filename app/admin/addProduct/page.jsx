'use client';
import React from 'react';
import { useState } from 'react';
import {assets} from '@/Assets/assets';
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const page = () => {
    const [image , setImage] = useState(false);
    const [data , setData] = useState({
        title:"",
        description:"",
        category:"Startup",
        author:"Alex",
        author_img:"/author_img.png",
        
    });
    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data, [name]:value}));
        console.log(data);
    }
    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('author', data.author);
        formData.append('author_img', data.author_img);
        formData.append('image', image);
        const response = await axios.post('/api/blog', formData);
        console.log("outside response.success")
        if(response.data.success){
            console.log("inside response.success")
            
            toast(response.data.message);
            console.log(response.data);

            setImage(false);
            setData({
                title:"",
                description:"",
                category:"Startup", 
                author:"Alex",
                author_img:"/author_img.png",
            });
        }else{
            toast('error occured');
            console.log(response.data.message);
        }
    }
    return( 
        <>
            <form onSubmit = {onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16' >
                <p className='text-xl'>Upload thumbnail</p>
                <label htmlFor="image">
                    <Image src={!image? assets.upload_area:URL.createObjectURL(image)} alt='upload icon' width={140} height={70} className='mt-4' />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
                <p className ='text-xl mt-4'>Blog Title</p>
                <input name = 'title' onChange={onChangeHandler} value = {data.title} className = 'w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder="Title you Blog" required/>

                <p className ='text-xl mt-4'>Blog description</p>
                <textarea name = 'description' onChange={onChangeHandler} value = {data.description} className = 'w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder="write here " rows={6} required/>
                <p className='text-xl mt-4'> Blog Category</p>
                <select name = 'category' onChange={onChangeHandler} value = {data.category} className='w-40 mt-4 px-4 py-3 border text-gray-500'>
                    <option value='Startup'>Startup</option>
                    <option value='Technology'>Technology</option>
                    <option value='Lifestyle'>Lifestyle</option>
                </select>
                <br/>
                <button type="submit" className ='mt-8 w-40 h-12 bg-black text-white cursor-pointer'>Add</button>
            </form>
        </>
    )
}
export default page;