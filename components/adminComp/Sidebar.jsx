import React from "react";
import {assets} from '@/Assets/assets'
import Link from "next/link";  
import Image from "next/image"; 
const Sidebar = () => {
    return (
        <div className="flex flex-col bg-slate-100 ">
            <Link href='/' className="px-2 sm:pl-14 py-3 border border-black cursor-pointer">
                <Image src={assets.logo} width={120} alt='logo' />
            </Link>
            <div className='w-28 sm:w-80 h-[100vh] relative py-12 border border-black'>
                <div className="w-[50%] sm:w-[80%] absolute right-0">
                    <Link href='/admin/addProduct' className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] cursor-pointer'>
                        <Image src={assets.add_icon} alt='add icon' width={28} />
                        <p>Add Blogs</p>
                    </Link>
                    <Link href='/admin/blogList' className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] cursor-pointer'>
                        <Image src={assets.blog_icon} alt='add icon' width={28} />
                        <p>Blog List</p>
                    </Link>
                    <Link href='/admin/subscriptions' className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] cursor-pointer'>
                        <Image src={assets.email_icon} alt='add icon' width={28} />
                        <p>Subscriptions</p>
                    </Link>
                    
                </div>

            </div>
        </div>
    );
}
export default Sidebar;