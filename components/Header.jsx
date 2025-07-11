'use client';
import React from 'react';
import {assets} from '@/Assets/assets'
import {useState} from 'react'; 
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify'
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const Header = () => {
    const [email, setEmail] = useState("");  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        const response = await axios.post('/api/email', formData);
        if(response.data.success){
            toast(response.data.message);       
            setEmail(""); 
        }
        else{
            toast("Error in subscribing email");
        }
    }

    return (
        <div className='py-5 px-5 md:px-12 lg:px-28'>  
            <div className='flex justify-between items-center'>
                <Image src ={assets.logo} width={180} alt="logo" className= 'w-[130px] sm:w-auto' />
                <Link href = "/admin" className = 'flex items-center gap-2 font medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]'>Get started<Image src={assets.arrow} alt='arrow'/></Link>
            </div> 
            <div className='text-center my-8'>
                <h1 className='text-3xl sm:5xl font-medium'>Latest Blogs</h1>
                <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard </p>
                <form onSubmit={handleSubmit} className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]' action ="">
                    <input className='pl-4 outline-none' type='email' placeholder='Enter your email address' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button type='submit'className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white'>Subscribe</button>
                </form>
            </div>
         </div>
    )
}
export default Header;