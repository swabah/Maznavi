import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useAuth } from '../../../hooks/auths';

export default async function useDemo() {
  const { user } = useAuth();

  try {
    const q = query(collection(db, `users/${user?.uid}/poems`), orderBy('created', 'desc'));
    const querySnapshot = await getDocs(q);

    const poems = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return poems;
  } catch (error) {
    console.error('Error fetching poems:', error);
    throw error;
  }
}
