import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

function EditProfile({ user }) {
  const [formData, setFormData] = useState({
    username: user.username ,
    fullName: user.fullName ,
    bio: user.bio ,
    InstagramLink: user.InstagramLink || '',
    created: user.created,
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

    const userRef = doc(db, 'users', user?.uid);

    try {
      // Send the entire formData object to update the user's profile
      await updateDoc(userRef, formData);
      setIsLoading(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center justify-center gap-10 lg:gap-20 w-full h-full p-10">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">Edit Profile.</h2>
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

export default EditProfile;
