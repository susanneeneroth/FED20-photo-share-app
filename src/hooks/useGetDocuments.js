import { db } from '../firebase'
import { collection, doc } from 'firebase/firestore'
import { useFirestoreDocumentData } from '@react-query-firebase/firestore'

const useGetDocuments = (col, docName, id) => {
  const collectionRef = collection(db, col)
  const documentRef = doc(collectionRef, id)

  const docQuery = useFirestoreDocumentData(
    [docName, id],
    documentRef,
    {
      subscribe: true,
    },
    {
      refetchOnMount: 'always',
    },
  )
  return docQuery
}

export default useGetDocuments
