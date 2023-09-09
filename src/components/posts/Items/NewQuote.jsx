import React from 'react';
import {
  Flex,
  Box,
  Stack,
  Button,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  FormHelperText
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useAddQuote } from '../../../hooks/posts';
import { useAuth } from '../../../hooks/auths';

function NewQuote({ onModalClose }) {
  const { addQuote, isLoading } = useAddQuote();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const handleAddQuote = (data) => {
    addQuote({
      uid: user.id,
      quote: data.Quote,
      Quote_writer: data.Quote_writer,
      created:new Date()
    });
    reset();
    onModalClose();
  };

  return (
    <>
      <Flex align={'center'} justify={'center'}>
        <Stack spacing={8} maxW={'90%'} minW={'100%'} py={8}>
          <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} p={{ base: 2, md: 3 }}>
            <Stack>
              <form onSubmit={handleSubmit(handleAddQuote)}>
                <FormControl id='Quote_writer'>
                  <FormLabel>Quote Writer</FormLabel>
                  <Input type='text' {...register('Quote_writer', { required: true, maxLength: 300 })} />
                </FormControl>
                <FormControl id='Quote'>
                  <FormLabel>Your Quote</FormLabel>
                  <Input type='text' {...register('Quote', { required: true, maxLength: 300 })} />
                  <FormHelperText>Eg: സന്തുണി വിസികെ മോച</FormHelperText>
                </FormControl>
                <Button
                  mt={{ base: '20px', md: '10px' }}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type='submit'
                  isLoading={isLoading}
                  loadingText={'Loading...'}
                >
                  ADD QUOTE
                </Button>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}

export default NewQuote;