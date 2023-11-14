// Import statements at the beginning
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  AiFillCopy,
  AiFillDelete,
  AiFillEdit,
  AiOutlineShareAlt,
} from "react-icons/ai";
import Navbar from "../../layout/Navbar";
import MazButton from "../../../assets/MazButton";
import Footer from "../../layout/Footer";
import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { usePoems } from "../../../hooks/posts";
import Breadcrumbs from "../../../assets/Breadcrumbs";
import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { PiWhatsappLogoLight } from "react-icons/pi";
import EditPoem from "../../posts/Items/EditPoem";
import { ifUserAdmin } from "../../../utils/isCheck";
import { useAuth } from "../../../hooks/auths";
import { POEMS } from "../../../App";
import { db } from "../../../lib/firebase";
import AlertDialogButton from "../../../assets/AlertDialog";
import { Helmet } from "react-helmet-async";

export default function CurrentPoem() {
  const { user } = useAuth();
  const { PoemId } = useParams();
  const [currentPoem, setCurrentPoem] = useState({});
  const { Poems, isPoemLoading } = usePoems();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } =
    useDisclosure();
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const scriptURL =
    "https://script.google.com/macros/s/AKfycby5saW9JJ2p8uJ5mcGWhyubFMEPwmhWikMf7jaIa836nVt7YKhmjpHgosbh08-1dtN5/exec";

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const snapshot = await getDoc(doc(db, "Poems", PoemId));
        setCurrentPoem({ ...snapshot.data(), id: snapshot.id });
      } catch (error) {
        console.error("Error fetching poem", error);
      }
    };

    fetchPoem();
  }, [PoemId]);

  const copyPoemUrl = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "URL Copied",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 2000,
      });
    });
  };

  const sharePoemUrl = () => {
    navigator.share({
      url: location.pathname,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: new URLSearchParams({ Email: email }), // Send the email in the request body
      });

      if (response.ok) {
        setSubscribed(true);
      } else {
        console.error("Error sending email");
      }
    } catch (error) {
      console.error("Error sending email", error);
    }
  };

  const isAdmin = ifUserAdmin(user);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "Poems", currentPoem?.id));
      toast({
        title: "Poem Deleted",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 2000,
      });
      navigate(POEMS);
    } catch (error) {
      toast({
        title: "Error Deleting Poem",
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
      <Helmet>
        <title>{currentPoem?.poemTitle}</title>
        <meta name="description" content={currentPoem?.poemDesc} />
        <link rel="canonical" href={location.pathname} />
      </Helmet>

      <motion.div className="w-full min-h-screen" layout>
        <div className="w-full h-full p-7 text-[#3f2d23] lg:px-10 py-16 lg:py-20 xl:px-32">
          <Box mb={4}>
            <Breadcrumbs
              one="Poems"
              oneTo="/Poems"
              currentPage={currentPoem.author}
            />
          </Box>
          <div className="flex flex-col w-full h-full gap-5 lg:flex-row md:gap-3 lg:gap-5 xl:gap-10">
            <div className="h-full w-full lg:w-[70%]">
              <div className="bg-[#3f2d2311] h-auto w-full gap-y-3 rounded-xl p-5 md:p-8 flex flex-col items-start">
                <div className="rounded-full p-4 text-xl font-bold text-[#3f2d23] bg-white">
                  <FaQuoteLeft />
                </div>
                <h2 className="pt-3 text-4xl font-medium">
                  {currentPoem.poemTitle}
                </h2>
                <Link
                  to={`/${currentPoem?.author}`}
                  onClick={() =>
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                  }
                  key={currentPoem?.id}
                >
                  <p className="cursor-pointer text-[#120f08] text-base">
                    {currentPoem.author}
                  </p>
                </Link>
                <Divider mt="5" />
                <Box borderRadius="lg" overflow="hidden">
                  <Link
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                  >
                    <div className="flex items-start gap-4 rounded-xl ">
                      <MazButton
                        Link={sharePoemUrl}
                        Icon={
                          <AiOutlineShareAlt className="text-xl md:text-2xl font-thin  text-[#3f2d23] " />
                        }
                      />
                      <MazButton
                        Link={copyPoemUrl}
                        Icon={
                          <AiFillCopy className="text-xl md:text-2xl font-thin  text-[#3f2d23] " />
                        }
                      />
                      {isAdmin && (
                        <>
                          <MazButton
                            Link={onOpen}
                            Icon={
                              <AiFillEdit className="text-xl md:text-2xl font-thin  text-[#3f2d23] " />
                            }
                          />
                          <MazButton
                            Link={onDeleteOpen}
                            Icon={
                              <AiFillDelete className="text-xl md:text-2xl font-thin  text-[#3f2d23] " />
                            }
                          />
                        </>
                      )}
                    </div>
                  </Link>
                </Box>
              </div>
              <p className="w-full pt-10 text-lg tracking-wide text-start">
                {currentPoem?.poemDesc?.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </p>
            </div>
            <div className="h-full w-full lg:w-[30%] flex flex-col gap-y-3 pt-5 lg:pt-0 lg:gap-y-5">
              <div className="bg-[#3f2d2311] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between">
                <div className="w-full text-start md:text-left">
                  <h2 className="w-full text-2xl font-semibold text-center">
                    Popular on Poems
                  </h2>
                  <hr className="w-full my-4 border-gray-200" />
                  <div className="space-y-4">
                    {Poems.slice(0, 5).map((Poem) => (
                      <Link
                        to={`/Poems/id/${Poem?.id}`}
                        onClick={() =>
                          window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                        }
                        key={Poem?.id}
                      >
                        <div className="p-2 rounded-md active:shadow-sm">
                          <h3 className="mb-1 font-medium text-md">
                            {Poem.poemTitle}
                          </h3>
                          <h4 className="text-sm text-gray-600">{Poem.author}</h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/+918714398351"
                className="w-full h-full bg-[#3f2d2311] gap-5 p-6 md:px-10 lg:px-16 flex items-center md:col-span-2 rounded-xl"
              >
                <PiWhatsappLogoLight className="text-3xl md:text-5xl lg:text-6xl" />
                <div className="flex flex-col items-start">
                  <p className="text-sm font-thin md:text-lg">Join Our</p>
                  <h2 className="text-xl md:text-2xl lg:text-4xl">WhatsApp Group</h2>
                  <p className="text-sm font-thin md:text-lg">To get instant updates.</p>
                </div>
              </a>
              <form
                onSubmit={handleSubmit}
                className="bg-[#3f2d2311] h-auto w-full gap-y-1.5  rounded-xl p-6 flex flex-col items-center"
              >
                <h2 className="w-full text-2xl font-semibold text-center">
                  Never miss an Update!
                </h2>
                <p className="w-full text-base text-center ">
                  Sign up for free and be the first to <br /> get notified about updates.
                </p>
                <input
                  value={email}
                  required
                  pattern="[^@]*@[^@]*[.com]"
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-full rounded-3xl w-full bg-[#3f2d2319] mt-6 p-2.5 px-6 placeholder:text-black"
                  type="email"
                  name="Email"
                  placeholder="Enter Your Email"
                  id="Email"
                />
                <button
                  type="submit"
                  className="border-[#3f2d2319] bg-[#3f2d230c] active:bg-[#3f2d2319] border-2 font-medium rounded-3xl text-lg py-1 w-full mt-3 items-center justify-center flex h-auto"
                >
                  {subscribed ? (
                    <p className="py-1 text-base">Thanks For Your Subscription!</p>
                  ) : (
                    <h2>Submit</h2>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
      <Modal isOpen={isOpen} size={"full"} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent>
          <ModalHeader>
            <h2 className="text-2xl font-normal lg:text-4xl">Edit Poem</h2>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={5}>
            <EditPoem onClose={onClose} user={currentPoem} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
