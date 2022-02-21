import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where, orderBy } from 'firebase/firestore'

const useGetCollection = (col, params = {}) => {
  const { currentUser } = useAuthContext()

  const colRef = collection(db, col)

  const queryKey = params.fetchOnlyCurrentUser
    ? [col, currentUser.uid]
    : params.album
    ? [col, params.album]
    : [col]

  const queryRef = params.fetchOnlyCurrentUser
    ? query(
        colRef,
        where('user', '==', currentUser.uid),
        orderBy('created', 'desc'),
      )
    : params.album
    ? query(
        colRef,
        where('album', '==', params.album),
        orderBy('created', 'desc'),
      )
    : query(colRef, orderBy('created', 'desc'))

  const colQuery = useFirestoreQueryData(
    queryKey,
    queryRef,
    {
      idField: '_id',
      subscribe: true,
    },
    {
      refetchOnMount: 'always',
    },
  )

  return colQuery
}

export default useGetCollection
