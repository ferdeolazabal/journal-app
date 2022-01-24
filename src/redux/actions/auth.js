import { firebase, googleAuthProvider } from '../../firebase/firebaseConfig';
import { types } from "../types/types"
import { setError } from './ui';

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const startLoginEmailPassword = (email, password) => {
    
    return (dispatch) => {

        setTimeout(() => {
            
            dispatch (login(12345, 'Fernando'));
        }, 3000);
    
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
            // console.log(error);
            dispatch( setError(error.message) );
        };
    };
};