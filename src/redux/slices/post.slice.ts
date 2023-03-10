import { IPost } from '@/models/IPost';
import { createSlice } from '@reduxjs/toolkit';
import { db, storage } from '../../../firebase';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, setDoc } from 'firebase/firestore';
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

export const deletePost = (id: any, username?: any) => async () => {
    const queryComments = query(
        collection(db, 'posts', id, 'comments')
    );
    const queryLikes = query(collection(db, 'posts', id, 'likes'));
    await deleteDoc(doc(db, 'users', username, 'save', id))
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

export const likePost = (postId: string, username: string) => async () => {
    await setDoc(doc(db, 'posts', postId, 'likes', username), {
        username: username
    });
}
export const unLikePost = (postId: string, username: string) => async () => {
    await deleteDoc(doc(db, 'posts', postId, 'likes', username));
}

export const savePost = (postId: string, username: string) => async () => {
    await setDoc(doc(db, 'users', username, 'save', postId), {
        postId: postId
    });
}

export const unSavePost = (postId: string, username: string) => async () => {
    await deleteDoc(doc(db, 'users', username, 'save', postId));
}