import { IPost } from '@/models/IPost';
import { createSlice } from '@reduxjs/toolkit';
import { db, storage } from '../../../firebase';
import { addDoc, collection, deleteDoc, doc, DocumentData, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

const posts : IPost[] = [];

const initialState = {
    posts: posts
}

export const postsSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        createPost(state, action) {
            const newPost:IPost = action.payload
            state.posts.push({
                id: newPost.id,
                caption: newPost.caption,
                image: newPost.image,
                profileImg: newPost.profileImg,
                username: newPost.username
            })
        }
    }
})

export const { createPost } = postsSlice.actions

export default postsSlice.reducer

// thunk functions
export const addCommentToPost = (id: any, data: any) => async () => {
    await addDoc(collection(db, 'posts', id, 'comments'), data);
}

export const deletePost = (id: any) => async () => {
    const queryComments = query(
        collection(db, 'posts', id, 'comments')
    );
    const queryLikes = query(collection(db, 'posts', id, 'likes'));
    const imgRef = ref(storage, `post/${id}/image`);
    onSnapshot(queryComments, (snapshot) =>
        snapshot.docs.forEach((d) =>
            deleteDoc(doc(db, 'posts', id, 'comments', d.id))
        )
    );
    onSnapshot(queryLikes, (snapshot) =>
        snapshot.docs.forEach((d) =>
            deleteDoc(doc(db, 'posts', id, 'likes', d.id))
        )
    );
    await deleteObject(imgRef)
        .then(() => {
            // File deleted successfully
        })
        .catch((error) => {
            // Uh-oh, an error occurred!
        });
    await deleteDoc(doc(db, 'posts', id));
}

export const likePost = (id: any, username: any) => async () => {
    await setDoc(doc(db, 'posts', id, 'likes', username), {
        username: username
    });
}
export const unLikePost = (id: any, username: any) => async () => {
    await deleteDoc(doc(db, 'posts', id, 'likes', username));
}