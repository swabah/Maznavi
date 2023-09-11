import { useToast } from '@chakra-ui/react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import { db, storage } from '../../../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

function UploadProPicture({ user }) {
  const [Picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handlePictureUpload = async (e) => {
    e.preventDefault();
    if (!Picture) {
      toast({
        title: 'Image is required.',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
      return;
    }
    setLoading(true);

    try {
      const uid = user.uid;
      const pictureName = Picture.name.replace(/\s+/g, '');
      const documentId = `${pictureName}_${uid}`;

      const pictureRef = ref(storage, `users/${documentId}`);
      await uploadBytes(pictureRef, Picture);
      const pictureUrl = await getDownloadURL(pictureRef);

      const userRef = doc(db, 'users', uid);

      await updateDoc(userRef, {
        userPhoto: pictureUrl
      }, { merge: true });

      setLoading(false);
      toast({
        title: 'Profile Picture Updated.',
        status: 'success', // Changed to 'success' status
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
    } catch (error) {
      console.error('Error uploading picture:', error);
      toast({
        title: 'Error Uploading Picture.',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center text-center justify-center gap-10 lg:gap-20 w-full h-full p-5 py-10">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">{user?.userPhoto ? 'Update Picture' : 'Upload Picture'}</h2>
      <form className="flex w-full md:w-9/12 text-center flex-col gap-4" onSubmit={handlePictureUpload}>
        <input
          name="Picture"
          type='file'
          required
          placeholder="Select an image"
          onChange={(e) => setPicture(e.target.files[0])}
          className="w-full text-sm md:text-base font-thin outline-none ring-black ring-1 rounded-3xl py-2 px-4"
        />
        <button
          type="submit"
          className={`text-sm md:text-base ring-[#3f2d23da] my-8 text-[#3f2d23da] bg-transparent ring-1 rounded-3xl py-2 px-4 ${
            loading && 'opacity-75 cursor-not-allowed'
          }`}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'UPDATE PICTURE'}
        </button>
      </form>
    </div>
  )
}

export default UploadProPicture;
