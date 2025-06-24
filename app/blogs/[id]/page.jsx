'use client';

import { blog_data } from '@/Assets/assets';
import {assets} from '@/Assets/assets'
import Footer from '@/components/Footer';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import React, { useState, useEffect} from 'react';
// import { useParams } from 'next/navigation'

export default function Page({ params }) {
  const [data , setData] = useState(null);
  const fetchBlogData = async () => {
    const response = await axios.get('/api/blog',{
      params: {
        id: params.id
      }
    });
    if(response.data.success){
      setData(response.data);
      console.log("blog", response.data.blog);
    }
  }

  useEffect(() => {
    fetchBlogData();
  }, []);
  return (
    data ? <>
        <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center'>
              <Link href='/'>
              <Image src={assets.logo} width = {180} alt='logo' className='w-[130px] sm:w-auto'/>  
            </Link>
              <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>Get Started
                  <Image src={assets.arrow} alt="arrow" />
                </button> 
            </div>
            <div className='text-center my-24'>
              <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
              <Image src={data.author_img? data.author_img:assets.profile_icon} alt="author" width = {60} height= {60} className='mx-auto mt-6 border border-white rounded-full'  />
              <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author} </p>

            </div>
            <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
              <Image src={data.image?data.image:assets.blog_pic_1} alt='imade' width={1280} height={720} className='border-4 border-white'/>

              <p>{data.description}</p>
            
              <div className='my-24'>
              <p className='text-black font-semibold my-4'>Share this article on social media</p>
              <div className='flex'>
                <Image src={assets.facebook_icon} alt="facebook" width={50}  className='cursor-pointer' />
                <Image src={assets.twitter_icon} alt="twitter" width={50} className='cursor-pointer' />
                <Image src={assets.googleplus_icon} alt="google" width={50}  className='cursor-pointer' />
              </div>
            </div>
            </div>  
        </div>
        <Footer/>
      </>: 
      <>
      </>
    
  );
}