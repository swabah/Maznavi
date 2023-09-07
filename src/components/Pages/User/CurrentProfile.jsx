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
import { collection, query, where, getDocs } from 'firebase/firestore'; // Import Firestore related functions here
import { db } from '../../../lib/firebase';
import formatTimeDifference from '../../../assets/formatTimeDifference';

function CurrentProfile() {
  const { ProfileName } = useParams();
  const { user,isLoading } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      // Perform Firestore query to fetch user profile data
      const userPoemsCollectionRef = collection(db, `users/${user?.uid}/poems`);
      const q = query(userPoemsCollectionRef, where("author", "==", ProfileName));
      const Poems = await getDocs(q);
      setProfile(Poems.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchProfile();
  }, [ProfileName, user]);

  console.log(profile)
  return (
    <>
      <Navbar />
      <div className='w-full text-[#120f08] bg-[#fff] min-h-full p-7 lg:px-10 py-8 md:py-16 xl:px-32'>
        {/* User Profile information */}
        My Account <br />
        {ProfileName} <br />
        {user?.email} <br />
        {user?.fullName} <br />
        {user?.bio} <br />
        {user?.mobNumber} <br />
        <img className='w-10 h-10' src={user?.userPhoto} alt='' />

        {/* New Poem Button */}
        {/* <Box
          borderWidth='1px'
          borderRadius='lg'
          className='hover:shadow-sm p-5 w-full h-full md:p-10 flex flex-col items-center justify-between backdrop-blur-xl bg-white active:bg-gray-50 cursor-pointer'
          onClick={() => onOpen()}
        >
          <FiPlus className='text-3xl' />
          <h2 className='md:text-lg lg:text-2xl font-normal tracking-wide'>
            New Poem
          </h2>
        </Box> */}

        {/* Modal for creating a new poem
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
          <ModalContent>
            <ModalCloseButton my={2} />
            <ModalBody py={5}>
              <NewPoemDemo />
            </ModalBody>
          </ModalContent>
        </Modal> */}

        {/* List of poems */}
        <div>
        <div className='flex flex-col gap-5'>
            <h2>{ProfileName}'s Poems</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul className=''>
                {profile?.map((poem) => (
                    <li className='flex border-2 rounded flex-col gap-2 p-5' key={poem.id}>
                    <h3>{poem?.poemTitle}</h3>
                    <p>{poem?.poemDesc}</p>
                    <h1>{poem?.author}</h1>
                    <h1>{formatTimeDifference(poem?.created)}</h1>
                    {/* Render other poem details here */}
                    </li>
                ))}
                </ul>
            )}
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CurrentProfile;
