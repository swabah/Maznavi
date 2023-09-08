import React, { useEffect, useState } from 'react';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';
import {
  Box,
  Divider,
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
import { FaPlus } from 'react-icons/fa';
import { ifUserAdmin } from '../../../utils/isCheck';

function CurrentProfile() {
  const { profileName } = useParams();
  const { user, isLoading } = useAuth();
  const { poems } = usePoemsDemo();
  const [profiles, setProfiles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isAdmin = ifUserAdmin(user);


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

  return (
    <>
      <Navbar />
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-[#120f08] bg-[#fff] h-full p-7 lg:px-10 py-8 md:py-16 xl:px-32'>
        <div className='md:order-1 col-span-1 md:col-span-2 lg:col-span-3 flex flex-col gap-10  w-full h-auto'>
          <div className='w-full flex flex-col md:flex-row gap-5 md:gap-8 lg:gap-10 items-start justify-start h-full md:p-5 rounded-3xl md:border md:shadow-md'>
            <img className='w-20 bg-gray-100 rounded-full h-20' src={user?.userPhoto} alt='' />
            <div className='flex flex-col gap-4 items-pcenter'>
              <div className='w-full'>
               <h2 className='text-2xl font-medium'>{profileName}</h2>
               <p className='text-sm md:text-base font-medium'>{user?.bio}</p>
              </div>
              <div className='grid w-full text-center grid-cols-2 gap-3'>
                <div className='col-span-1 p-1 cursor-pointer px-5 rounded-md bg-gray-100'>Edit Profile</div>
                <div className='col-span-1 p-1 cursor-pointer px-5 rounded-md bg-gray-100'>Edit Profile</div>
                <div className='col-span-2 p-1 cursor-pointer px-5 rounded-md bg-gray-100'>Edit Profile</div>
              </div>
            </div>
          </div>
          <div className='w-full h-auto md:p-5 rounded-3xl md:border md:shadow-md'>
              <h2 className='font-medium text-xl'>{profileName}'s Poems</h2>
              <Divider my={3}/>
              {isLoading ? <p>Loading...</p> : (
              <ul className='w-full h-auto overflow-hidden overflow-y-visible flex gap-3 pt-2 md:pt-5 flex-col items-start text-start'>
              {profiles?.slice(0,5).map((poem) => (
                <li className='flex hover:opacity-80 cursor-pointer flex-col gap-0.5' key={poem.id}>
                  <h3 className='text-base md:text-xl'>{poem?.poemTitle}</h3>
                  <p className='text-sm md:text-base line-clamp-2 whitespace-pre-line'>{poem?.poemDesc}</p>
                  <h1 className='text-sm md:text-base'>{formatTimeDifference(poem?.created)}</h1>
                </li>
              ))}
            </ul>
            )}
          </div>
        </div>
        {isAdmin && (
        <div className='order-2 lg:col-span-2 flex flex-col gap-5 w-full h-full'>
             <Box
                className={` p-5 py-8 md:py-14 w-full gap-3 bg-gray-50 h-auto rounded-md border-dashed border-[1px] border-green-600 md:border-2  md:p-10 flex flex-col items-center justify-center backdrop-blur-xl bg-white active:bg-gray-50 cursor-pointer`}
              >
                <div className='rounded-full p-5 bg-green-100'>
                  <FaPlus className='rounded-full text-2xl bg-green-600 p-1 text-white ' />
                </div>
                <h2  onClick={() => onOpen()} className='hover:shadow-md text-sm lg:text-base  rounded-3xl hover:bg-gray-50 font-medium tracking-wider cursor-pointer border-[0.2px] p-0.5 lg:p-1 px-4 lg:px-6'>
                  Write Your Poem
                </h2>
              </Box>
        </div> 
        )}
      </div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
          <ModalContent>
            <ModalCloseButton my={2} />
            <ModalBody py={5}>
              <NewPoemDemo />
            </ModalBody>
          </ModalContent>
        </Modal>
      <Footer />
    </>
  );
}

export default CurrentProfile;
