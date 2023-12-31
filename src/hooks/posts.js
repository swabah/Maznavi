import { useToast } from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import {  arrayRemove, arrayUnion, collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { useCollectionData } from 'react-firebase-hooks/firestore'



export function useAddQuote() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();

    async function addQuote(Quote) {
        setLoading(true);
        const id = uuidv4();
        await setDoc(doc(db, "quotes", id), {
            ...Quote,
            id,
            created:new Date(),
            likes: [],
        });
        toast({
            title: "Quote added successfully!",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 5000,
        });
        setLoading(false);
    }

    return { addQuote, isLoading };
}

export function useBlogs(uid = null) {
    const q = uid
        ? query(
            collection(db, "blogs"),
            orderBy("created", "desc"),
            where("uid", "==", uid)
        )
        : query(collection(db, "blogs"), orderBy("created", "desc"));
    const [Blogs, isBlogLoading, isError] = useCollectionData(q);
    if (isError) throw isError;
    return { Blogs, isBlogLoading ,isError};
}
export function useWhatsNew( ) {
    const q =  query(collection(db, "whatsnew"), orderBy("created", "desc"));
    const [whatsNew, iswhatsNewLoading, isError] = useCollectionData(q);
    if (isError) throw isError;
    return { whatsNew, iswhatsNewLoading ,isError};
}
export function useArticles(uid = null) {
    const q = uid
      ? query(
          collection(db, 'Articles'),
          orderBy('created', 'desc'),
          where('uid', '==', uid)
        )
      : query(collection(db, 'Articles'), orderBy('created', 'desc'));
    const [Articles, isArticleLoading, error] = useCollectionData(q);
    if (error) throw error;
    return { Articles, isArticleLoading };
  }
export function useQuotes(uid = null) {
    const q = uid
      ? query(
          collection(db, 'quotes'),
          orderBy('date', 'desc'),
          where('uid', '==', uid)
        )
      : query(collection(db, 'quotes'), orderBy('created', 'desc'));
    const [quotes, isLoading, error] = useCollectionData(q);
    const transformedQuotes = quotes ? quotes.map(quotes => ({
        id: quotes.id,
        quote: quotes.quote,
        Quote_writer: quotes.Quote_writer,
        // ... include other properties if needed
      })) : [];

      if (error) throw error;
      return { quotes: transformedQuotes, isLoading };
  }
export function usePoems() {
    const [Poems, setPoems] = useState([]);
    const [isPoemLoading, setIsPoemLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const q = query(collection(db, 'Poems'), orderBy('created', 'desc'));
          const querySnapshot = await getDocs(q);
          const poemsData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setPoems(poemsData);
          setIsPoemLoading(false);
        } catch (err) {
          setError(err);
          setIsPoemLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return { Poems, isPoemLoading, error };
  }
  


export function useBlogToggleLike({ id, isLiked, uid }) {
    const [isLoading, setLoading] = useState(false);
    async function toggleBlogLike() {
        setLoading(true);
        const docRef = doc(db, "blogs", id);
        await updateDoc(docRef, {
            likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
        });
        setLoading(false);
    }
    return { toggleBlogLike, isLoading };
}
export function useStoryToggleLike({ id, isLiked, uid }) {
    const [isLoading, setLoading] = useState(false);
    async function toggleStoryLike() {
        setLoading(true);
        const docRef = doc(db, "stories", id);
        await updateDoc(docRef, {
            likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
        });
        setLoading(false);
    }
    return { toggleStoryLike, isLoading };
}
export function useArticleToggleLike({ id, isLiked, uid }) {
    const [isLoading, setLoading] = useState(false);
    async function toggleArticleLike() {
        setLoading(true);
        const docRef = doc(db, "Articles", id);
        await updateDoc(docRef, {
            likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
        });
        setLoading(false);
    }
    return { toggleArticleLike, isLoading };
}
export function usePoemToggleLike({ id, isLiked, uid }) {
    const [isLoading, setLoading] = useState(false);
    async function togglePoemLike() {
        setLoading(true);
        const docRef = doc(db, "Poems", id);
        await updateDoc(docRef, {
            likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
        });
        setLoading(false);
    }
    return { togglePoemLike, isLoading };
}


export function useDeleteQuote(id) {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    async function deleteQuote() {
        const res = window.confirm("Are you sure you want to delete this Quote?");
        if (res) {
            setLoading(true);
            // Delete Poem document
            await deleteDoc(doc(db, "quotes", id));
            toast({
                title: "Quote deleted!",
                status: "info",
                isClosable: true,
                position: "top",
                duration: 5000,
            });
            setLoading(false);
        }
    }
    return { deleteQuote, isLoading };
}
export function useDeleteBlog(id) {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    async function deleteBlog() {
        const res = window.confirm("Are you sure you want to delete this Blog?");
        if (res) {
            setLoading(true);
            // Delete Poem document
            await deleteDoc(doc(db, "blogs", id));
            toast({
                title: "Blog deleted!",
                status: "info",
                isClosable: true,
                position: "top",
                duration: 5000,
            });
            setLoading(false);
        }
    }
    return { deleteBlog, isLoading };
} 
export function useDeleteArticle(id) {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    async function deleteArticle() {
        const res = window.confirm("Are you sure you want to delete this Article?");
        if (res) {
            setLoading(true);
            // Delete Poem document
            await deleteDoc(doc(db, "Articles", id));
            toast({
                title: "Article deleted!",
                status: "info",
                isClosable: true,
                position: "top",
                duration: 5000,
            });
            setLoading(false);
        }
    }
    return { deleteArticle, isLoading };
}
export function useDeletePoem(id) {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    async function deletePoem() {
        const res = window.confirm("Are you sure you want to delete this Poem?");
        if (res) {
            setLoading(true);
            // Delete Poem document
            await deleteDoc(doc(db, "Poems", id));
            toast({
                title: "Poem deleted!",
                status: "info",
                isClosable: true,
                position: "top",
                duration: 5000,
            });
            setLoading(false);
        }
    }
    return { deletePoem, isLoading };
}


  