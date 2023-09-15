import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerBody,
  DrawerContent,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import LogoSecondary from "../../assets/Images/Logo_secendary.png";
import LogoThird from "../../assets/Images/Logo_third.png";
import { useAuth } from "../../hooks/auths";
import { HOME, STORIES, ARTICLES, LOGIN, AUTHORS, POEMS, BLOGS, ADMIN, WHATSNEW } from "../../App";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Donate from "../../assets/Donate";
import { ifUserAdmin } from "../../utils/isCheck";
import userDemo from '../../assets/Images/user.png'
import {CiMenuKebab} from 'react-icons/ci'

export default function Navbar() {
  const { user } = useAuth();
  const [fix, setFix] = useState(false);
  const location = useLocation();

  const { isOpen: isAlertOpen, onOpen: openAlert, onClose: closeAlert } = useDisclosure();
  const { isOpen: isDrawerOpen, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleScroll = () => {
    setFix(window.scrollY >= 100);
  };

  const isAdmin = ifUserAdmin(user);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate(LOGIN);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    // { path: BLOGS, name: "Blogs" },
    // { path: STORIES, name: "Stories" },
    { path: HOME, name: "Home" },
    { path: POEMS, name: "Poems" },
    { path: ARTICLES, name: "Articles"}
  ];

  if (!user) {
    links.push({ path: LOGIN, name: "Login" });
  }

  const navigate = useNavigate();

  const renderLinks = () => {
    return links.map((link, index) => (
      <Link to={link?.path} className="hidden lg:flex decoration-none" key={index}>
        <li className={`text-lg tracking-wide cursor-pointer ${ location.pathname === "/" ? "hover:text-green-600" : "hover:text-[#ffffffa5]" } transition font-normal drop-shadow-sm capitalize`} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" }) } >
          {link.name}
        </li>
      </Link>
    ));
  };

  return (
    <header className={`w-full z-50 text-[#3f2d23] ${fix? "bg-white shadow-md": `${location.pathname === "/"? "fixed left-0 top-0 bg-transparent" : "bg-[#3f2d23] text-[#fff]"} `} ${location.pathname === "/" ? "fixed left-0 top-0" : ""}  md:h-20 lg:h-24 py-3 px-7 lg:px-10 md:py-10 xl:px-32 flex items-center justify-between`}>
    <Link as={Link} to={HOME}>
      <img
        src={location.pathname === "/" ? LogoThird : LogoSecondary}
        className=" h-12 w-12 lg:w-20 lg:h-20"
        alt="MAZNAVI._"
      />
    </Link>
    <nav className="flex gap-2 lg:gap-6 items-center justify-center">
        <ul className="items-center flex w-full h-auto space-x-6">
          {renderLinks()}
          {user && <MenuDropdown links={links} openAlert={openAlert} user={user} />}
        </ul>
        <div className="flex lg:hidden">
           <CiMenuKebab onClick={openDrawer} className={`text-2xl ${ location.pathname === "/" ? "text-[#3f2d23]" : "text-[#fff]" }`} aria-hidden="true" />
        </div>
      </nav>
      <LogoutAlertDialog isOpen={isAlertOpen} onClose={closeAlert} logout={handleLogout} />
      <MobileDrawer openAlert={openAlert} isOpen={isDrawerOpen} onClose={closeDrawer} links={links} user={user} isAdmin={isAdmin} />
      <Donate isOpen={isOpen} onClose={onClose} />
    </header>
  );
}

function LogoutAlertDialog({ isOpen, onClose, logout }) {
  const cancelRef = React.useRef();

  return (
    <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>
          <h2 className="text-2xl font-normal tracking-wide">Confirm Logout !</h2>
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to log out? If you proceed, you will be signed out of your account.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            <h2 className="text-xl font-normal tracking-wide">No</h2>
          </Button>
          <Button onClick={logout} colorScheme="red" ml={3}>
            <h2 className="text-xl font-normal tracking-wide">Yes</h2>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function MobileDrawer({ isOpen, onClose, links, user, isAdmin,openAlert }) {
  return (
    <Drawer className="bg-[#3f2d23]" onClose={onClose} isOpen={isOpen} size={"sm"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton m={2} fontSize={"lg"} className="text-[#3f2d23]" />
        <img src={LogoThird} className=" h-12 w-12 lg:w-20 lg:h-20 mt-2 ml-4" alt="" />
        <DrawerBody>
          <ul className="flex flex-col w-full h-full space-y-3">
            {links.map((link, index) => (
              <Link to={link?.path} className="decoration-none" key={index}>
                <li className={`text-lg tracking-wide cursor-pointer text-[#3f2d23] active:text-[#3f2d239a] transition font-normal drop-shadow-sm capitalize`}>{link.name}</li>
              </Link>
            ))}
            {user && (
                <h2  className="text-[#3f2d23] w-full text-lg" onClick={openAlert} >Logout</h2>
            )}
            <button className={`bg-green-600 text-[#fff] transition-all hover:scale-95 px-4 py-1.5 rounded-sm`}>
              <a href={"https://wa.me/+918714398351"} className="text-lg font-normal rounded-md">
                Join
              </a>
            </button>
          </ul>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

function MenuDropdown({ user , openAlert}) {
  const isAdmin = ifUserAdmin(user);
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <Menu>
      <MenuButton>
        {user?.userPhoto ? (
          <img
            src={user?.userPhoto}
            className={` h-10 w-10 lg:w-12 lg:h-12 p-1 object-cover ${location.pathname === "/" ? 'bg-transparent':'bg-white '} rounded-full`}
            alt=""
          />
        ) : (
          <img className='h-10 w-10 lg:w-12 lg:h-12  object-cover p-1 rounded-full' src={userDemo} alt='Current User Profile Picture' />
        )}
      </MenuButton>
      <MenuList>
        <MenuGroup>
            {user && 
              <MenuItem>
                <div className='text-[#3f2d23] text-lg w-full flex items-center justify-start gap-3 ' onClick={() => navigate(`/${user.username}`)}>
                  {user?.userPhoto ? (
                    <img
                      src={user?.userPhoto}
                      className={` h-6 w-6 lg:w-7 lg:h-7 object-cover ${location.pathname === "/" ? 'bg-transparent':'bg-white '} rounded-full`}
                      alt=""
                    />
                  ) : (
                    <img className=' h-6 w-6 lg:w-7 lg:h-7 object-cover   rounded-full' src={userDemo} alt='Current User Profile Picture' />
                  )}
                 <h2 >  Profile  </h2>
                </div>
              </MenuItem>
            }
            {isAdmin && (
            <MenuItem >
              <h2  className="text-[#3f2d23] w-full text-lg" onClick={() => navigate(ADMIN)}> Admin Dashboard</h2>
            </MenuItem>
            )}
            {user && (
            <MenuItem> 
             <h2  className="text-[#3f2d23] w-full text-lg" onClick={() => navigate(WHATSNEW)} > What's New</h2>
            </MenuItem>
            )}
            {user && (
            <MenuItem>
                <h2  className="text-[#3f2d23] w-full text-lg" onClick={openAlert} >Logout</h2>
            </MenuItem>
            )}
            <MenuDivider/>
            <MenuItem>
              <a href={"https://wa.me/+918714398351"} className="bg-[#3f2d23] text-white w-full text-center tracking-wider py-2  ">
                JOIN 
              </a>
            </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}
