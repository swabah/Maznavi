import React, { useEffect, useState } from 'react';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';
import { FiPlus } from 'react-icons/fi';
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useAuth } from '../../../hooks/auths';
import { useParams } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import formatTimeDifference from '../../../assets/formatTimeDifference';
import NewPoemDemo from './NewPoemDemo';
import { usePoemsDemo } from './usePoemsDemo';

function CurrentProfile() {
  const { profileName } = useParams();
  const { user, isLoading } = useAuth();
  const { poems, isPoemLoading } = usePoemsDemo();
  const [profiles, setProfiles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchUserPoems = async () => {
      try {
        const userPoemsCollectionRef = collection(db, `users/${user?.uid}/poems`);
        const q = query(userPoemsCollectionRef, where("author", "==", profileName));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const userPoemsArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setProfiles(userPoemsArray);
        });

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching user poems:", error);
      }
    };

    if (user) {
      fetchUserPoems();
    }
  }, [profileName, user]);

  console.log(poems);

  const renderPoems = (poemsArray) => {
    return (
      <ul>
        {poemsArray?.map((poem) => (
          <li className='flex border-2 rounded flex-col gap-2 p-5' key={poem.id}>
            <h3>{poem?.poemTitle}</h3>
            <p>{poem?.poemDesc}</p>
            <h1>{poem?.author}</h1>
            {/* <h1>{formatTimeDifference(poem?.created)}</h1> */}
            {/* Render other poem details here */}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Navbar />
      <div className='w-full grid grid-cols-5 gap-8 text-[#120f08] bg-[#fff] min-h-full h-full p-7 lg:px-10 py-8 md:py-16 xl:px-32'>
        <div className='col-span-2 gird grid-rows-3 gap-5 w-full h-full'>
          <div className='w-full h-full p-5 rounded-3xl border shadow-md'></div>
          <div className='w-full h-full p-5 rounded-3xl border shadow-md'></div>
          <div className='w-full h-full p-5 rounded-3xl border shadow-md'></div>
        </div>
        <div className='col-span-3 gird grid-rows-2 gap-5  w-full h-full'>
          <div className='w-full h-full p-5 rounded-3xl border shadow-md'>
          </div>
          <div className='w-full h-full p-5 rounded-3xl border shadow-md'>
              <h2 className='font-semibold text-2xl'>{profileName}'s Poems</h2>
              {isLoading ? <p>Loading...</p> : (
              <ul className='w-full h-auto p-4 '>
              {profiles?.map((poem) => (
                <li className='flex border-2 rounded flex-col gap-2 p-5' key={poem.id}>
                  <h3 className='text-xl'>{poem?.poemTitle}</h3>
                  <p className='text-lg line-clamp-2 whitespace-pre-line'>{poem?.poemDesc}</p>
                  <h1>{formatTimeDifference(poem?.created)}</h1>
                  {/* Render other poem details here */}
                </li>
              ))}
            </ul>
            )}
          </div>
        </div>
      </div>
      <div className='w-full text-[#120f08] bg-[#fff] p-7 lg:px-10 py-8 md:py-16 xl:px-32'>
        {/* User Profile information */}
        My Account <br />
        {profileName} <br />
        {user?.email} <br />
        {user?.fullName} <br />
        {user?.bio} <br />
        {user?.mobNumber} <br />
        <img className='w-10 h-10' src={user?.userPhoto} alt='' />

        {/* New Poem Button */}
        <Box
          borderWidth='1px'
          borderRadius='lg'
          className='hover:shadow-sm p-5 w-full h-full md:p-10 flex flex-col items-center justify-between backdrop-blur-xl bg-white active:bg-gray-50 cursor-pointer'
          onClick={() => onOpen()}
        >
          <FiPlus className='text-3xl' />
          <h2 className='md:text-lg lg:text-2xl font-normal tracking-wide'>
            New Poem
          </h2>
        </Box>
        
        {/* Modal for creating a new poem */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
          <ModalContent>
            <ModalCloseButton my={2} />
            <ModalBody py={5}>
              <NewPoemDemo />
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* List of poems */}
        <div className='mt-10 grid grid-cols-2 gap-10'>
          <div className='border-2 p-8 flex flex-col gap-5'>
            <h2 className='font-semibold text-2xl'>{profileName}'s Poems</h2>
            {isLoading ? <p>Loading...</p> : (
              <ul>
              {profiles?.map((poem) => (
                <li className='flex border-2 rounded flex-col gap-2 p-5' key={poem.id}>
                  <h3>{poem?.poemTitle}</h3>
                  <p>{poem?.poemDesc}</p>
                  <h1>{poem?.author}</h1>
                  {/* <h1>{formatTimeDifference(poem?.created)}</h1> */}
                  {/* Render other poem details here */}
                </li>
              ))}
            </ul>
            )}
          </div>
          <div className='border-2 p-8 flex flex-col gap-5'>
            <h2 className='font-semibold text-2xl'>All User's Poems</h2>
            {isPoemLoading ? <p>Loading...</p> : renderPoems(poems)}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CurrentProfile;
