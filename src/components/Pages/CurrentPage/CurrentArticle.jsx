import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import {
  AiFillCopy,
  AiFillDelete,
  AiFillEdit,
  AiOutlineShareAlt,
} from "react-icons/ai";
import Navbar from "../../layout/Navbar";
import MazButton from "../../../assets/MazButton";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Footer from "../../layout/Footer";
import { useArticles } from "../../../hooks/posts";
import { CgPentagonBottomLeft } from "react-icons/cg";
import { PiWhatsappLogoLight } from "react-icons/pi";
import formatTime from "../../../assets/formatTime";
import { useAuth } from "../../../hooks/auths";
import EditArticle from "../../posts/Items/EditArticle";
import { ifUserAdmin } from "../../../utils/isCheck";
import { ARTICLES } from "../../../App";
import AlertDialogButton from "../../../assets/AlertDialog";
import { db } from "../../../lib/firebase";
import { Helmet } from "react-helmet-async";

export default function CurrentArticle() {
  const { user } = useAuth();
  const { ArticleId } = useParams();
  const { Articles } = useArticles();
  const [currentArticle, setCurrentArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(doc(db, "Articles", ArticleId), (snapshot) => {
      setLoading(false);
      setCurrentArticle({ ...snapshot.data(), id: snapshot.id });
    });

    return () => unsubscribe();
  }, [ArticleId]);

  const toast = useToast();
  const fullPath = useLocation();
  const navigate = useNavigate();

  const copyArticleUrl = () => {
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

  const shareArticleUrl = () => {
    navigator.share({
      url: fullPath.pathname,
    });
  };

  const isAdmin = ifUserAdmin(user);

  const scriptURL = "https://script.google.com/macros/s/AKfycby5saW9JJ2p8uJ5mcGWhyubFMEPwmhWikMf7jaIa836nVt7YKhmjpHgosbh08-1dtN5/exec";
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: new URLSearchParams({ Email: email }),
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

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "Articles", currentArticle?.id));
      toast({
        title: "Article Deleted",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 2000,
      });
      navigate(ARTICLES);
    } catch (error) {
      toast({
        title: "Error Deleting Article",
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
        <title>{currentArticle?.title}</title>
        <meta name="description" content={currentArticle?.content} />
        <link rel="canonical" href={fullPath.pathname} />
        <meta property="og:image" content={currentArticle?.imageUrl} />
      </Helmet>
      <motion.div className="w-full min-h-screen" layout>
        {loading ? (
          <div className="w-full h-full bg-gray-100 animate-pulse rounded-3xl"></div>
        ) : (
          <div className="w-full h-full p-7 text-[#3f2d23] lg:px-10 py-16 lg:py-20 xl:px-32">
            <div className="flex flex-col w-full h-full gap-5 lg:flex-row lg:gap-5 xl:gap-10">
              <div className="h-full w-full lg:w-[70%]">
                <div className="flex flex-col items-start w-full h-auto gap-3 rounded-xl">
                  <Link
                    to={`/Articles/${currentArticle?.topic}`}
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
                    key={currentArticle?.id}
                  >
                    <h2 className="font-semibold tracking-wide uppercase md:text-lg ">
                      {currentArticle.topic}
                    </h2>
                  </Link>
                  <h2 className="mt-1 text-3xl font-medium md:text-4xl xl:text-5xl">
                    {currentArticle.title}
                  </h2>
                  <div className="flex flex-col w-full md:flex-row md:items-center md:justify-between pt-7">
                    <div className="w-full md:w-1/2 flex items-center gap-1.5 md:gap-5">
                      <div className="w-8 h-8 bg-black md:w-12 rounded-3xl md:h-12"></div>
                      <Link className="flex flex-col text-[#3f2d23] ">
                        <a className="text-sm truncate md:text-lg" href={currentArticle.writer?.writer_link}>
                          {currentArticle.writer?.writer_name}
                        </a>
                        <p className="text-xs md:text-sm text-[#3f2d23] ">
                          {formatTime(currentArticle?.created)}
                        </p>
                      </Link>
                    </div>
                    <Divider my={4} className="md:hidden" />
                    <div className="w-full md:w-1/2 flex items-start md:justify-end text-[#3f2d23] gap-4 rounded-xl ">
                      <MazButton Link={shareArticleUrl} Icon={<AiOutlineShareAlt className="text-xl md:text-2xl font-thin text-[#3f2d23]" />} />
                      <MazButton Link={copyArticleUrl} Icon={<AiFillCopy className="text-xl md:text-2xl font-thin text-[#3f2d23]" />} />
                      {isAdmin && (
                        <>
                          <MazButton Link={onOpen} Icon={<AiFillEdit className="text-xl md:text-2xl font-thin text-[#3f2d23]" />} />
                          <MazButton Link={onDeleteOpen} Icon={<AiFillDelete className="text-xl md:text-2xl font-thin text-[#3f2d23]" />} />
                        </>
                      )}
                    </div>
                  </div>
                  <Divider mt="5" />
                </div>
                <div className="w-full h-[50vh] relative md:h-[60vh] lg:h-[70vh] rounded-lg overflow-hidden mt-10 lg:mt-14 xl:mt-16">
                  <img
                    src={currentArticle?.imageUrl}
                    alt="Article image"
                    className="object-cover w-full h-full transition-all duration-500 rounded-lg cursor-move hover:scale-105"
                  />
                  {currentArticle.writer?.writer_name && (
                    <div className="absolute top-0 p-1.5 md:p-2.5 z-10 right-0 rounded-2xl flex items-center transition-all justify-center text-5xl">
                      <div className="flex items-center bg-[#C0C0C0] backdrop-blur-sm bg-opacity-60 text-[10px] md:text-xs p-1 px-1.5 rounded-lg gap-1">
                        <CgPentagonBottomLeft className="text-base" />
                        <a className="truncate opacity-90" href={currentArticle.writer?.writer_link}>
                          {currentArticle.writer?.writer_name}
                        </a>
                      </div>
                    </div>
                  )}
                  {currentArticle.socialLinks?.instagram || currentArticle.socialLinks?.facebook ? (
                    <div className="absolute top-0 p-1.5 md:p-2.5 z-10 left-0 rounded-2xl flex items-center transition-all justify-center text-5xl">
                      <div className="flex items-center bg-[#C0C0C0] backdrop-blur-sm bg-opacity-60 text-sm md:text-base p-0.5 md:p-1 px-1.5 rounded-lg gap-1">
                        <p className="text-[10px] md:text-xs">Open</p>
                        <a href={currentArticle.socialLinks?.instagram}>
                          <FaInstagram />
                        </a>
                        {currentArticle.socialLinks?.facebook && <a href={currentArticle.socialLinks?.facebook}><FaFacebook /></a>}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <h2 className="w-full pt-10 text-lg tracking-wide text-center md:text-start">
                  {currentArticle?.content?.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </h2>
              </div>
              <div className="h-full w-full lg:w-[30%] flex flex-col gap-y-3 pt-5 lg:pt-0 lg:gap-y-5">
                <div className="bg-[#3f2d2311] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between">
                  <div className="w-full text-start md:text-left">
                    <h2 className="w-full text-2xl font-semibold text-center">Popular on Articles</h2>
                    <hr className="w-full my-4 border-gray-200" />
                    <div className="space-y-4">
                      {Articles?.slice(0, 5).map((Article) => (
                        <Link to={`/Articles/id/${Article?.id}`} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })} key={Article?.id}>
                          <div className="p-2 rounded-md hover:underline active:shadow-sm">
                            <h3 className="font-medium text-md">{Article.title}</h3>
                            <h4 className="text-sm text-gray-600 uppercase">{Article.topic}</h4>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <a href="https://wa.me/+918714398351" className="w-full h-full bg-[#3f2d2311] gap-5 p-6 xl:px-10 flex items-center md:col-span-2 rounded-xl">
                  <PiWhatsappLogoLight className="text-3xl md:text-5xl xl:text-6xl" />
                  <div className="flex flex-col items-start">
                    <p className="text-base font-thin lg:text-lg">Join Our</p>
                    <h2 className="text-xl md:text-3xl xl:text-4xl">WhatsApp Group</h2>
                    <p className="text-base font-thin xl:text-lg">To get instant updates.</p>
                  </div>
                </a>
                <form onSubmit={handleSubmit} className="bg-[#3f2d2311] h-auto w-full gap-y-1.5 rounded-xl p-6 flex flex-col items-center">
                  <h2 className="w-full text-2xl font-semibold text-center">Never miss an Update !</h2>
                  <p className="w-full text-base text-center ">Sign up for free and be the first to <br /> get notified about updates.</p>
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
                  <button type="submit" className="border-[#3f2d2319] bg-[#3f2d230c] active:bg-[#3f2d2319] border-2 font-medium rounded-3xl text-lg py-1 w-full mt-3 items-center justify-center flex h-auto">
                    {subscribed ? <p className="py-1 text-base">Thanks For Your Subscription !</p> : <h2>Submit</h2>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </motion.div>
      <Modal isOpen={isOpen} size={"full"} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent>
          <ModalHeader><h2 className="text-2xl font-normal lg:text-4xl">Edit Article</h2></ModalHeader>
          <ModalCloseButton />
          <ModalBody py={5}>
            <EditArticle onClose={onClose} user={currentArticle} />
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
        type="Article"
      />
      <Footer />
    </>
  );
}
