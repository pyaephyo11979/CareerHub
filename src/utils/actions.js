import {  redirect,json } from "react-router-dom";

import { useApp } from "../App";



//BaseURLOnline: https://careercraftapi.onrender.com/api

export async function registerAction({ request }) {
    const BASE_URL = " https://careercraftapi.onrender.com/api";
    const data = await request.formData();

    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    const confirmation = data.get("confirmation");
    const phone = data.get("phone");
    const gender = data.get("gender");
    const role = data.get("role");

    if (!username || !email || !password || !confirmation || !role) {
        throw json({ message: "Inputs must be filled." }, { status: 500 });
    }

    if (password !== confirmation) {
        throw json({ message: "Password do not match" }, { status: 500 });
    }

    const userData = {
        name: username,
        email: email,
        password: password,
        role: role,
        phone: phone,
        gender: gender,
    };

    const response = await fetch(`${BASE_URL}/user/register`, {
        method: request.method,
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok)
        throw json(
            { message: response.message },
            { status: 500 }
        );

    return redirect("/login");
}

export async function loginAction({ request }) {
    const data = await request.formData();
    const email = data.get("email");
    const password = data.get('password');

    if (!email || !password) {
        throw json({"message": "Please type email and password."}, {status: 500})
    }

    const userData = {
        email,
        password,
    };
    //Online URL: https://wspapi.onrender.com/api/user/login
    const response = await fetch("https://careercraftapi.onrender.com/api/user/login", {
        method: request.method,
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw json({"message": "Incorrect Password try again."}, {status: 500})
    }

    const responseData = await response.json();
    const token = responseData.token;
    const user = responseData.user;

    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));

    return redirect("/jobs");
}

export async function createJobAction({ request }) {
    const data = await request.formData();
    const user = JSON.parse(localStorage.getItem("user"));
    
    //OnlineURL: https://careercraftapi.onrender.com/api/post/create
    let url =  "https://careercraftapi.onrender.com/api/post/create";

    const title = data.get("title");
    const companyName = data.get("company_name");
    const requirements = data.getAll("requirements");
    const position = data.get("position");
    // const address = data.get("address");
    const description = data.get("description");
    const id = data.get("id")
    console.log(request.method)

    if (!title || !companyName || !requirements || !position || !description) {
        throw json ({"message": "Please fill inputs."}, {status: 500})
    }

    const jobData = {
        title,
        companyName,
        requirements,
        position,
        // address,
        description,
        uid: user._id,
    };
    
    //OnlineURL: https://careercraftapi.onrender.com/api/post/update/${id}
    if (request.method === "PATCH"){
        url = `https://careercraftapi.onrender.com/api/post/update/${id}`
    }

    const response = await fetch(
        url,
        {
            method: request.method,
            headers: {
                "Content-Type": "Application/json",
                "authorization": `Bearer ${JSON.parse(
                    localStorage.getItem("token")
                )}`,
            },
            body: JSON.stringify(jobData),
        }
    );

    if (!response.ok) {
        const error = await response.json();
        return error;
    }

    return redirect("/jobs");
}

export async function editProfileAction({ request, params }) {
    const id = params.id;
    const user = JSON.parse(localStorage.getItem('user'));

    const data = await request.formData();
    const username = data.get("username");
    const image = data.get("image") || null;
    const phone = data.get("phone");
    const companyName = data.get("companyName") || null;
    const addr1 = data.get("addr1") || "";
    const addr2 = data.get("addr2") || null;
    const city = data.get("city") || "";
    const state = data.get("state") || "";
    const zip = data.get("zip") || "";
    const companyAddress = `${addr1}, ${addr2 && ` ${addr2},`} ${city}, ${state}, ${zip}`;
    const cv = data.get("cv") || null;

    // Handle skills properly
    const skills = data.getAll("skills");
    console.log(skills)
    
    // This should work, but let's be safe

    console.log(skills)
    if (!username || !image || !phone) {
        throw json({ "message": "Please fill the inputs." }, { status: 500 });
    }

    const updatedProfile = {
        id,
        name: username,
        image,
        phone,
        companyName,
        companyAddress,
        skills,
        cv
    };

    const formData = new FormData();
    formData.append("username", username);
    formData.append("phone", phone);
    formData.append("companyName", companyName);
    formData.append("companyAddress", companyAddress);

    // Append each skill separately
    if (skills.length > 0) {
        skills.forEach(skill => {
            formData.append("skills", skill);
        });
    } else {
        formData.append("skills", ""); // Ensure it's at least an empty array
    }

    if (cv) {
        formData.append("cv", cv);
    }
    if(image){
        formData.append("image",image)
    }

    //https://careercraftapi.onrender.com
    const response = await fetch(`https://careercraftapi.onrender.com/api/user/update/${id}`, {
        method: "PATCH",
        headers: { 
            "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: formData
    });

    if (!response.ok) {
        const responseData = await response.json();
        console.log(responseData);
    }

    const userData = {
        ...user,
        ...updatedProfile,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    return redirect(`/profile/${id}`);
}


export async function changePasswordAction({request, params}) {
    const id = params.id;
    const data = await request.formData();

    const oldPassword = data.get("oldPassword");
    const newPassword = data.get("newPassword");

    if (!oldPassword && !newPassword) {
        throw json({"message": "Please fill the passwords"}, {status: 500});
    }

    const updatedPasssword = {
        id,
        oldPassword,
        newPassword,
    }

    //Online URL: https://wspapi.onrender.com/api/user/updatePassword/${id}
    const changePasswordResponse = await fetch(`https://careercraftapi.onrender.com/api/user/updatePassword/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "multipart/formData",
            "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        },
        body: JSON.stringify(updatedPasssword)
    });

    if (!changePasswordResponse.ok) {
        throw json({"message": "Incorrect password.Please try again"}, {status: 500})
    }

    return redirect(`/profile/${id}`);
}