'use client';
import SubsTableItem from '@/components/adminComp/SubsTableItem';
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () =>{
    const [email, setEmail] = useState([]);
    const fetchEmails = async () => {
        const response = await axios.get('/api/email');
        setEmail(response.data.emails);
    }
    const deleteEmail = async (mongoid) => {
        const response = await axios.delete('/api/email',{
            params: {
                id: mongoid
            }
        });
        if(response.data.success){
            toast(response.data.message);
            fetchEmails();
        }else{
            toast("error");
        }
    }
    useEffect(() => {
        fetchEmails();
    }, []);
    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <h1>All Subscriptions</h1>
            <div className='relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide' > 
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>
                                Email Subscription
                            </th>

                            <th scope='col' className='hidden sm:block px-6 py-3'>
                                Date
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {email.map((item, index) => {
                            return <SubsTableItem key={index} mongoid = {item._id} email={item.email} date={item.date}  deleteEmail={deleteEmail}/>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default page;