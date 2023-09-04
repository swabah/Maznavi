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
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { MdAdminPanelSettings } from 'react-icons/md';
import NewStory from '../posts/Items/NewStory';
import NewArticle from '../posts/Items/NewArticle';
import NewPoem from '../posts/Items/NewPoem';
import NewQuote from '../posts/Items/NewQuote';
import NewBlog from '../posts/Items/NewBlog';

const adminItems = [
  { key: 'story', label: 'New Story', component: <NewStory/> },
  { key: 'Poem', label: 'New Poem', component: <NewPoem/> },
  { key: 'Article', label: 'New Article', component: <NewArticle/> },
  { key: 'quote', label: 'New Quote', component: <NewQuote/> },
  { key: 'blog', label: 'New Blog', component: <NewBlog/> },
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
          {adminItems.map((item) => (
            <AdminItem key={item.key} item={item} onClick={() => openModal(item.key)} />
          ))}
        </div>
        <div className='w-full pt-20 grid grid-cols-2 gap-5 justify-items-center md:grid-cols-4'>
          {stats.map((stat, index) => (
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
        <div className='w-full pt-20 '>
          <Accordion allowToggle>
            {accordionItems.map((acc, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                      {acc.label}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {acc.content}
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
              {selectedItem && adminItems.find((item) => item.key === selectedItem).component}
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
      <Footer />
    </>
  );
}

export default Admin;
