import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import { db } from '../../../lib/firebase';
import { FaInstagram } from 'react-icons/fa';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';
import formatTime from '../../../assets/formatTime';
import { useAuth } from '../../../hooks/auths';
import UpdateProfile from '../User/UpdateProfile';
import ViewProfile from '../User/ViewProfile';
import { FiPlus } from 'react-icons/fi';
import UploadProPicture from '../User/UploadProPicture';
import ShareProfile from '../User/ShareProfile';
import { usePoems } from '../../../hooks/posts';
import { POEMS } from '../../../App';
import SinglePoem from '../../posts/SinglePoem';
import userDemo from '../../../assets/Images/user.png'
import Metatag from '../../layout/Meta-tag';

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
  const [UserPoems, setUserPoems] = useState([]);
  const [CurrentUser, setCurrentUser] = useState([]);
  const { Poems } = usePoems()
  const { isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure();
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const { isOpen: isProPictureOpen, onOpen: onProPictureOpen, onClose: onProPictureClose } = useDisclosure();
  const { isOpen: isShareOpen, onOpen: onShareOpen, onClose: onShareClose } = useDisclosure();


  useEffect(() => {
    const fetchUserPoems = async () => {
      const PoemsRef = collection(db, "Poems");
      const q = query(PoemsRef, where("author", "==", profileName));
      const Poems = await getDocs(q);
      setUserPoems(Poems.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      const CurrentUserRef = collection(db, "users");
      const CurrentUserq = query(CurrentUserRef, where("username", "==", profileName));
      const querySnapshot = await getDocs(CurrentUserq);
      setCurrentUser(querySnapshot.docs.map((doc) => doc.data()))
    };
    fetchUserPoems()
  }, [profileName]);

  // console.log('UserPoems' , UserPoems);
  // console.log('user' , user);
  // console.log('UsersPoems' , Poems);
  // console.log('CurrentUser' , CurrentUser);

  console.log(CurrentUser);


  return (
    <>
      <Navbar />
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-[#120f08] bg-[#fff] min-h-screen h-full p-7 lg:px-10 py-8 md:py-16 xl:px-32'>
        <div className='flex flex-col w-full h-auto col-span-1 gap-16 md:order-1 md:col-span-2 lg:col-span-3'>
          {isLoading ? (
            <div className='w-full h-full bg-gray-100 animate-pulse rounded-3xl'></div>
          ) : (
            CurrentUser.map((currentUser) => (
              <div key={currentUser.id} className='flex flex-col items-start justify-start w-full h-auto gap-5 md:flex-row md:gap-8 lg:gap-10 md:p-5 lg:p-8 md:py-12 rounded-3xl md:border md:shadow-md'>
                <div className='relative w-20 h-20 bg-gray-100 rounded-full lg:w-24 lg:h-24 xl:w-28 xl:h-28'>
                  {currentUser.userPhoto ? (
                    <>
                      <img className='object-cover w-full h-full p-1 rounded-full' src={currentUser.userPhoto} alt='Current User Profile Picture' />
                      {currentUser.username === user.username && (
                        <div onClick={() => onProPictureOpen()} className='absolute inset-0 flex items-center justify-center w-full h-full text-4xl bg-green-100 rounded-full opacity-0 cursor-pointer hover:opacity-80 ring-2 ring-green-200'> <FiPlus /></div>
                      )}
                    </>
                  ) : (
                    <>
                      {currentUser.username === user.username && (
                        <div onClick={() => onProPictureOpen()} className='absolute inset-0 flex items-center justify-center w-full h-full text-4xl bg-green-200 rounded-full cursor-pointer hover:bg-green-100 hover:ring-2 ring-green-200'> <FiPlus /></div>
                      )}
                      <img className='object-cover w-full h-full p-1 rounded-full' src={userDemo} alt='Current User Profile Picture' />
                    </>
                  )}
                </div>
                <div className='flex flex-col items-start w-full gap-4 md:w-2/3 lg:w-3/4'>
                  <div className='w-full'>
                    <div className='flex items-center w-full gap-3 pb-3 text-2xl'>
                      <h2>{profileName}</h2>
                      {currentUser.InstagramLink && (
                        <a href={currentUser.InstagramLink}> <FaInstagram /></a>
                      )}
                    </div>
                    <p className='text-sm font-medium capitalize md:text-base'>{currentUser.fullName}</p>
                    <p className='w-full text-sm font-medium whitespace-pre-line md:text-base text-start line-clamp-3'>{currentUser.bio}</p>
                  </div>
                  <div className='grid w-full grid-cols-2 gap-3 text-center lg:w-full'>
                    <div onClick={() => onViewOpen()} className='col-span-1 p-1 px-5 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200'>
                      View Profile
                    </div>
                    <div onClick={() => onShareOpen()} className='col-span-1 p-1 px-5 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200'>
                      Share Profile
                    </div>
                    {currentUser.username === user.username && (
                      <div onClick={() => onUpdateOpen()} className='col-span-2 p-1 px-5 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200'>
                        Update Profile
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading ? (
            <div className='w-full h-full bg-gray-100 animate-pulse rounded-3xl'></div>
          ) : (
            UserPoems.length > 0 &&
            <div className='w-full h-full'>
              <h2 className='text-2xl font-medium'>{profileName}'s Poems</h2>
              <Divider my={3} />
              <div className='grid w-full h-auto grid-cols-1 gap-5 pt-2 md:grid-cols-2 '>
                {UserPoems.slice(0, 6).map((poem, index) => (
                  <SinglePoem key={index} Poem={poem} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className='flex flex-col order-2 w-full h-full gap-5 lg:col-span-2'>
          {isLoading ? <div className='w-full h-full bg-gray-100 animate-pulse rounded-3xl'></div> : (
            <div className='w-full h-auto md:px-4'>
              <h2 className='text-2xl font-medium'>Explore All</h2>
              <Divider my={3} />
              <ul className='flex flex-col items-start w-full h-auto pt-2 overflow-hidden overflow-y-visible text-start'>
                <li className='grid w-full h-full grid-cols-2 gap-5 '>
                  {Poems?.slice(0, 5).map((poem) => <>
                    <Link className='w-full ' onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }} to={`/Poems/id/${poem?.id}`} key={poem.id}>
                      <p className='text-sm font-semibold truncate md:text-base'>{poem?.poemTitle}</p>
                      <p className='text-sm whitespace-pre-line md:text-base line-clamp-4'>{poem?.poemDesc}</p>
                      <div className='flex items-center gap-2'>
                        <p className='text-xs truncate opacity-90 md:text-sm'>{formatTime(poem?.created)}</p>
                        <Link onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }} to={`/${poem?.author}`}>
                          <p className='text-xs truncate hover:underline md:text-sm'>{poem.author}</p>
                        </Link>
                      </div>
                    </Link>
                  </>)}
                </li>
                <li className='flex items-center justify-center w-full p-5 underline cursor-pointer'><Link to={POEMS} onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }}>View All</Link></li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {CurrentUser.map((CurrentUser) => (
        <>
          <Metatag title={CurrentUser?.fullName} imageUrl={CurrentUser?.userPhoto} description={CurrentUser?.bio} url={window.location.href} />
          <ModalComponent isOpen={isUpdateOpen} onClose={onUpdateClose}>
            <UpdateProfile user={user} />
          </ModalComponent>
          <ModalComponent isOpen={isViewOpen} onClose={onViewClose}>
            <ViewProfile user={CurrentUser} />
          </ModalComponent>
          <ModalComponent isOpen={isProPictureOpen} onClose={onProPictureClose}>
            <UploadProPicture user={CurrentUser} />
          </ModalComponent>
          <ModalComponent isOpen={isShareOpen} onClose={onShareClose}>
            <ShareProfile user={CurrentUser} />
          </ModalComponent>
        </>
      ))}
      <Footer />
    </>
  );
}

export default CurrentProfile;
