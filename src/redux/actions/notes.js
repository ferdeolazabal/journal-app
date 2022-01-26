import { db } from '../../firebase/firebaseConfig';
import { loadNotes } from '../../helpers/loadNotes';
import { types } from '../types/types';
import Swal from 'sweetalert2'


export const startNewNote = () => {
    
    return async ( dispatch, getState ) => {
            
        const { uid } = getState().auth

        const newNote = {
                title: '',
                body: '',
                date: new Date().getTime(),
                url: '',
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

export const startUpdateNote = ( note ) => {
    
    return async ( dispatch, getState ) => {
    
        try{
        
            const { uid } = getState().auth

            if( !note.date ) note.date = new Date().getTime();
            
            const noteToFirestore = { ...note}
            delete noteToFirestore.id;
            
            await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore )
        
            dispatch( refreshNote( note.id, noteToFirestore ) );

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
        
            Toast.fire({
                icon: 'success',
                title: 'Your note has been saved successfully'
            })


        } catch( error ){
            console.log( error );
        };
    };
};

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id, ...note
        }
    }
});



//-------------------------------------------------------------


export const startDeleteNote = ( id ) => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth

        await db.doc(`${ uid }/journal/notes/${ id }`).delete()
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
