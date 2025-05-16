import CommonForm from "@/components/common/Form";
import { loginFormControls } from "@/config/index";
import { useToast } from "@/hooks/useToast";
import { loginUser } from "@/store/auth-slice.js";

import { useSocket } from "@/store/SocketProvider";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { socket, isConnected } = useSocket(); // Get socket and connection status
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await dispatch(loginUser(formData));
    const data = response?.payload;

    localStorage.setItem("userEmail", formData.email);

    if (data?.success) {
      const userId = data.user.id;
      localStorage.setItem("userId", userId);

      toast({ title: data?.message });

      if (socket && isConnected) {
        socket.emit("userLogin", userId);
      } else {
        console.error("Socket is not connected!");
      }

      // Always redirect to /therapy after login
      navigate("/therapy", { replace: true });
    } else {
      toast({
        title: data?.message || "Incorrect email or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div style={{ backgroundImage: 'url("https://res.cloudinary.com/dtlejpoxq/image/upload/v1729655397/Mern-Ecommerce/shadow_therapy_ysp7ex.png")' }} className="bg-shadowTherapy bg-cover bg-center min-h-screen flex justify-center items-center px-4 sm:px-8">
      <div className="shadow-lg backdrop-blur bg-black/30 rounded-2xl w-full max-w-lg lg:max-w-2xl flex flex-col justify-center items-center py-8 px-6 sm:py-10 sm:px-12">
        <div className="text-center text-white flex flex-col items-center w-full">
          <div className="self-start mb-4">
            <Link to="/" className="flex items-center gap-1 text-xs sm:text-sm">
              <ArrowLeft className="text-xs" />
              <span className="border-b">Home</span>
            </Link>
          </div>
          <h1 className="list-item-text-3 text-lg md:text-3xl font-bold tracking-tight text-foreground text-white mx-5 mt-5">
            Welcome Back!
          </h1>
          <div className="text-left px-7">
            <CommonForm
              formControls={loginFormControls}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText="Login"
              borderRadius="rounded-full"
            />
          </div>
          <div>
            <p className="mt-2">
              Don't have an account?
              <Link
                className="font-medium text-primary text-white ml-2 underline"
                to="/auth/register"
              >
                Sign Up
              </Link>
            </p>
            <p className="mx-2 text-sm">
              <span className="list-item-text-3">Forgot your password?</span>{" "}
              <Link
                className="text-blue-600 ml-2"
                to="/auth/forgot-password"
                onClick={() => console.log("Forgot Password clicked")}
              >
                Reset it
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;