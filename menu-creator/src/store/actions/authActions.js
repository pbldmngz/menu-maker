export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        });

    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then(resp => {

            firestore.collection('menuConfig').doc(resp.user.uid).set({
                colorPalette: {
                    header: "#e2b22b",
                    title: "#262626",
                    blockTitle: "#e2b22b",
                    background: "#1b1b1b",
                    category: "#262626",
                    text: "beige",
                },
                name: "default",
                path: resp.user.uid,
                logoURL: "https://chaitanyahr.com/wp-content/uploads/2015/02/logo_dummy.png",
            });

            return firestore.collection('users').doc(resp.user.uid).set({
                name: newUser.nombre,
                subscribed: false,
            });
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err });
        });
    }
}

const createDateBefore = () => {
    var oneMonth = new Date()
    oneMonth.setDate(oneMonth.getDate() - 30)

    return oneMonth
}