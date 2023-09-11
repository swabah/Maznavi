import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useToast } from '@chakra-ui/react';
import { isUsernameExists } from '../../../utils/isCheck';

function UpdateProfile({ user }) {
  const toast = useToast()
  const [formData, setFormData] = useState({
    username: user.username ,
    fullName: user.fullName ,
    bio: user.bio ,
    DOB: user.DOB || '',
    InstagramLink: user.InstagramLink || '',
    date: user.created,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateUserProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userNameExists = await isUsernameExists(formData.username);

    const userRef = doc(db, 'users', user?.uid);

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
        try {
          await updateDoc(userRef, formData);
          setIsLoading(false);
          toast({
            title: 'Profile Updated Succesfully.',
            status: 'success',
            isClosable: true,
            position: 'top',
            duration: 5000,
          });
        } catch (error) {
          toast({
            title: 'Error Uplading Profile.',
            status: 'error',
            isClosable: true,
            position: 'top',
            duration: 5000,
          });
          setIsLoading(false);
        }
    }
  };

  return (
    <div className="flex flex-col items-center text-center justify-center gap-10 lg:gap-20 w-full h-full p-10">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">Update Profile.</h2>
      <form className="flex w-full md:w-9/12 text-center flex-col gap-4" onSubmit={updateUserProfile}>
        <input
          type="text"
          name="username"
          placeholder="Enter User Name"
          value={formData.username}
          required
          onChange={handleChange}
          className="w-full text-sm md:text-base font-thin outline-none ring-black ring-1 rounded-3xl py-2 px-4"
        />
        <input
          type="text"
          name="fullName"
          placeholder="Enter Full Name"
          value={formData.fullName}
          required
          onChange={handleChange}
          className="w-full text-sm md:text-base font-thin outline-none ring-black ring-1 rounded-3xl py-2 px-4"
        />
        <input
          type='date'
          name="DOB"
          placeholder="Date Of Birth"
          value={formData.DOB}
          onChange={handleChange}
          className="w-full text-sm md:text-base font-thin outline-none ring-black ring-1 rounded-3xl py-2 px-4"
        />
        <textarea
          name="bio"
          placeholder="Enter Your Bio"
          value={formData.bio}
          required
          rows={5}
          onChange={handleChange}
          className="w-full text-sm md:text-base font-thin outline-none ring-black ring-1 rounded-3xl py-2 px-4"
        />
        <input
          type='url'
          name="InstagramLink"
          placeholder="Enter Instagram Link"
          value={formData.InstagramLink}
          onChange={handleChange}
          className="w-full text-sm md:text-base font-thin outline-none ring-black ring-1 rounded-3xl py-2 px-4"
        />
        <button
          type="submit"
          className={`text-sm md:text-base ring-[#3f2d23da] my-8 text-[#3f2d23da] bg-transparent ring-1 rounded-3xl py-2 px-4 ${
            isLoading && 'opacity-75 cursor-not-allowed'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'UPDATE PROFILE'}
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
