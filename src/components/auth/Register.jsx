import React, { useState } from "react";
import { LOGIN, HOME } from "../../App";
import { uuidv4 } from "@firebase/util";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useToast } from "@chakra-ui/react";
import { isUsernameExists } from "../../utils/isCheck";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [userEmail, setUserEmail] = useState(""); 
  const [DOB, setDOB] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userMobNumber, setUserMobNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(userEmail, userBio, userName, userPassword);

  const navigate = useNavigate();
  const toast =useToast()

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then(async (result) => {
        await updateProfile(result.user, {
          displayName: userName,
          email: result.user?.email,
        });

        const userNameExists = await isUsernameExists(userName);

        const userDocRef = doc(db, "users", result.user?.uid);

        // Set user data in the 'users' collection
        if (userNameExists) {
          toast({
              title: "Username already exists",
              status: "error",
              isClosable: true,
              position: "top",
              duration: 5000,
          });
          setIsLoading(false);
        }else{
            await setDoc(userDocRef, {
              uid: result.user?.uid,
              id: uuidv4(),
              fullName: fullName,
              username: userName,
              email: userEmail,
              password: userPassword,
              bio: userBio,
              mobNumber: userMobNumber,
              userPhoto: result.user?.photoURL,
              DOB:DOB, 
              LastLogin: "",
              created: new Date(),
            });
    
            alert("Successful signup");
            setIsLoading(false);
            navigate(HOME);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error);
      });
  };

  return (
    <div className="w-full min-h-screen h-full flex items-center justify-center bg-gray-50  lg:p-7">
      <div className="lg:max-w-3xl flex flex-col items-center text-center justify-center gap-10 lg:gap-20 w-full h-full bg-white shadow-xl rounded-md p-10 py-16 md:p-16 xl:p-24 lg:px-32 xl:px-44">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">Join Maznavi._</h2>
        <form className="flex w-full md:w-9/12 text-center flex-col gap-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter User Name"
            value={userName}
            required
            onChange={(e) => setUserName(e.target.value)}
            className="w-full text-sm md:text-base font-thin outline-none ring-black ring-1 rounded-3xl py-2 px-4"
          />
          <input
            type="Email"
            placeholder="Enter Email"
            value={userEmail}
            required
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full text-sm md:text-base font-thin outline-none ring-black ring-1 rounded-3xl py-2 px-4"
          />
          <input
            type="Password"
            placeholder="Enter Password"
            value={userPassword}
            required
            onChange={(e) => setUserPassword(e.target.value)}
            className="w-full text-sm md:text-base font-thin outline-none ring-black ring-1 rounded-3xl py-2 px-4"
          />
          <input
          type="text"
          placeholder="Enter Full Name"
          value={fullName}
          required
          onChange={(e) => setFullName(e.target.value)}
          className="w-full text-sm md:text-base font-thin outline-none ring-black ring-1 rounded-3xl py-2 px-4"
          />
          <input
            type="date"
            placeholder="Enter Date Of Birth"
            value={DOB}
            required
            onChange={(e) => setDOB(e.target.value)}
            className="w-full text-sm md:text-base font-thin outline-none ring-black ring-1 rounded-3xl py-2 px-4"
          />
          <input
            type="number"
            placeholder="Enter Mobile Number"
            value={userMobNumber}
            required
            onChange={(e) => setUserMobNumber(e.target.value)}
            className="w-full text-sm md:text-base font-thin outline-none ring-black ring-1 rounded-3xl py-2 px-4"
          />
          <textarea
            placeholder="Enter Your Bio"
            value={userBio}
            required
            onChange={(e) => setUserBio(e.target.value)}
            className="w-full text-sm md:text-base font-thin outline-none ring-black ring-1 rounded-3xl py-2 px-4"
          /> 
          <button
            type="submit"
            className={`text-sm md:text-base ring-[#3f2d23da] my-8 text-[#3f2d23da] bg-transparent ring-1 rounded-3xl py-2 px-4 ${
              isLoading && "opacity-75 cursor-not-allowed"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "REGISTER ACCOUNT"}
          </button>
        </form>
        <div className="flex items-center justify-center  w-full text-center gap-1 text-sm md:text-base lg:text-lg capitalize">
          <h2>Already have an account?</h2>
          <Link className="font-medium text-green-600" to={LOGIN}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
