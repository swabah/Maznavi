import React, { useState } from 'react';
import { useAuth } from '../../../hooks/auths';
import { doc, setDoc } from 'firebase/firestore';
import { storage, db } from '../../../lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { uuidv4 } from "@firebase/util";
import { useToast } from '@chakra-ui/react';

function NewStory() {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [isVideo, setIsVideo] = useState(false);
  const toast = useToast();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      return;
    }

    setLoading(true);

    try {
      const id = uuidv4();
      const originalFilename = selectedFile.name.replace(/\s+/g, '');
      const documentId = `${originalFilename}_${id}`;

      const fileRef = ref(storage, `stories/${documentId}`);
      await uploadBytes(fileRef, selectedFile);
      const fileUrl = await getDownloadURL(fileRef);

      const date = new Date();
      const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

      await setDoc(doc(db, "stories", id), {
        uid: user.id,
        id,
        FileUrl: fileUrl, 
        created:new Date(),
        account: accountName,
        isVideo,
        likes: [],
      });

      setSelectedFile(null);
      setAccountName('');
      setIsVideo(false);
      toast({
        title: 'Story added successfully!',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
    } catch (error) {
      console.error('Error adding story:', error);
      toast({
        title: 'Error adding story',
        description: 'An error occurred while adding the story.',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center text-[#3f2d23] justify-center h-1/2">
      <div className="w-full max-w-md p-4">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="accountName" className="block mb-1">Account Name</label>
            <input
              type="text"
              placeholder='Story Account'
              id="accountName"
              value={accountName}
              required
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full border rounded py-1 px-2"
            />
          </div>
          {!selectedFile && <p className="text-red-500">File is required.</p>}
            <input
              type="file"
              id="File"
              required
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="border rounded py-1 px-2"
            />
          <div className="my-4">
            <label htmlFor="isVideo" className="flex gap-1">
              isVideo
              <input
                type="checkbox"
                id="isVideo"
                checked={isVideo}
                onChange={(e) => setIsVideo(e.target.checked)}
              />
            </label>
          </div>
          <button
            type="submit"
            className="bg-[#3f2d23da] hover:bg-[#3f2d23] text-white rounded-md py-2 px-4"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'ADD STORY'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewStory;
