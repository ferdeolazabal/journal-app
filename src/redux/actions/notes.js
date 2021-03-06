import { db } from '../../firebase/firebaseConfig';
import { loadNotes } from '../../helpers/loadNotes';
import { types } from '../types/types';
import { fileUpload } from '../../helpers/fileUpload';
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
        dispatch( addNewNote ( doc.id, newNote ) );
    };
};

export const activeNote = ( id, note ) => ({
    
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const addNewNote = ( id, note ) => ({

    type: types.notesAddNew,
    payload: {
        id, ...note
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
            
            const noteToFirestore = { ...note}
            note.date = new Date().getTime();
            delete noteToFirestore.id;
            // console.log('note en note', noteToFirestore)
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
            dispatch( startLoadingNotes( uid ) );

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

export const startUploadPicture = ( file ) => {
    return async ( dispatch, getState ) => {

        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
            }
        });

        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        dispatch( startUpdateNote( activeNote ) );
        // console.log( fileUrl );
        Swal.close();
    };
};

export const startDeleteNote = ( id ) => {
    return async ( dispatch, getState ) => {
        
        try{
            const { uid } = getState().auth
        
            await db.doc(`${ uid }/journal/notes/${ id }`).delete()
        
            dispatch( deleteNote( id ) );

            // Swal.fire({
            //     icon: 'success',
            //     title: 'Your note has been deleted successfully'
            // })

        } catch ( error ){
            console.log( error );
        }
    }
};

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});


export const notesLogoutCleaning = () => ({
    type: types.notesLogoutCleaning
});


//-------------------------------------------------------------
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
