import Sidebar from "@/components/adminComp/Sidebar";
import {assets} from '@/Assets/assets'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
export default function Layout({children}){
    return (
        <>
        <div className = 'flex'>
            <ToastContainer theme="dark"/>
             <Sidebar/>
            
            <div className ='flex flex-col w-full'>
                <div className='flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black'>
                    <h3 className="font-medium ">Admin Pannel</h3>
                    <Image src ={assets.profile_icon} alt='yes' width={40} />
                </div>
                {children}
            </div>
        </div>
            
        </>
    )
}