import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, query, where,  getDocs, orderBy} from 'firebase/firestore';
import { Divider,Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import { db } from '../../../lib/firebase';
import { FaInstagram} from 'react-icons/fa';
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
  const {Poems} = usePoems()
  const { isOpen:isUpdateOpen, onOpen:onUpdateOpen, onClose:onUpdateClose } = useDisclosure();
  const { isOpen:isViewOpen, onOpen:onViewOpen, onClose:onViewClose } = useDisclosure();
  const { isOpen:isProPictureOpen, onOpen:onProPictureOpen, onClose:onProPictureClose } = useDisclosure();
  const { isOpen:isShareOpen, onOpen:onShareOpen, onClose:onShareClose } = useDisclosure();


  useEffect(() => {
    const fetchUserPoems = async () => {
      const PoemsRef = collection(db, "Poems");
      const q = query(PoemsRef  , where("author", "==", profileName));
      const Poems = await getDocs(q);
      setUserPoems(Poems.docs.map((doc)=>({...doc.data(),id:doc.id})));

      const CurrentUserRef = collection(db, "users");
      const CurrentUserq = query(CurrentUserRef , where("username", "==", profileName));
      const querySnapshot = await getDocs(CurrentUserq);
      setCurrentUser(querySnapshot.docs.map((doc) => doc.data()))
    };
    fetchUserPoems()
  }, [profileName]);

  console.log('UserPoems' , UserPoems);
  console.log('user' , user);
  console.log('UsersPoems' , Poems);
  console.log('CurrentUser' , CurrentUser);

 

  return (
    <>
      <Navbar />
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-[#120f08] bg-[#fff] min-h-screen h-full p-7 lg:px-10 py-8 md:py-16 xl:px-32'>
        <div className='md:order-1 col-span-1 md:col-span-2 lg:col-span-3 flex flex-col gap-16  w-full h-auto'>
        {isLoading ? <div className='w-full h-full bg-gray-100 animate-pulse rounded-3xl'></div>: 
          CurrentUser.map((CurrentUser)=>(
            <div className='w-full flex flex-col md:flex-row gap-5 md:gap-8 lg:gap-10 items-start justify-start h-auto   md:p-5 lg:p-8 md:py-12 rounded-3xl md:border md:shadow-md'>
              <div className='relative w-20 h-20 bg-gray-100 rounded-full lg:w-24 lg:h-24 xl:w-28 xl:h-28'>
                {CurrentUser?.userPhoto ? <>
                  <img className='w-full h-full object-cover p-1 rounded-full' src={CurrentUser?.userPhoto} alt='Current User Profile Picture' />
                  {CurrentUser?.username === user?.username  && (<div onClick={()=>onProPictureOpen()} className='opacity-0 hover:opacity-80 absolute inset-0 flex items-center justify-center bg-green-100   cursor-pointer ring-2 ring-green-200 text-4xl w-full h-full rounded-full'> <FiPlus/></div>)}
                  </> : <>
                  {CurrentUser?.username === user?.username  && (<div onClick={()=>onProPictureOpen()} className='absolute inset-0 flex items-center justify-center hover:bg-green-100 bg-green-200  cursor-pointer hover:ring-2 ring-green-200 text-4xl w-full h-full rounded-full'> <FiPlus/></div>)}
                  <img className='w-full h-full object-cover p-1 rounded-full' src={userDemo} alt='Current User Profile Picture' />
                </>}
              </div>
              <div className='flex flex-col w-full md:w-2/3 lg:w-3/4 gap-4 items-start'>
                <div className='w-full'>
                  <div className='w-full text-2xl pb-3  flex gap-3 items-center'>
                    <h2 className=' '>{profileName}</h2>
                    {CurrentUser?.InstagramLink && <a href={CurrentUser?.InstagramLink}>  <FaInstagram  /></a>}
                  </div>
                  <p className='text-sm md:text-base capitalize font-medium'>{CurrentUser?.fullName}</p>
                  <p className='w-full text-sm md:text-base font-medium whitespace-pre-line text-start line-clamp-3'>{CurrentUser?.bio}</p>
                </div>
                <div className='grid w-full  lg:w-full  text-center grid-cols-2 gap-3'>
                  <div  onClick={() => onViewOpen()} className='col-span-1 p-1 cursor-pointer px-5 rounded-md bg-gray-100 hover:bg-gray-200'>
                  View Profile
                  </div>
                  <div
                  onClick={() => onShareOpen()}
                  className='col-span-1 p-1 cursor-pointer px-5 rounded-md bg-gray-100 hover:bg-gray-200'
                  >
                  Share Profile
                  </div>
                  {CurrentUser?.username === user?.username  && (
                    <div
                      onClick={() => onUpdateOpen()}
                      className='col-span-2 p-1 cursor-pointer px-5 rounded-md bg-gray-100 hover:bg-gray-200'
                    >
                      Update Profile
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        }
        {isLoading ? (
          <div className='w-full h-full bg-gray-100 animate-pulse rounded-3xl'></div>
        ) : (
            UserPoems.length > 0 && 
            <div className='w-full h-full'>
              <h2 className='font-medium text-2xl'>{profileName}'s Poems</h2>
              <Divider my={3} />
              <div className='grid grid-cols-1 gap-5 md:grid-cols-2 w-full h-auto pt-2 '>
                  {UserPoems?.slice(0, 6).map((Poem,index) => (
                    <SinglePoem key={index} Poem={Poem}/>
                  ))}
                  </div>
              </div> 
          )}
        </div>
        <div className='order-2 lg:col-span-2 flex flex-col gap-5 w-full h-full'>
           {isLoading ? <div className='w-full h-full bg-gray-100 animate-pulse rounded-3xl'></div> : (
            <div className='w-full h-auto md:px-4'>
            <h2 className='font-medium text-2xl'>Explore All</h2>
            <Divider my={3} />
            <ul className=' w-full h-auto overflow-hidden overflow-y-visible flex pt-2 flex-col items-start text-start'>
                {Poems?.slice(0, 5).map((poem) => <>
                  <li className=' py-2 rounded-sm w-full grid justify-between items-start gap-2 grid-cols-4 cursor-pointer ' key={poem.id}>
                    <Link to={`/Poems/id/${poem?.id}`} className='col-span-3'>
                      <p className='font-semibold text-sm md:text-base  truncate'>{poem?.poemTitle}</p>
                      <p className='text-sm md:text-base line-clamp-4 whitespace-pre-line'>{poem?.poemDesc}</p>
                      <div className='flex items-center gap-2'>
                        <p className='text-xs opacity-90 md:text-sm '>{formatTime(poem?.created)}</p>
                        <Link to={`/${poem?.author}`}>
                         <p className='hover:underline text-xs md:text-sm truncate'>{poem.author}</p>
                        </Link>
                      </div>
                    </Link>
                  </li>
                  </> )}
              <li className='w-full p-5 underline flex items-center justify-center cursor-pointer'><Link to={POEMS}>View All</Link></li>
            </ul>
            </div>
            )}
          </div>
      </div>
      {CurrentUser.map((CurrentUser)=>(
        <>
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
