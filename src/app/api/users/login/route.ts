import { connect } from "@/Database/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password, isVerified} = reqBody;
        console.log(reqBody);
        
        const user = await User.findOne({email});
        console.log(user);

        if (!user) {
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        //check if user if verified
       

        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword ) {
            return NextResponse.json({error: "Email or Password might be incorrect. Please try again."}, {status: 400})
        }

        console.log('login was successful');
        //create token data
        const tokenData = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            address: user.address,
            phone: user.phone,

        }

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "login successful",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch (error: any) { 
        return NextResponse.json({error: error.message}, {status: 500})
    }
}