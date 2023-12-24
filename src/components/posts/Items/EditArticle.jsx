import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useToast } from '@chakra-ui/react';

function EditArticle({ user, onClose }) {
  const toast = useToast();

  const [formData, setFormData] = useState({
    title: user?.title,
    content: user?.content,
    writer_name: user?.writer?.writer_name,
    writer_link: user?.writer?.writer_link
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const updateArticle = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userRef = doc(db, 'Articles', user?.id);

    try {
      await updateDoc(userRef, {
        updated: new Date(),
        content: formData.content,
        title: formData.title,
        writer: {
          writer_name: formData.writer_name,
          writer_link: formData.writer_link,
        },
      });
      setIsLoading(false);
      showToast('Article Updated Successfully.', 'success');
      setTimeout(() => {
        onClose();
      }, 3000); // Close the modal after 3 seconds
    } catch (error) {
      showToast('Error Updating Article.', 'error');
      setIsLoading(false);
    }
  };

  const showToast = (title, status) => {
    toast({
      title,
      status,
      isClosable: true,
      position: 'top',
      duration: 5000,
    });
  };

  return (
    <form
      onSubmit={updateArticle}
      className="md:border md:p-5 lg:p-10 xl:p-16 flex flex-col gap-5 lg:gap-10 h-full md:bg-gray-50 w-full"
    >
      <input
        required
        type='text'
        name="writer_name"
        className="text-lg lg:text-xl outline-none w-full md:w-1/2 px-3 p-2 lg:p-5 bg-white rounded-md border"
        value={formData.writer_name}
        onChange={handleInputChange}
        placeholder="Edit Writer Name"
      />
      <input
        type='text'
        name="writer_link"
        className="text-lg lg:text-xl outline-none w-full md:w-1/2 px-3 p-2 lg:p-5 bg-white rounded-md border"
        value={formData.writer_link}
        onChange={handleInputChange}
        placeholder="Edit Writer Link"
      />
      <input
        required
        type='text'
        name="title"
        className="text-lg lg:text-xl outline-none w-full px-3 p-2 lg:p-5 bg-white rounded-md border"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Edit Article Title"
      />
      <textarea
        name="content"
        value={formData.content}
        onChange={handleInputChange}
        placeholder="Edit Article Content"
        className="lg:text-lg border outline-none px-3 p-2  lg:p-5 w-full h-[50vh] rounded-md"
      ></textarea>
      <button
        type="submit"
        className={`text-sm md:text-base ring-[#3f2d23da] my-8 text-[#3f2d23da] bg-transparent ring-1 rounded-3xl py-2 px-4 ${isLoading && 'opacity-75 cursor-not-allowed'
          }`}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'UPDATE ARTICLE'}
      </button>
    </form>
  );
}

export default EditArticle;
