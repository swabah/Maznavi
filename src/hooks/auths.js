import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../lib/firebase";
import { doc, getDoc, collection, getDocs, query, orderBy } from "firebase/firestore";

// This code is for fetching user data
export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (authUser) {
        const userRef = doc(db, "users", authUser.uid);
        const docSnap = await getDoc(userRef);
        setUser(docSnap.data());
      }
      setLoading(false);
    }

    if (!authLoading) {
      fetchData();
    }
  }, [authLoading, authUser]);

  return { user, isLoading, error };
}

// This code is for fetching all users
export function useUsers() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (authUser) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy("created", "desc")); // Order by "created" field in descending order
        const querySnapshot = await getDocs(q);        
        const usersData = [];
        const queryData = querySnapshot.docs.map((doc) => doc.data());
        usersData.push(...queryData);
        setUsers(usersData);
      }
      setLoading(false);
    }

    if (!authLoading) {
      fetchData();
    }
  }, [authLoading, authUser]);

  return { users, isLoading, error };
}



// import React,{ useEffect, useState } from "react";
// import {
//     signInWithEmailAndPassword,
//     createUserWithEmailAndPassword,
// } from "firebase/auth";
// import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
// import { auth, db } from "../lib/firebase";
// import { useToast } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import { setDoc, doc, getDoc } from "firebase/firestore";
// import {  HOME } from "../App";
// import isUsernameExists from "../utils/isUsernameExists";


// // This code is for fatching User data
// export function useAuth() {
//     const [authUser, authLoading, error] = useAuthState(auth);
//     const [isLoading, setLoading] = useState(true);
//     const [user, setUser] = useState(null);


//     useEffect(() => {
//         async function fetchData() {
//             setLoading(true);
//             const ref = doc(db, "users", authUser.uid);
//             const docSnap = await getDoc(ref);
//             setUser(docSnap.data());
//             setLoading(false);
//         }

//         if (!authLoading) {
//             if (authUser) fetchData();
//             else setLoading(false); // Not signed in
//         }
//     }, [authLoading]);

//     return { user, isLoading, error };
// }

// // This code is for Login functionlity
// export function useLogin() {
//     const [isLoading, setLoading] = useState(false);
//     const toast = useToast();
//     const navigate = useNavigate();

//     async function login({ email, password, redirectTo = HOME }) {
//         setLoading(true);

//         try {
//             await signInWithEmailAndPassword(auth, email, password);
//             toast({
//                 title: "You are logged in",
//                 status: "success",
//                 isClosable: true,
//                 position: "top",
//                 duration: 5000,
//             });
//             navigate(redirectTo);
//         } catch (error) {
//             toast({
//                 title: "Logging in failed",
//                 description: error.message,
//                 status: "error",
//                 isClosable: true,
//                 position: "top",
//                 duration: 5000,
//             });
//             setLoading(false);
//         } finally {
//             setLoading(false);
//         }
//     }

//     return { login, isLoading };
// }

// // This code is for logout functionlity 
// export function useLogout() {
//     const [signOut, isLoading] = useSignOut(auth);
//     const toast = useToast();
//     const navigate = useNavigate();

//     async function logout() {
//         if (await signOut()) {
//             toast({
//                 title: "Successfully logged out",
//                 status: "success",
//                 isClosable: true,
//                 position: "top",
//                 duration: 5000,
//             });
//             navigate(HOME);
//         }
//         // else {
//         //     toast({
//         //         title: "Having difficulty to logging out of you ",
//         //         status: "warning",
//         //         isClosable: true,
//         //         position: "bottom-left",
//         //         duration: 5000,
//         //     });
//     }

//     return { logout, isLoading };
// }

// // This code is for user register functionlity
// export function useRegister() {
//     const [isLoading, setLoading] = useState(false);
//     const toast = useToast();
//     const navigate = useNavigate();

//     async function register({
//         userName,
//         fullName,
//         email,
//         password,
//         mobNumber,
//         bio,
//         Poems,
//         redirectTo = HOME,
//     }) {
//         setLoading(true);

//         const userNameExists = await isUsernameExists(username);

//         if (userNameExists) {
//             toast({
//                 title: "Username already exists",
//                 status: "error",
//                 isClosable: true,
//                 position: "top",
//                 duration: 5000,
//             });
//             setLoading(false);
//         } else {
//             try {
//                 const res = await createUserWithEmailAndPassword(auth, email, password);

//                 await setDoc(doc(db, "users", res.user.uid), {
//                     id: res.user?.uid,
//                     username: userName.toLowerCase(),
//                     fullName: fullName.toLowerCase(),
//                     mobNumber: mobNumber,
//                     bio: bio,
//                     email: email,
//                     password: password,
//                     Poems,
//                     userPhoto :res.user?.photoURL,
//                     created : new Date(),
//                     avatar: "",
//                 });

//                 toast({
//                     title: "Account created",
//                     description: "You are logged in",
//                     status: "success",
//                     isClosable: true,
//                     position: "top",
//                     duration: 5000,
//                 });

//                 navigate(redirectTo);
//             } catch (error) {
//                 toast({
//                     title: "Signing Up failed",
//                     description: error.message,
//                     status: "error",
//                     isClosable: true,
//                     position: "top",
//                     duration: 5000,
//                 });
//             } finally {
//                 setLoading(false);
//             }
//         }
//     }

//     return { register, isLoading };
// }

