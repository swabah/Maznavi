import React, { useState } from 'react';
import { useAuth } from '../../../hooks/auths';
import { doc, setDoc } from 'firebase/firestore';
import { storage, db } from '../../../lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { uuidv4 } from "@firebase/util";
import { useToast } from '@chakra-ui/react';

function NewBlog() {
  const { user } = useAuth();
  const [selectedBlogImg, setSelectedBlogImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [InstaUrl, setInstaUrl] = useState('');
  const toast = useToast();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedBlogImg) {
      // Display an error message if no image is selected
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
      const id = uuidv4();
      const originalBlogImgname = selectedBlogImg.name.replace(/\s+/g, '');
      const documentId = `${originalBlogImgname}_${id}`;

      const BlogImgRef = ref(storage, `stories/${documentId}`);
      await uploadBytes(BlogImgRef, selectedBlogImg);
      const BlogImgUrl = await getDownloadURL(BlogImgRef);

      const date = new Date();
      const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

      await setDoc(doc(db, "blogs", id), {
        uid: user.id,
        id,
        BlogImgUrl: BlogImgUrl,
        created: { date: formattedDate, time: formattedTime },
        socialLinks: {
            instagram: InstaUrl || ''
        },
        likes: [],
      });

      setSelectedBlogImg(null);
      setInstaUrl('');
      toast({
        title: 'Blog added successfully!',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
    } catch (error) {
      console.error('Error adding Blog:', error);
      toast({
        title: 'Error adding Blog',
        description: 'An error occurred while adding the Blog.',
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
            <label htmlFor="InstaUrl" className="block mb-1">Account Name</label>
            <input
              type="text"
              placeholder='Blog Url'
              id="InstaUrl"
              value={InstaUrl}
              onChange={(e) => setInstaUrl(e.target.value)}
              className="w-full border rounded py-1 px-2"
            />
          </div>
          {!selectedBlogImg && <p className="text-red-500">Image is required.</p>}
          <input
            type="file"
            id="BlogImg"
            onChange={(e) => setSelectedBlogImg(e.target.files[0])}
            className="border mb-4 rounded py-1 px-2"
          />
          <button
            type="submit"
            className="bg-[#3f2d23da] hover:bg-[#3f2d23] text-white rounded-md py-2 px-4"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'ADD BLOG'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewBlog;
