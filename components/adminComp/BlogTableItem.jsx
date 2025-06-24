'use client';
import React from 'react'
import {assets} from '@/Assets/assets'
import Image from 'next/image';
const BlogTableItem = ({ author_img, author, title, date, deleteBlog, mongoid }) => {
    const blogDate = new Date(date);

    return (
        <tr className='bg-white border-b '>
            <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                <Image alt='pf' width={40} height={40} src={author_img? author_img: assets.profile_icon}/>  
                <p>{author?author:"Not available author"}</p>
            </th>
            <td className='px-6 py-4'>
                {title?title:"Not available title"}
            </td>
            <td className='px-6 py-4'>
                {blogDate.toDateString()}
            </td>
            <td onClick= {()=>deleteBlog(mongoid)} className='px-6 py-4 cursor-pointer'>
                x
            </td>
        </tr>
    )
}   
export default BlogTableItem;