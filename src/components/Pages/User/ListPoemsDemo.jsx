import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useAuth } from '../../../hooks/auths';
import formatTimeDifference from '../../../assets/formatTimeDifference';

function ListPoemsDemo() {
  const { user } = useAuth();
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userPoemsCollectionRef = collection(db, `users/${user?.uid}/poems`);
    
    // Set up a real-time listener for the poem collection
    const unsubscribe = onSnapshot(userPoemsCollectionRef, (querySnapshot) => {
      const userPoemsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPoems(userPoemsArray);
      setLoading(false);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [user]);

  return (
    <div className='flex flex-col gap-5'>
      <h2>User's Poems</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className=''>
          {poems?.map((poem) => (
            <li className='flex border-2 rounded flex-col gap-2 p-5' key={poem.id}>
              <h3>{poem?.poemTitle}</h3>
              <p>{poem?.poemDesc}</p>
              <h1>{poem?.author}</h1>
              <h1>{formatTimeDifference(poem?.created)}</h1>
              {/* Render other poem details here */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


export default ListPoemsDemo;
