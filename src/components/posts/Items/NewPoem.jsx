import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  Textarea,
  useColorModeValue,
  FormHelperText,
  useToast,
} from '@chakra-ui/react';
import TextareaAutosize from 'react-textarea-autosize';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/auths';
import { uuidv4 } from "@firebase/util";
import { doc, setDoc } from 'firebase/firestore'; // Import setDoc
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../../../lib/firebase';


function NewPoem() {
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { user, authLoading } = useAuth();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddPoem = async (data) => {
    setLoading(true);

    try {
      let PhotoUrl = null;

      if (selectedPhoto) {
        const id = uuidv4();
        const originalFilename = selectedPhoto.name.replace(/\s+/g, '');
        const documentId = `${originalFilename}_${id}`;

        const PhotoRef = ref(storage, `Poems/${documentId}`);
        await uploadBytes(PhotoRef, selectedPhoto);
        PhotoUrl = await getDownloadURL(PhotoRef);
      }

      const date = new Date();
      const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

      const PoemDocData = {
        uid: user.id,
        id: uuidv4(),
        PhotoUrl,
        created: { date: formattedDate, time: formattedTime },
        title: data.title,
        desc: data.desc,
        author: data.author,
        likes: [],
      };

      await setDoc(doc(db, "Poems", PoemDocData.id), PoemDocData);

      setSelectedPhoto(null);
      reset();
      toast({
        title: 'Poem added successfully!',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });

      setLoading(false);
    } catch (error) {
      console.error('Error adding Poem:', error);
      toast({
        title: 'Error adding Poem',
        description: 'An error occurred while adding the Poem.',
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
              <form onSubmit={handleSubmit(handleAddPoem)}>
                <FormControl id='title'>
                  <FormLabel>Poem Title</FormLabel>
                  <Input type='text' {...register('title', { required: true, maxLength: 100 })} />
                  <FormHelperText>Eg: The Art of Effective Communication</FormHelperText>
                </FormControl>
                <FormControl id='author'>
                  <FormLabel>Author tag</FormLabel>
                  <Input
                    type='text'
                    placeholder='@author_name'
                    {...register('author', { required: true, minLength: 8 })}
                  />
                  <FormHelperText>Eg: @author</FormHelperText>
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel htmlFor='Photo' fontWeight='medium'>
                    Author Photo
                  </FormLabel>
                  <Input
                    type='file'
                    id='Photo'
                    onChange={(event) => setSelectedPhoto(event.target.files[0])}
                    border='1px'
                    rounded='md'
                    padding={1}
                  />
                  {!selectedPhoto && <Text color='red.500'>Photo is required.</Text>}
                </FormControl>
                <FormControl id='desc'>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    placeholder='I know writing can be tough, Just type "blah blah blah" to test things out!'
                    as={TextareaAutosize}
                    maxRows={2}
                    resize={'none'}
                    {...register('desc', { required: true })}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    mt={'10px'}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    type='submit'
                    isLoading={loading}
                    loadingText={'Loading...'}
                    isDisabled={!user || authLoading}
                  >
                    Hit the Big Blue Button! Poem
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}

export default NewPoem;
