import React, { useState } from 'react';
import {
  Flex,
  Box,
  Stack,
  Button,
  Text,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { uuidv4 } from "@firebase/util";
import { doc, setDoc } from 'firebase/firestore'; // Import setDoc
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../../../lib/firebase';
import { useAuth } from '../../../hooks/auths';

function NewArticle() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  

  const handleAddArticle = async (data) => {
    setLoading(true);

    try {
      if (!selectedImage) {
        toast({
          title: 'Image is required',
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 5000,
        });
        setLoading(false);
        return;
      }

      const id = uuidv4();
      const originalFilename = selectedImage.name.replace(/\s+/g, '');
      const documentId = `${originalFilename}_${id}`;

      const imageRef = ref(storage, `Articles/${documentId}`);
      await uploadBytes(imageRef, selectedImage);
      const imageUrl = await getDownloadURL(imageRef);

      const date = new Date();
      const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

      await setDoc(doc(db, "Articles", id), {  // Using setDoc correctly
        uid: user.id,
        id,
        imageUrl,
        created: { date: formattedDate, time: formattedTime },
        content: data.content,
        title: data.title,
        socialLinks: {
          instagram: data.instagram || ''
        },
        writer : {
          writer_name :data.writer_name ,
          writer_link :data.writer_link ,
        },
        likes: [],
      });

      setSelectedImage(null);
      reset();
      toast({
        title: 'Article added successfully!',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });

      setLoading(false);
    } catch (error) {
      console.error('Error adding Article:', error);
      toast({
        title: 'Error adding Article',
        description: 'An error occurred while adding the Article.',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
      setLoading(false);
    }
  };


  return (
    <>
      <Flex align={'center'} justify={'center'}>
        <Stack spacing={8} maxW={'90%'} minW={'100%'} py={5}>
          <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} p={{ base: 2, md: 3 }}>
            <Stack>
              <form onSubmit={handleSubmit(handleAddArticle)}>
                <FormControl id='title'>
                  <FormLabel>Article Title</FormLabel>
                  <Input type='text' {...register('title', { required: true, maxLength: 100 })} />
                </FormControl>
                <Flex my={3}>
                  <FormControl id='instagram' mr={2}>
                    <FormLabel>Instagram Link</FormLabel>
                    <Input required={false} type='text' {...register('instagram')} />
                  </FormControl>
                </Flex>
                <Flex my={3}>
                  <FormControl id='writer_name' mr={2}>
                    <FormLabel>writer name</FormLabel>
                    <Input required={false} type='text' {...register('writer_name')} />
                  </FormControl>
                  <FormControl id='writer_link' mr={2}>
                    <FormLabel>writer Link</FormLabel>
                    <Input required={false} type='text' {...register('writer_link')} />
                  </FormControl>
                </Flex>
                <FormControl id='content'>
                  <FormLabel>Article Content</FormLabel>
                  <Textarea
                    placeholder='Start typing your Article...'
                    as={Textarea}
                    maxH='20px'
                    {...register('content', { required: true })}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel htmlFor='image' fontWeight='medium'>
                    Article Image
                  </FormLabel>
                  <Input
                    type='file'
                    id='image'
                    onChange={(event) => setSelectedImage(event.target.files[0])}
                    border='1px'
                    rounded='md'
                    padding={1}
                  />
                  {!selectedImage && <Text color='red.500'>Image is required.</Text>}
                </FormControl>
                <Button
                  mt={{ base: '20px', md: '10px' }}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type='submit'
                  isLoading={loading}
                  loadingText={'Loading...'}
                >
                  ADD Article
                </Button>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}

export default NewArticle;
