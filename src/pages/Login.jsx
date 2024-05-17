import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../components/ui/button";
import client from "@/api/client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Corrected import
import { setUserData } from "@/utils/authStorage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Using the useNavigate hook

  const login = async (email, password) => {
    try {
      console.log(email, password);
      const response = await client.post("/admin/login", { email, password });
      console.log(response);
      if (response.data.isSuccessful) {
        const accessToken = response.data.data.accessToken;
        const userData = response.data.data.fromDb;
        console.log(accessToken);
        navigate("/"); // Using the navigate function
        setUserData({ token: accessToken, userData: userData });
        toast.success("User Logged In!");
      } else {
        toast.error("User Logged failed!");
      }
    } catch (error) {
      toast.error("User Logged failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img
            src="https://res.cloudinary.com/helpbuddy01/image/upload/v1713707997/ahxdyb2dhtyzjll5jt3a.png"
            alt="Logo"
            className="h-12"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Admin Dashboard Login
          </h1>
        </div>
        <div className="grid w-full items-center gap-4">
          <div>
            <Label htmlFor="email" className="text-gray-600 font-semibold">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-600 font-semibold">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6">
          <Button
            variant="destructive"
            onClick={() => login(email, password)}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}
