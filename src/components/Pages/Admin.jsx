import React, { useState } from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { MdAdminPanelSettings } from 'react-icons/md'
import NewArticle from '../posts/Items/NewArticle';
import NewPoem from '../posts/Items/NewPoem';
import NewQuote from '../posts/Items/NewQuote';
import NewBlog from '../posts/Items/NewBlog';
import { useUsers } from '../../hooks/auths';
import formatTimeDifference from '../../assets/formatTime'
import { Link } from 'react-router-dom';
import NewWhatsNew from '../posts/Items/NewWhatsNew';
import { useArticles, usePoems, useQuotes } from '../../hooks/posts';
import { AiFillDelete } from 'react-icons/ai';
import AlertDialogButton from '../../assets/AlertDialog';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const adminItems = [
  { key: 'Poem', label: 'New Poem', component: <NewPoem /> },
  { key: 'Article', label: 'New Article', component: <NewArticle /> },
  { key: 'quote', label: 'New Quote', component: <NewQuote /> },
  { key: 'blog', label: 'New Blog', component: <NewBlog /> },
  { key: 'WhatsNew', label: "What's New", component: <NewWhatsNew /> },
];


function AdminItem({ item, onClick }) {
  return (
    <Box
      borderWidth='1px'
      borderRadius='lg'
      className='hover:shadow-sm p-5 w-full h-full md:p-10 flex flex-col items-center justify-between backdrop-blur-xl bg-white active:bg-gray-50 cursor-pointer'
      onClick={onClick}
    >
      <FiPlus className='text-3xl' />
      <h2 className='md:text-lg lg:text-2xl font-normal tracking-wide'>
        {item.label}
      </h2>
    </Box>
  );
}

function Admin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } =
    useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);
  const { users } = useUsers()
  const toast = useToast()
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users?.filter((user) =>
    [user.username, user.fullName].some(field =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );


  const openModal = (itemKey) => {
    setSelectedItem(itemKey);
    onOpen();
  };

  const closeModal = () => {
    setSelectedItem(null);
    onClose();
  };


  const { quotes } = useQuotes()
  const { Poems } = usePoems()
  const { Articles } = useArticles()


  const stats = [
    { label: 'Quotes', total: quotes?.length, percentage: '30%' },
    { label: 'Poems', total: Poems?.length, percentage: '16%' },
    { label: 'Articles', total: Articles?.length, percentage: '8%' },
    // Add more stats if needed
  ];

  const handleDelete = async (quote) => {
    try {
      await deleteDoc(doc(db, "quotes", quote));
      toast({
        title: "Quote Deleted",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error Deleting Quote",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className='w-full h-full min-h-screen bg-white text-[#3f2d23] shadow-sm py-10 p-3 lg:px-10 md:py-12 xl:px-32'>
        <div
          className='w-full text-center items-center text-2xl lg:text-4xl font-medium justify-center flex gap-3 tracking-wide py-3 md:py-8 '
        >
          <MdAdminPanelSettings /> <h2> Admin Dashboard</h2>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mt-5'>
          {adminItems?.map((item) => (
            <AdminItem key={item.key} item={item} onClick={() => openModal(item?.key)} />
          ))}
        </div>
        <div className='w-full py-10 rounded-xl bg-gray-50 my-16 grid grid-cols-2 gap-5 justify-items-center md:grid-cols-3'>
          {stats?.map((stat, index) => (
            <Stat key={index} className='items-center text-center'>
              <StatLabel ><h2 className='text-xl lg:text-2xl '>{stat.label}</h2></StatLabel>
              <StatNumber><h2 className='text-2xl lg:text-3xl '>{stat.total}</h2></StatNumber>
              <StatHelpText>
                <StatArrow type='increase' />
                {stat.percentage}
              </StatHelpText>
            </Stat>
          ))}
        </div>
        <input
          placeholder="🔍 Search User Name"
          value={searchQuery}
          className="outline-[#3f2d2328] w-full   outline-dashed outline-2 p-2 px-5 rounded"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <TableContainer className='mt-10 overflow-scroll max-h-[90vh] border-2 p-5 '>
          <Table variant='simple'>
            <TableCaption>Maznavi._ Web Users Table</TableCaption>
            <Thead>
              <Tr>
                <Th>No : {users?.length}</Th>
                <Th>Date</Th>
                <Th>User Photo</Th>
                <Th>User Name</Th>
                <Th>Email</Th>
                <Th>Full Name</Th>
                <Th>Mobile</Th>
                <Th>DOB</Th>
                <Th>Bio</Th>
                <Th>UID</Th>
                <Th>Password</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers?.map((user, index) => (
                <Tr>
                  <Td>{index + 1}</Td>
                  <Td >{formatTimeDifference(user?.created)}</Td>
                  <Td><img className='w-10 h-10' src={user?.userPhoto} /></Td>
                  <Td> <Link onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }} to={`/${user.username}`}>{user.username}</Link></Td>
                  <Td>{user.email}</Td>
                  <Td>{user.fullName}</Td>
                  <Td>{user.mobNumber}</Td>
                  <Td>{user.DOB}</Td>
                  <Td>{user.bio}</Td>
                  <Td>{user.uid}</Td>
                  <Td>{user.password}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <div className='w-full pt-20 '>
          <Accordion allowToggle>
            <AccordionItem >
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    Quotes
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              {quotes?.map((item) => (
                <AccordionPanel className='w-full justify-between border-b-[0.4px] border-black flex items-center'>
                  <h2 className='line-clamp-1 '>{item.quote}</h2>
                  <button onClick={() => handleDelete(item?.id)}><AiFillDelete /></button>
                </AccordionPanel>
              ))}

            </AccordionItem>
            <AccordionItem >
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    Poems
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              {Poems?.map((item) => (
                <AccordionPanel p={2}>
                  <h2 className='line-clamp-1 '> {item.poemDesc}</h2>
                </AccordionPanel>
              ))}

            </AccordionItem>
            <AccordionItem >
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    Articles
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              {Articles?.map((item) => (
                <AccordionPanel p={2}>
                  <h2 className='line-clamp-1 '>{item.title}</h2>
                </AccordionPanel>
              ))}

            </AccordionItem>
          </Accordion>
        </div>
        <Modal isOpen={isOpen} onClose={closeModal}>
          <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
          <ModalContent>
            <ModalCloseButton my={2} />
            <ModalBody py={5}>
              {selectedItem && adminItems.find((item) => item.key === selectedItem)?.component}
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
      <AlertDialogButton
        onDelete={handleDelete}
        onClose={onDeleteClose}
        isOpen={isDeleteOpen}
        type='poem'
      />
      <Footer />
    </>
  );
}

export default Admin;
