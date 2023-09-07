import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuth } from '../../../hooks/auths';

export function usePoemsDemo() {
  const {user} = useAuth()
    const q =  query(
      collection(db, `users/${user?.uid}/poems`),
      orderBy('created','desc')
    ) 
  const [poems ,isPoemLoading, error] = useCollectionData(q)
  return {poems ,isPoemLoading, error}
  
}
