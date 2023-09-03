import React from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import NewPost from "./Items/NewPost";
import NewStory from "./Items/NewStory";
import NewBlog from "./Items/NewBlog";
import NewQuote from "./Items/NewQuote";

export default function New({ onModalClose }) {
  return (
    <Tabs
      variant="soft-rounded"
      colorScheme="green"
      paddingY={{ base: 5, md: 10 }}
      minW={300}
      maxH="100vh"
      align="center"
      justify="center"
    >
      <TabList>
        <Tab fontSize={{ base: "sm", md: "md" }}>Add Story</Tab>
        <Tab fontSize={{ base: "sm", md: "md" }}>Add Quote</Tab>
        <Tab fontSize={{ base: "sm", md: "md" }}>Add Blog</Tab>
        <Tab fontSize={{ base: "sm", md: "md" }}>Add Post</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <NewStory />
        </TabPanel>
        <TabPanel>
          <NewQuote />
        </TabPanel>
        <TabPanel>
          <NewBlog />
        </TabPanel>
        <TabPanel>
          <NewPost />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}


// import React, { useState } from 'react';
// import { useAuth } from '../../../hooks/auths';
// import { collection, addDoc } from 'firebase/firestore';
// import { storage } from '../../../lib/firebase';
// import { v4 as uuidv4 } from 'uuid'; // Correct import for uuidv4
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import { db } from '../../../lib/firebase'; // Assuming you have correctly initialized your Firebase app

// function NewStory() {
//   const { user } = useAuth();
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleAddStory = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (selectedImage == null) return;

//       const id = uuidv4(); // Generate a UUID
//       const originalFilename = selectedImage.name.replace(/\s+/g, ''); // Remove spaces from the filename
//       const documentId = `${originalFilename}_${id}`; // Create a unique document ID
      
//       const storageRef = collection(db, 'stories');
//       const imageRef = ref(storage, `stories/${documentId}`);

//       await uploadBytes(imageRef, selectedImage).then(async (snap) => {
//         const url = await getDownloadURL(snap.ref);
//         await addDoc(storageRef, {
//           uid: user.id,
//           imageUrl: url,
//           date: new Date(),
//           likes: [],
//         });
//         setSelectedImage(null); // Reset selectedImage after successful upload
//         alert('Story added successfully!');
//       });

//     } catch (error) {
//       alert('Error uploading image: ' + error.message)
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='flex items-center justify-center h-1/2'>
//       <div className='w-full max-w-md p-4 border rounded'>
//         <div className='mb-4'>
//           <h2 className='text-xl font-semibold'>New Story</h2>
//         </div>
//         <form onSubmit={handleAddStory}>
//           <div className='mb-4'>
//             <label className='block mb-1 font-medium'>Image</label>
//             <input
//               type='file'
//               onChange={(event) => setSelectedImage(event.target.files[0])}
//               className='w-full p-1 border rounded'
//             />
//             {!selectedImage && (
//               <p className='text-red-500'>Image is required.</p>
//             )}
//           </div>
//           <button
//             type='submit' // Add type attribute to the button
//             className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'
//           >
//             {loading ? 'Loading...' : 'ADD STORY'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default NewStory;
