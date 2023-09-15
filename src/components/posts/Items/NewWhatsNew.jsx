import React, { useState } from 'react';
import { useAuth } from '../../../hooks/auths';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase'; 
import { uuidv4 } from "@firebase/util";
import { useToast } from '@chakra-ui/react';

function NewWhatsNew() {
  const { user } = useAuth();
  const [Content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [Heading, setHeading] = useState('');
  const toast = useToast();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const id = uuidv4(); 

      await setDoc(doc(db, "whatsnew", id), {
        uid: user.uid,
        id, 
        created:new Date(),
        account: accountName,
        Heading: Heading,
        Content: Content,
        likes: [],
      });

      toast({
        title: "What's New added successfully!",
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
    } catch (error) { 
      toast({
        title: "Error adding What's New",
        description: "An error occurred while adding the What's New.",
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
    <div className="flex flex-col items-center text-center justify-center gap-10 lg:gap-20 w-full h-full p-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">Add What's New.</h2>
        <form className="flex w-full md:w-9/12 text-center flex-col gap-4" onSubmit={handleFormSubmit}> 
            <input
              type="text"
              id="Heading"
              placeholder='Type Heading '
              required
              value={Heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full text-sm md:text-base font-thin outline-none ring-black ring-1 rounded-3xl py-2 px-4"
            /> 
             <input
              type="text"
              id="Content"
              placeholder='Type Content'
              checked={Content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-sm md:text-base font-thin outline-none ring-black ring-1 rounded-3xl py-2 px-4"
            />  
             <input
              type="text"
              id="Content"
              placeholder='Type Accound Name'
              checked={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full text-sm md:text-base font-thin outline-none ring-black ring-1 rounded-3xl py-2 px-4"
            />  
          <button
            type="submit"
            className="text-sm md:text-base ring-[#3f2d23da] my-8 text-[#3f2d23da] bg-transparent ring-1 rounded-3xl py-2 px-4"
            disabled={loading}
          >
            {loading ? 'Loading...' : "ADD WHAT'S NEW"}
          </button>
        </form> 
    </div>
  );
}

export default NewWhatsNew;
