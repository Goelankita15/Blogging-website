import { NextResponse } from 'next/server';
import EmailModel from "@/lib/models/emailModel";
import {ConnectDB} from "@/lib/config/db";
import axios from 'axios';
const LoadDB = async () => {
    await ConnectDB();
}
LoadDB();
export async function POST(request){
    const formData = await request.formData();
    const emailData = {
        email: `${formData.get('email')}`,
        date: new Date()
    }
    await EmailModel.create(emailData);
    return NextResponse.json({
        success: true,
        message: "Email Subscribed"
    });
}
export async function GET(request) {
    const emails = await EmailModel.find({});
    return NextResponse.json({
        success: true,
        emails: emails
    });
}
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({
        success: true,
        message: "Email Unsubscribed"
    });
}