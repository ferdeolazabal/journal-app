import { firebase, googleAuthProvider } from '../../firebase/firebaseConfig';
import { types } from "../types/types"
import { setError, startLoading, finishLoading } from './ui';
import Swal from 'sweetalert2'
import { notesLogoutCleaning } from './notes';


export const startLoginEmailPassword = (email, password) => {

    return async (dispatch) => {

        try{
            
            dispatch( startLoading() )

            const { user } = await firebase.auth().signInWithEmailAndPassword(
                email, 
                password
            )

            dispatch ( login( user.uid, user.displayName ) );
            dispatch( finishLoading() )
        
        } catch(error){
            dispatch( setError(error.message) );
            dispatch( finishLoading())
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            });
        };
    };
};

export const startLoginGoogle = () => {

    return ( dispatch ) => {

    firebase.auth().signInWithPopup(googleAuthProvider)
        .then( ({ user }) => {
            dispatch( 
                login(user.uid, user.displayName) 
            );
        })

    };
};

export const startRegisterWithEmailPasswordName = (name, email, password) => {

    return async (dispatch) => {
        try {
            const { user } = await firebase.auth().createUserWithEmailAndPassword(
                email, 
                password
                );
                
            await user.updateProfile({ displayName: name });            
            dispatch ( login(user.uid, user.displayName) );
                
            // ALT
            // await firebase.firestore().collection('users').doc(user.uid).set({
            //     name,
            //     email
            // });
            // dispatch( login(user.uid, name) );

        } catch (error) {
            dispatch( setError(error.message) );
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            });
        };
    };
};

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const startLogout = () => {
    return async (dispatch) => {
        try {
            
            await firebase.auth().signOut();
            
            dispatch( logout() );
            dispatch( notesLogoutCleaning() );
            Swal.fire({
                icon: 'success',
                title: 'You have been logged out successfully'
            });

        } catch (error) {
            dispatch( setError(error.message) );
        };
    };
}

export const logout = () => ({
    type: types.logout
})