import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  Link,
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
import { CiMenuKebab } from "react-icons/ci";
import LogoSecondary from "../../assets/Images/Logo_secendary.png";
import LogoThird from "../../assets/Images/Logo_third.png";
import { useAuth } from "../../hooks/auths";
import { HOME, STORIES, ARTICLES, LOGIN, AUTHORS, POEMS, BLOGS, MYACCOUNT, ADMIN } from "../../App";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Donate from "../../assets/Donate";
import { ifUserAdmin } from "../../utils/isCheck";

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
    { path: HOME, name: "Home" },
    { path: BLOGS, name: "Blogs" },
    { path: STORIES, name: "Stories" },
    { path: POEMS, name: "Poems" },
    { path: ARTICLES, name: "Articles" },
    { path: AUTHORS, name: "Authors" },
  ];

  if (!user) {
    links.push({ path: LOGIN, name: "Login" });
  }

  const navigate = useNavigate();

  const renderLinks = () => {
    return links.map((link, index) => (
      <RouterLink to={link?.path} className="decoration-none" key={index}>
        <li
          className={`text-lg tracking-wide cursor-pointer ${
            location.pathname === "/"
              ? "hover:text-green-600"
              : "hover:text-[#ffffffa5]"
          } transition font-normal drop-shadow-sm capitalize`}
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }
        >
          {link.name}
        </li>
      </RouterLink>
    ));
  };

  return (
    <header
      className={`w-full z-50 text-[#3f2d23] ${
        fix
          ? "bg-white shadow-md"
          : `${
              location.pathname === "/"
                ? "fixed left-0 top-0 bg-transparent"
                : "bg-[#3f2d23] text-[#fff]"
            } `
      } ${
        location.pathname === "/" ? "fixed left-0 top-0" : ""
      } py-1 md:h-20 lg:h-24 p-3 px-7 lg:px-10 md:py-10 xl:px-32 flex items-center justify-between`}
    >
      <Link as={RouterLink} to={HOME}>
        <img
          src={location.pathname === "/" ? LogoThird : LogoSecondary}
          className="w-[4.5rem] md:w-20"
          alt="MAZNAVI._"
        />
      </Link>
      <nav className="flex items-center justify-center">
        <ul className="items-center hidden w-full h-auto space-x-6 lg:flex">
          {renderLinks()}
          {user && (
            <h2 onClick={openAlert} className="text-lg font-thin cursor-pointer">
              Logout
            </h2>
          )}
          <button
            className={`${
              location.pathname === "/"
                ? "bg-[#3f2d23] text-[#fff]"
                : "bg-[#fff] text-[#3f2d23]"
            }  transition-all hover:scale-95 px-4 py-1.5 rounded-sm`}
          >
            <a href={"https://wa.me/+918714398351"} className="text-lg font-normal rounded-md">
              Join
            </a>
          </button>
          {isAdmin && <MenuDropdown user={user} />}
        </ul>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={openDrawer}
          >
            <span className="sr-only">Open main menu</span>
            <CiMenuKebab
              className={`h-6 w-6 ${
                location.pathname === "/" ? "text-[#3f2d23]" : "text-[#fff]"
              }`}
              aria-hidden="true"
            />
          </button>
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

function MobileDrawer({ isOpen, onClose, links, user, isAdmin, openAlert }) {
  return (
    <Drawer className="bg-[#3f2d23]" onClose={onClose} isOpen={isOpen} size={"sm"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton m={2} fontSize={"lg"} className="text-[#3f2d23]" />
        <img src={LogoThird} className="w-[4.5rem] md:w-20 ml-4" alt="" />
        <DrawerBody>
          <ul className="flex flex-col w-full h-full space-y-3">
            {links.map((link, index) => (
              <RouterLink to={link?.path} className="decoration-none" key={index}>
                <li className={`text-lg tracking-wide cursor-pointer text-[#3f2d23] active:text-[#3f2d239a] transition font-normal drop-shadow-sm capitalize`}>{link.name}</li>
              </RouterLink>
            ))}
            {user && (
              <h2 onClick={openAlert} className="text-lg font-thin cursor-pointer">Logout</h2>
            )}
            {isAdmin && <MenuDropdown user={user} />}
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

function MenuDropdown({ user }) {
  const isAdmin = ifUserAdmin(user);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Menu>
      <MenuButton>
        {user?.userPhoto ? (
          <img
            src={user?.userPhoto}
            className="w-10 h-10 rounded-full"
            alt=""
          />
        ) : (
          <div className={` ${location.pathname === "/" ? 'bg-[#3f2d23dc]' : 'bg-[#fff]'} w-10 h-10  rounded-full`}></div>
        )}
      </MenuButton>
      <MenuList>
        <MenuGroup title='Profile'>
            <MenuItem onClick={() => navigate(`/${user.username}`)}>
              My Account
            </MenuItem>
          {isAdmin && (
            <MenuItem onClick={() => navigate(ADMIN)}>Admin Portel </MenuItem>
          )}
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title='Help'>
          <MenuItem>Docs</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}
