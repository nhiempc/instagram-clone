import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../../firebase';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { IUser } from '@/models/IUser';

const user : IUser[] = [];

const initialState = {
    user: user
}

export const postsSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createPost(state, action) {
            const newUser:IUser = action.payload
            state.user.push({
                username: newUser.username,
                fullName: newUser.fullName,
                avatar: newUser.avatar
            })
        }
    }
})

export const { createPost } = postsSlice.actions

export default postsSlice.reducer

// thunk functions

export const addFollow = (usernamesession: any, username: any) => async () => {
    await setDoc(doc(db, 'users', usernamesession, 'follow', username), {
        username: username
    });
    await setDoc(doc(db, 'users', username, 'follower', usernamesession), {
        username: usernamesession
    });
}

export const unFollow = (usernamesession: any, username: any) => async () => {
    await deleteDoc(doc(db, 'users', usernamesession, 'follow', username));
    await deleteDoc(
            doc(db, 'users', username, 'follower', usernamesession)
    );
}
