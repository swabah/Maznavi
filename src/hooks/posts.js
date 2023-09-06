import { useToast } from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import {  arrayRemove, arrayUnion, collection, deleteDoc, doc, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
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
            date: Date.now(),
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
export function useAddPoem() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    async function addPoem(Poem) {
        setLoading(true);
        const id = uuidv4();
        const date = new Date()
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        await setDoc(doc(db, "Poems", id), {
            ...Poem,
            id,
            created: { date: formattedDate, time: formattedTime },
            likes: [],
        });
        toast({
            title: "Poem added successfully!",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 5000,
        });
        setLoading(false);
    }
    return { addPoem, isLoading };
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
export function useStories(uid = null) {
    const q = uid
        ? query(
            collection(db, "stories"),
            orderBy("created", "desc"),
            where("uid", "==", uid)
        )
        : query(collection(db, "stories"), orderBy("created", "desc"));
    const [stories, isStoryLoading, isError] = useCollectionData(q);
    if (isError) throw isError;
    return { stories, isStoryLoading ,isError};
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
      : query(collection(db, 'quotes'), orderBy('date', 'desc'));
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
export function usePoems(uid = null) {
    const q = uid
      ? query(
          collection(db, 'Poems'),
          orderBy('created', 'desc'),
          where('uid', '==', uid)
        )
      : query(collection(db, 'Poems'), orderBy('created', 'desc'));
    const [Poems, isPoemLoading, error] = useCollectionData(q);
    const transformedPoems = Poems ? Poems.map(Poem => ({
        id: Poem.id,
        author: Poem.author,
        title: Poem.title,
        desc: Poem.desc,
        PhotoUrl : Poem.PhotoUrl,
        date: Poem.created.date,
        // ... include other properties if needed
      })) : [];
    
      if (error) throw error;
      return { Poems: transformedPoems, isPoemLoading };
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
            await deleteDoc(doc(db, "stories", id));
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
export function useDeleteStory(id) {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    async function deleteStory() {
        const res = window.confirm("Are you sure you want to delete this Story?");
        if (res) {
            setLoading(true);
            // Delete Poem document
            await deleteDoc(doc(db, "stories", id));
            toast({
                title: "Story deleted!",
                status: "info",
                isClosable: true,
                position: "top",
                duration: 5000,
            });
            setLoading(false);
        }
    }
    return { deleteStory, isLoading };
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


  