// Language!
export const getLanguage = (uid) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();

        var docRef = firestore.collection("language").doc(uid);

        return docRef.get()
            .then((doc) => {
                if (doc.exists) {
                    return doc.data()
                }
            }).catch((err) => {
                console.log(err)
            });
    }
}


export const editLanguage = (id, newLang) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();

        firestore.collection("language").doc(id).update({
            lang: newLang,
        }).then(() => {
            dispatch({ type: "EDIT_LANG" }, newLang)
        }).catch((err) => {
            dispatch({ type: "EDIT_LANG_ERROR" }, err)
        })

    }
}


// Item
export const createItem = (item) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const authorId = getState().firebase.auth.uid;

        firestore.collection("items").add({
            ...item,
            visible: true,
            owner: authorId,
        }).then(() => {
            dispatch({ type: "CREATE_ITEM" }, item)
        }).catch((err) => {
            dispatch({ type: "CREATE_ITEM_ERROR" }, err)
        })

    }
}

export const editItem = (id, item) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();

        return firestore.collection("items").doc(id).update({
            ...item,
        }).then(() => {
            dispatch({ type: "EDIT_ITEM" }, item)
        }).catch((err) => {
            dispatch({ type: "EDIT_ITEM_ERROR" }, err)
        })

    }
}

export const deleteItem = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();

        return firestore.collection("items").doc(id).delete();
    }
}

export const getItem = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();

        var docRef = firestore.collection("items").doc(id);

        return docRef.get()
            .then((doc) => {
                if (doc.exists) {
                    return doc.data()
                }
            }).catch((err) => {
                console.log(err)
            });
    }
}

// Category
export const createCategory = (category) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const authorId = getState().firebase.auth.uid;

        firestore.collection("categories").add({
            ...category,
            visible: true,
            owner: authorId,
        }).then(() => {
            dispatch({ type: "CREATE_CATEGORY" }, category)
        }).catch((err) => {
            dispatch({ type: "CREATE_CATEGORY_ERROR" }, err)
        })

    }
}

export const editCategory = (id, category) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();

        return firestore.collection("categories").doc(id).update({
            ...category,
        }).then(() => {
            dispatch({ type: "EDIT_CATEGORY" }, category)
        }).catch((err) => {
            dispatch({ type: "EDIT_CATEGORY_ERROR" }, err)
        })

    }
}

export const deleteCategory = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();

        return firestore.collection("categories").doc(id).delete();
    }
}

export const getCategory = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();

        var docRef = firestore.collection("categories").doc(id);

        return docRef.get()
            .then((doc) => {
                if (doc.exists) {
                    return doc.data()
                }
            }).catch((err) => {
                console.log(err)
            });
    }
}

// Get menu config using UID
export const getMenuConfig = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();

        var docRef = firestore.collection("menuConfig").doc(id);

        return docRef.get()
            .then((doc) => {
                if (doc.exists) {
                    return doc.data()
                }
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const editMenuConfig = (id, obj) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();

        firestore.collection("menuConfig").doc(id).update({
            ...obj,
        }).then(() => {
            dispatch({ type: "EDIT_MENU_CONFIG" }, obj)
        }).catch((err) => {
            dispatch({ type: "EDIT_MENU_CONFIG_ERROR" }, err)
        })

    }
}

// get Menu config by using the directory path
export const getIdByName = (name) => {

    return async (dispatch, getState, { getFirebase, getFirestore }) => {

        let x = await asyncCall(dispatch, getFirestore, "menuConfig", "path", name);

        return x
    }
}

// Get things for a specific user
export const getByUser = (collection, uid) => {

    return async (dispatch, getState, { getFirebase, getFirestore }) => {

        let x = await asyncCall(dispatch, getFirestore, collection, "owner", uid);

        return x
    }
}

const asyncCall = async (dispatch, getFirestore, collection, param, uid) => {

    const firestore = getFirestore();

    const docRef = firestore.collection(collection).where(param, "==", uid);

    const snap = await docRef.get()

    var res = []
    if (snap.empty) {
        // console.log('No matching documents.');
    } else {
        snap.forEach(doc => {
            res.push({ ...doc.data(), id: doc.id})
        });
    }

    return res
}