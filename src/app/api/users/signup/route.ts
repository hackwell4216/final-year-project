import { connect } from "@/Database/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect() // connect to database

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { firstname, lastname, phone, address, idCard, email, password } = reqBody;
        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({ email })

        if (user) {
            console.log('User already exists');
            return NextResponse.json({ error: "User already exits" }, { status: 400 });
        } else {
            //has password
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password, salt);


            //create a new user
            const newUser = new User({
                firstname,
                lastname,
                phone,
                address,
                idCard,
                email,
                password: hashedPassword
            })


            const savedUser = await newUser.save();
            console.log("User created successfully");


            //send verification email to user
            await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

            return NextResponse.json({
                message: "User created successfully",
                success: true,
                savedUser
            })
        }

    } catch (error: any) {
       
        return NextResponse.json({ error: error.message },
            { status: 500 });
    }
}