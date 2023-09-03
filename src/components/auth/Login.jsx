import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {useState} from "react";
import {REGISTER, HOME} from "../../App";
import {Link as routerLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import {emailValidate, passwordValidate} from "../../utils/form-validation";
import {useLogin} from "../../hooks/auths";
export default function Login() {
  const [show, setShow] = useState(false);
  const {login, isLoading} = useLogin();

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  async function handleLogin(data) {
    const succeeded = await login({
      email: data.email,
      password: data.password,
      redirectTo: HOME,
    });
    if (succeeded) reset();
  }
  const handleClick = () => setShow(!show);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        minW={350}
        py={12}
        px={6}
        className="bg-white rounded-lg shadow-lg"
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Let's Maznavi._</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Time to get your login on ✌️
          </Text>
        </Stack>
        <Box p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(handleLogin)}>
              <FormControl id='email' isInvalid={errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type='text'
                  placeholder='user@email.com'
                  {...register("email", emailValidate)}
                  className="border rounded p-2 focus:outline-none focus:ring focus:border-blue-400"
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id='password' mb={3} isInvalid={errors.email}>
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    placeholder='Password123'
                    type={show ? "text" : "password"}
                    {...register("password", passwordValidate)}
                    className="border rounded p-2 focus:outline-none focus:ring focus:border-blue-400"
                  />
                  <InputRightElement width='4.5rem'>
                    <Button
                      h='1.75rem'
                      size='sm'
                      onClick={handleClick}
                      className="rounded-md"
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link as={routerLink} to={HOME} color={"blue.400"}>
                    Explore blogs?
                  </Link>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type='submit'
                  isLoading={isLoading}
                  loadingText='Logging In'
                  className="w-full"
                >
                  Sign in
                </Button>
              </Stack>
            </form>
            <Stack pt={6}>
              <Text align={"center"}>
                Newcomer here? Join the community!{" "}
                <Link
                  color={"blue.400"}
                  as={routerLink}
                  to={REGISTER}
                  className="hover:underline"
                >
                  Register
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
