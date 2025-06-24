import { NextResponse } from 'next/server';
import {ConnectDB} from "@/lib/config/db";
import {writeFile} from 'fs/promises';
import BlogModel from "@/lib/models/blogModel";
const fs = require('fs');
const LoadDB = async () =>{
    await ConnectDB();
}
LoadDB();
//api endpt for get all blogs
export async function GET(request){
    const blogId = request.nextUrl.searchParams.get('id');
    if(blogId){
        const blog = await BlogModel.findById(blogId);
        if(!blog){
            return NextResponse.json({
                success: false,
                message: "Blog not found"
            }, {status: 404});
        }else{
            return NextResponse.json({
                success: true,
                blog: blog
            });
        }
    }else{
        const blogs = await BlogModel.find({});
        return NextResponse.json({
            success: true,
            blogs: blogs
        });
    }


}
// This function handles the POST request to save blog data - api endpoint
export async function POST(request){
    //store the data in the database
    const formData = await request.formData();
    const timeStamp = Date.now();
    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const imageBuffer = Buffer.from(imageByteData);
    const path = `./public/${timeStamp}_${image.name}`;
    await writeFile(path, imageBuffer);
    const imageUrl = `/${timeStamp}_${image.name}`;
    console.log("imageUrl", imageUrl);

    const blogData = {
        title: `${formData.get('title')}`,
        description : `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        image:  `${imageUrl} `,
        author_img: `${formData.get('author_img')}`
    }

    await BlogModel.create(blogData);
    // console.log("Blog data saved successfully", blogData);
    return NextResponse.json({
        success: true,
        message: "Blog data saved successfully"
    });     
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    const blog = await BlogModel.findById(id);

    if (!blog) {
        return NextResponse.json({
            success: false,
            message: "Blog not found"
        }, { status: 404 });
    }

    try {
        await fs.unlink(`./public/${blog.image}`);
    } catch (err) {
        console.error("File deletion failed:", err);
        // Continue even if image deletion fails
    }

    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({
        success: true,
        message: "Blog deleted"
    });
}