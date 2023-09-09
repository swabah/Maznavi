import React, { useState } from 'react';
import { useAuth } from '../../../hooks/auths';
import { v4 as uuidv4 } from 'uuid'; // Update the import
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useToast } from '@chakra-ui/react';



function NewPoemDemo() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // Make sure this import is correct
  const toast = useToast();

  // Example date and time



  const handleAddPoemDemo = async (e) => {
    e.preventDefault();
  setLoading(true);

    try {
        const date = new Date();  

      const PoemDocData = {
        uid: user?.id,
        id: uuidv4(), // Use the uuidv4 function from 'uuid'
        PhotoUrl: user?.userPhoto,
        created: date,
        poemTitle: title,
        poemDesc: desc,
        author: user?.username,
        likes: [],
      };

      // Create a reference to the user's document
      const userDocRef = doc(db, "users", user?.uid);

      // Reference the "poems" subcollection within the user's document
      const poemsCollectionRef = collection(userDocRef, 'poems');

      // Add the poem data to the "poems" subcollection
      await addDoc(poemsCollectionRef, PoemDocData);

      toast({
        title: 'Poem added successfully!',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });

      setLoading(false);
    } catch (error) {
      console.error('Firestore Error:', error);
      toast({
        title: 'Error adding Poem',
        description: error.message,
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center text-center justify-center gap-10 lg:gap-20 w-full h-full p-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">Add Poem.</h2>
        <form className="flex w-full md:w-9/12 text-center flex-col gap-4" onSubmit={handleAddPoemDemo}>
          <input
            type="text"
            placeholder="Type Poem Title"
            required
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-sm md:text-base font-thin outline-none ring-black ring-1 rounded-3xl py-2 px-4"
          />
          <textarea
            placeholder="Type Poem"
            required
            name="desc"
            cols={40}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full text-sm md:text-base font-thin outline-none ring-black ring-1 rounded-3xl py-2 px-4"
          />
          <button
            type="submit"
            className="text-sm md:text-base ring-[#3f2d23da] my-8 text-[#3f2d23da] bg-transparent ring-1 rounded-3xl py-2 px-4"
          >
            {loading ? 'Loading...' : 'NEW POEM DEMO'}
          </button>
        </form>
      </div>
    </>
  );
}

export default NewPoemDemo;
