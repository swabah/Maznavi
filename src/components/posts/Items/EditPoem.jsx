import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../../lib/firebase';
import { useToast } from '@chakra-ui/react';

function EditPoem({ user ,onClose}) {
  const toast = useToast();
  const [formData, setFormData] = useState({
    poemTitle: user?.poemTitle,
    poemDesc: user?.poemDesc,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updatePoem = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userRef = doc(db, 'Poems', user?.id);

    try {
      await updateDoc(userRef, formData);
      setIsLoading(false);
      showToast('Poem Updated Successfully.', 'success');
      setTimeout(() => {
        onClose();
      }, 3000); // Close the modal after 5 seconds
    } catch (error) {
      showToast('Error Updating Poem.', 'error');
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
      onSubmit={updatePoem}
      className="md:border md:p-5 lg:p-10 xl:p-16 flex flex-col gap-5 lg:gap-10 h-full md:bg-gray-50 w-full"
    >
      <input
      type='text'
        required
        name="poemTitle"
        className="text-lg lg:text-xl outline-none w-full px-3 p-2 lg:p-5 bg-white rounded-md border"
        value={formData.poemTitle}
        onChange={handleInputChange}
        placeholder="Edit Poem Title"
      />
      <textarea
        name="poemDesc"
        value={formData.poemDesc}
        onChange={handleInputChange}
        placeholder="Edit Poem Content"
        className="lg:text-lg border outline-none px-3 p-2  lg:p-5 w-full h-[50vh] rounded-md"
      ></textarea>
      <button
        type="submit"
        className={`text-sm md:text-base ring-[#3f2d23da] my-8 text-[#3f2d23da] bg-transparent ring-1 rounded-3xl py-2 px-4 ${
          isLoading && 'opacity-75 cursor-not-allowed'
        }`}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'UPDATE POEM'}
      </button>
    </form>
  );
}

export default EditPoem;
