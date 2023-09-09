import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Divider,Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { db } from '../../../lib/firebase';
import { FaInstagram, FaPlus } from 'react-icons/fa';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';
import formatTime from '../../../assets/formatTime';
import NewPoemDemo from './NewPoemDemo';
import { useAuth } from '../../../hooks/auths';
import PostsDemo from '../../Demo/PostsDemo';
import UpdateProfile from './UpdateProfile';
import { ifUserAdmin } from '../../../utils/isCheck';
import ViewProfile from './ViewProfile';
import { FiPlus } from 'react-icons/fi';
import UploadProPicture from './UploadProPicture';

function ModalComponent({ isOpen, onClose, children }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
      <ModalContent>
        <ModalCloseButton my={2} />
        <ModalBody py={5}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

function CurrentProfile() {
  const { profileName } = useParams();
  const { user, isLoading } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen:isUpdateOpen, onOpen:onUpdateOpen, onClose:onUpdateClose } = useDisclosure();
  const { isOpen:isViewOpen, onOpen:onViewOpen, onClose:onViewClose } = useDisclosure();
  const { isOpen:isProPictureOpen, onOpen:onProPictureOpen, onClose:onProPictureClose } = useDisclosure();

  const isAdmin = ifUserAdmin(user);

  useEffect(() => {
    const fetchUserPoems = async () => {
      try {
        const userPoemsCollectionRef = collection(db, `users/${user?.uid}/poems`);
        const q = query(userPoemsCollectionRef, where('author', '==', profileName));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const userPoemsArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setProfiles(userPoemsArray);
        });

        return unsubscribe;
      } catch (error) {
        console.error('Error fetching user poems:', error);
      }
    };

    if (user) {
      fetchUserPoems();
    }
  }, [profileName, user]);


  return (
    <>
      <Navbar />
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-[#120f08] bg-[#fff] h-full p-7 lg:px-10 py-8 md:py-16 xl:px-32'>
        <div className='md:order-1 col-span-1 md:col-span-2 lg:col-span-3 flex flex-col gap-10  w-full h-auto'>
          <div className='w-full flex flex-col md:flex-row gap-5 md:gap-8 lg:gap-10 items-start justify-start h-full md:p-5 rounded-3xl md:border md:shadow-md'>
            <div className='relative w-20 h-20 bg-gray-100 rounded-full lg:w24 lg:h-24 xl:w-28 xl:h-28'>
              {user?.userPhoto ? <>
                <img className='w-full h-full rounded-full' src={user?.userPhoto} alt='' />
                <div onClick={()=>onProPictureOpen()} className='opacity-0 hover:opacity-80 absolute inset-0 flex items-center justify-center bg-green-100   cursor-pointer ring-2 ring-green-200 text-4xl w-full h-full rounded-full'> <FiPlus/></div>
                </> : (
                <div onClick={()=>onProPictureOpen()} className='absolute inset-0 flex items-center justify-center hover:bg-green-100 bg-green-200  cursor-pointer hover:ring-2 ring-green-200 text-4xl w-full h-full rounded-full'> <FiPlus/></div>
              )}
            </div>
            <div className='flex flex-col w-full md:w-2/3 lg:w-3/4 gap-4 items-start'>
              <div className='w-full'>
                <div className='w-full text-2xl pb-3  flex gap-3 items-center'>
                  <h2 className=' '>{profileName}</h2>
                  {user?.InstagramLink && (<a href={user?.InstagramLink}>  <FaInstagram  /></a>)}
                </div>
                <p className='text-sm md:text-base capitalize font-medium'>{user?.fullName}</p>
                <p className='w-full text-sm md:text-base font-medium whitespace-pre-line text-start line-clamp-3'>{user?.bio}</p>
              </div>
              <div className='grid w-full md:w-2/3 lg:w-2/3 xl:w-2/3 text-center grid-cols-2 gap-3'>
                <div
                  onClick={() => onUpdateOpen()}
                  className='col-span-1 p-1 cursor-pointer px-5 rounded-md bg-gray-100 hover:bg-gray-200'
                >
                  Update Profile
                </div>
                <div  onClick={() => onViewOpen()} className='col-span-1 p-1 cursor-pointer px-5 rounded-md bg-gray-100 hover:bg-gray-200'>
                  View Profile
                </div>
                <div
                  className='col-span-2 p-1 cursor-pointer px-5 rounded-md bg-gray-100 hover:bg-gray-200'
                >
                  Share Profile
                </div>
              </div>
            </div>
          </div>
          <div className='w-full h-auto md:p-5 rounded-3xl md:border md:shadow-md'>
            <h2 className='font-medium text-xl'>{profileName}'s Poems</h2>
            <Divider my={3} />
            {isAdmin && (
              <li className='flex w-full cursor-pointer items-center p-4 bg-green-50 rounded-sm justify-start gap-5'>
                <div className='rounded-full p-5 bg-green-100'>
                  <FaPlus className='rounded-full text-2xl shadow-sm bg-green-600 p-1 text-white ' />
                </div>
                <h2
                  onClick={() => onOpen()}
                  className='shadow-sm hover:shadow-md text-sm lg:text-base  rounded-3xl hover:bg-green-100  border-green-100 font-medium tracking-wider cursor-pointer border-[0.2px] p-0.5 lg:p-1 px-4 lg:px-6'
                >
                  Write Your Poem
                </h2>
              </li>
            )}
            <ul className=' w-full h-auto overflow-hidden overflow-y-visible flex pt-2 md:pt-5 flex-col items-start text-start'>
              {isLoading ? (
                <PostsDemo h='16' count='2' />
              ) : (
                profiles?.slice(0, 3).map((poem) => (
                  <li className='hover:bg-green-50 py-2 rounded-sm px-4 w-full flex cursor-pointer flex-col ' key={poem.id}>
                    <div className='text-base flex items-center gap-2 md:text-lg'>
                      <p>{poem?.poemTitle}</p>
                      <p className='text-sm md:text-base'>{formatTime(poem?.created)}</p>
                    </div>
                    <p className='text-sm md:text-base line-clamp-2 whitespace-pre-line'>{poem?.poemDesc}</p>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className='order-2 lg:col-span-2 flex flex-col gap-5 w-full h-full'></div>
      </div>
      <ModalComponent isOpen={isOpen} onClose={onClose}>
        <NewPoemDemo />
      </ModalComponent>
      <ModalComponent isOpen={isUpdateOpen} onClose={onUpdateClose}>
        <UpdateProfile user={user} />
      </ModalComponent>
      <ModalComponent isOpen={isViewOpen} onClose={onViewClose}>
        <ViewProfile user={user} />
      </ModalComponent>
      <ModalComponent isOpen={isProPictureOpen} onClose={onProPictureClose}>
        <UploadProPicture user={user} />
      </ModalComponent>
      <Footer />
    </>
  );
}

export default CurrentProfile;
