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
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { MdAdminPanelSettings } from 'react-icons/md';
import NewStory from '../posts/Items/NewStory';
import NewArticle from '../posts/Items/NewArticle';
import NewPoem from '../posts/Items/NewPoem';
import NewQuote from '../posts/Items/NewQuote';
import NewBlog from '../posts/Items/NewBlog';
import { useUsers } from '../../hooks/auths';
import formatTimeDifference from '../../assets/formatTime' 
import { Link } from 'react-router-dom';
import NewWhatsNew from '../posts/Items/NewWhatsNew';

const adminItems = [
  { key: 'story', label: 'New Story', component: <NewStory/> },
  { key: 'Poem', label: 'New Poem', component: <NewPoem/> },
  { key: 'Article', label: 'New Article', component: <NewArticle/> },
  { key: 'quote', label: 'New Quote', component: <NewQuote/> },
  { key: 'blog', label: 'New Blog', component: <NewBlog/> },
  { key: 'WhatsNew', label: "What's New", component: <NewWhatsNew/> },
];

const stats = [
  { label: 'Stories', total: '2000', percentage: '20%' },
  { label: 'Quotes', total: '2000', percentage: '20%' },
  { label: 'Poems', total: '2000', percentage: '20%' },
  { label: 'Articles', total: '2000', percentage: '20%' },
  // Add more stats if needed
];

const accordionItems = [
  { label: 'Stories', content: 'Lorem ipsum...' },
  { label: 'Quotes', content: 'Lorem ipsum...' },
  { label: 'Poems', content: 'Lorem ipsum...' },
  { label: 'Articles', content: 'Lorem ipsum...' },
  // Add more accordion items if needed
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
  const [selectedItem, setSelectedItem] = useState(null);
  const {users} = useUsers()
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

  return (
    <>
      <Navbar />
      <div className='w-full h-full min-h-screen bg-white text-[#3f2d23] shadow-sm py-10 p-3 lg:px-10 md:py-12 xl:px-32'>
        <div
          onClick={() => openModal('adminPanel')}
          className='w-full text-center items-center text-2xl lg:text-4xl font-medium justify-center flex gap-3 tracking-wide py-3 md:py-8 '
        >
          <MdAdminPanelSettings /> <h2> Admin Dashboard</h2>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mt-5'>
          {adminItems?.map((item) => (
            <AdminItem key={item.key} item={item} onClick={() => openModal(item?.key)} />
          ))}
        </div>
        <div className='w-full pt-20 grid grid-cols-2 gap-5 justify-items-center md:grid-cols-4'>
          {stats?.map((stat, index) => (
            <Stat key={index}>
              <StatLabel>{stat.label}</StatLabel>
              <StatNumber>{stat.total}</StatNumber>
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
          className="outline-[#3f2d2328] w-full mt-16  outline-dashed outline-2 p-2 px-5 rounded"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <TableContainer className='mt-10 border-2 p-5 '>
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
              {filteredUsers?.map((user,index)=>(
                <Tr>
                  <Td>{index + 1}</Td>
                  <Td >{formatTimeDifference(user?.created)}</Td>
                  <Td><img className='w-10 h-10' src={user?.userPhoto}/></Td>
                  <Td> <Link onClick={() => { window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}} to={`/${user.username}`}>{user.username}</Link></Td>
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
            {accordionItems.map((acc, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                      {acc?.label}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {acc?.content}
                </AccordionPanel>
              </AccordionItem>
            ))}
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
      <Footer />
    </>
  );
}

export default Admin;
