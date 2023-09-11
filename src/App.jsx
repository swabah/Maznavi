import React, { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home";
import Login from "./components/auth/Login";
import Authors from "./components/Pages/Authors";
import Poems from "./components/Pages/Poems";
import Stories from "./components/Pages/Stories";
import Articles from "./components/Pages/Articles";
import Register from "./components/auth/Register";
import Admin from "./components/Pages/Admin";
import CurrentPoem from "./components/Pages/CurrentPage/CurrentPoem";
import CurrentArticle from "./components/Pages/CurrentPage/CurrentArticle";
import CurrentTopic from "./components/Pages/CurrentPage/CurrentTopic";
import Blogs from "./components/Pages/Blogs";
import MainLoader from "./assets/MainLoader";
import Donate from "./assets/Donate";
import CurrentProfile from "./components/Pages/CurrentPage/CurrentProfile";

export const HOME = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const ADMIN = "/Admin";
export const AUTHORS = "/authors";
export const POEMS = "/Poems";
export const STORIES = "/stories";
export const BLOGS = "/Blogs";
export const ARTICLES = "/Articles";

function App() {
  const [isLoading, setIsLoading] = useState(true);
const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    setTimeout(() => {
      onOpen()
    }, 10000);
  }, [onOpen,setTimeout]);

  return (
    <>
    {isLoading ? (<MainLoader/>) :
    <>
    <Router>
        <Routes>
              {/* Home */}
              <Route exact path={HOME} element={<Home/>} />

              {/* Profile */}
              <Route path={`${HOME}:profileName`} element={<CurrentProfile/>}/>

              {/* Login */}
              <Route path={LOGIN} element={<Login/>} />

              {/* Authors */}
              <Route  path={AUTHORS} element={<Authors/>} />

              {/* Poems */}
              <Route  path={POEMS} element={<Poems/>} />
              <Route path={`${POEMS}/id/:PoemId`} element={<CurrentPoem/>} />

              {/* Articles */}
              <Route  path={ARTICLES} element={<Articles/>} />
              <Route path={`${ARTICLES}/id/:ArticleId`} element={<CurrentArticle/>} />
              <Route path={`${ARTICLES}/:Topic`} element={<CurrentTopic/>} />

              {/* Stories */}
              <Route path={STORIES} element={<Stories/>} />

              {/* Blogs */}
              <Route path={BLOGS} element={<Blogs/>} />

              {/* Register */}
              <Route path={REGISTER} element={<Register/>} />

              {/* Admin */}
              <Route path={ADMIN} element={<Admin/>} />
        </Routes>
    </Router>
    <Donate isOpen={isOpen} onClose={onClose}/>
    </> 
    }
    </>
  );
}

export default App;
