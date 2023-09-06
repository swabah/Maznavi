import { useState } from "react";
import { REGISTER, HOME } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useToast } from "@chakra-ui/react";

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, userEmail, userPassword);
      navigate(HOME);
      toast({
        title: "You are logged in",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen h-full flex items-center justify-center bg-gray-50 lg:p-7">
      <div className="lg:max-w-3xl flex flex-col items-center text-center justify-center gap-10 lg:gap-20 w-full h-full bg-white lg:shadow-xl lg:rounded-md p-10 py-16 md:p-16 xl:p-24 lg:px-32 xl:px-44">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">Welcome back.</h2>
        <form className="flex w-full md:w-9/12 text-center flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={userEmail}
            required
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full text-sm md:text-base font-thin outline-none ring-black ring-1 rounded-3xl py-2 px-4"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={userPassword}
            required
            onChange={(e) => setUserPassword(e.target.value)}
            className="w-full text-sm md:text-base font-thin outline-none ring-black ring-1 rounded-3xl py-2 px-4"
          />
          <button
            type="submit"
            className="text-sm md:text-base ring-[#3f2d23da] my-8 text-[#3f2d23da] bg-transparent ring-1 rounded-3xl py-2 px-4"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'LOGIN'}
          </button>
        </form>
        <div className="flex flex-col items-center justify-center w-full text-center gap-1 text-sm md:text-base lg:text-lg capitalize">
          <div>
            <Link className="font-medium text-green-600" to={HOME}>
              Explore Maznavi._
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <h2>No Account?</h2>
            <Link className="font-medium text-green-600" to={REGISTER}>
              Create One
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
