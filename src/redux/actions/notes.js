import { db } from '../../firebase/firebaseConfig';
import { loadNotes } from '../../helpers/loadNotes';
import { types } from '../types/types';

export const startNewNote = () => {
    
    return async ( dispatch, getState ) => {
            
        const { uid } = getState().auth

        const newNote = {
                title: '',
                body: '',
                date: new Date().getTime()
        }
        const doc = await db.collection(`${ uid }/journal/notes`).add(newNote)

        dispatch( activeNote( doc.id, newNote ) );
    };
};

export const activeNote = ( id, note ) => ({
    
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = ( uid ) => {
    
    return async ( dispatch ) => {

        const notes = await loadNotes( uid );
        
        dispatch( {
            type: types.notesLoad,
            payload: notes
        } );

    }
}


//-------------------------------------------------------------


export const startDeleteNote = ( id ) => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth

        await db.doc(`${ uid }/journal/notes/${ id }`).delete()
    }
};

export const startEditNote = ( id, updates ) => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth

        await db.doc(`${ uid }/journal/notes/${ id }`).update(updates)
    }
};

export const startSetActiveNote = ( id ) => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth

        const doc = await db.doc(`${ uid }/journal/notes/${ id }`).get()

        dispatch({
            type: 'notesActive',
            payload: {
                id: doc.id,
                ...doc.data()
            }
        })
    }
};
