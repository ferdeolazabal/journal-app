import { db } from "../firebase/firebaseConfig"


export const loadNotes = async ( uid ) => {

    const notesSnap = await db.collection(`${ uid }/journal/notes`).get()

    const notes = notesSnap.docs.map( note => ({
        id: note.id,
        ...note.data()
    }));

    return notes
}