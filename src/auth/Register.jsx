import CommonForm from "@/components/common/Form";
import { registerFormControls } from "@/config/index";
import { useToast } from "@/hooks/useToast";
import { registerUser } from "@/store/auth-slice.js";

import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const Register = () => {
  //the local state i'm not using redux for it
  const [formData, setFormData] = useState(initialState);
  //The useDispatch hook from react-redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //The useToast hook is a custom hook that I created to display toast notifications. from shacdn
  const { toast } = useToast();

  function onSumbit(e) {
    e.preventDefault();
  
    // Dispatch the registerUser action
    dispatch(registerUser(formData)).then((data) => {
      const payload = data?.payload;
  
      if (payload?.success) {
        // Registration successful
        toast({
          title: payload?.message,
        });
        navigate("/auth/login");
      } else {
        // Handle duplicate key or other errors
        const errorMessage = payload?.message?.toLowerCase();
  
        if (
          errorMessage?.includes("user already exists") ||
          errorMessage?.includes("duplicate key") ||
          errorMessage?.includes("email already exists") ||
          errorMessage?.includes("username already exists")
        ) {
          // Redirect to login if user already exists or duplicate key error
          toast({
            title: "User already exists. Redirecting to login...",
            variant: "destructive",
          });
          navigate("/auth/login");
        } else {
          // Handle other errors
          toast({
            title: payload?.message || "Registration failed.",
            variant: "destructive",
          });
        }
      }
    });
  }

  // Handle navigate back
 const handleNavigateBack = () => {
  window.history.back();
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
};
  return (
    <div style={{ backgroundImage: 'url("https://res.cloudinary.com/dtlejpoxq/image/upload/v1729655397/Mern-Ecommerce/shadow_therapy_ysp7ex.png")' }} className="bg-shadowTherapy bg-cover bg-center h-screen flex justify-center items-center ">
      <div className="shadow-lg backdrop-blur-lg bg-white/15 rounded-2xl  lg:h-[70%] flex justify-center items-center ">
        <div className="mx-auto w-full max-w-md space-y-6 flex justify-center px-7 py-10 lg:py-[10rem] items-center">
          <div className="text-center text-white  rounded-xl py-7  flex flex-col ">
            <div  onClick={ handleNavigateBack}>
              <Link
               
                className="flex justify-start items-center ml-5 gap-1 text-xs"
              >
                <ArrowLeft className="text-xs " />
                <h2 className="border-b">Back</h2>
              </Link>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground text-white mx-10 mt-5">
              Create new account!
            </h1>
            {/* This is my form component */}
            <div className="text-left px-7">
              <CommonForm
                formControls={registerFormControls}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSumbit}
                buttonText="Sign Up"
                borderRadius="rounded-full"
              />
            </div>

            <div>
              <p className="mt-2">
                Already have an account?
                <Link
                  className="font-medium text-primary text-white underline ml-2"
                  to="/auth/login"
                >
                  Login
                </Link>
              </p>
              {/* <p className="mx-2 text-sm">
                <span>Note:</span> Lorem ipsum dolor sit amet consectetur.
                Fermentum nisl netus pulvinar aliquam hendrerit nunc. Tristique
                pretium ipsum faucibus potenti massa.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
