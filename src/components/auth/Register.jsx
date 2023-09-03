import React  from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
  Tooltip,
} from "@chakra-ui/react";
import { LOGIN, HOME } from "../../App";
import { Link as routerLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  usernameValidate,
  passwordValidate,
  emailValidate,
} from "../../utils/form-validation";
import { useRegister } from "../../hooks/auths";

export default function Register() {
  const { register: signup, isLoading } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleRegister(data) {
    signup({
      username: data.username,
      email: data.email,
      password: data.password,
      redirectTo: HOME,
    });
  }
  const labelBtn = "Don't be a stranger, sign up!";
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
        maxW={"xl"}
        minW={350}
        px={6}
        py={12}
        rounded={"xl"}
        boxShadow={"lg"}
        bg={useColorModeValue("white", "gray.700")}
      >
        <Stack align={"center"} mb={6}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Join Us Today!
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Create your account and get started.
          </Text>
        </Stack>
        <form onSubmit={handleSubmit(handleRegister)}>
          <Stack spacing={4}>
            <FormControl id="username" isInvalid={errors.username}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Username"
                {...register("username", usernameValidate)}
                borderRadius="md"
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="email" isInvalid={errors.email}>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="user@example.com"
                {...register("email", emailValidate)}
                borderRadius="md"
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="password" isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                {...register("password", passwordValidate)}
                borderRadius="md"
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Stack spacing={6}>
              <Tooltip label={labelBtn}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  colorScheme="blue"
                  type="submit"
                  isLoading={isLoading}
                >
                  Sign up
                </Button>
              </Tooltip>
              <Text align="center">
                Already have an account?{" "}
                <Link color="blue.500" as={routerLink} to={LOGIN}>
                  Log in
                </Link>
              </Text>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}
