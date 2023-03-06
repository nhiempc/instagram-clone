import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpenCreatePostModal: false,
    isOpenEditPostModal: false,
    isOpenPublicModal: false,
    isOpenPersonalModal: false,
    isOpenLikeCountModal: false
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        toggleCreatePostModal(state, action) {
            state.isOpenCreatePostModal = action.payload
        },
        toggleEditPostModal(state, action) {
            state.isOpenEditPostModal = action.payload
        },
        togglePublicModal(state, action) {
            state.isOpenPublicModal = action.payload
        },
        togglePersonalModal(state, action) {
            state.isOpenPersonalModal = action.payload
        },
        toggleLikeCountModal(state, action) {
            state.isOpenLikeCountModal = action.payload
        }
    }
})

export const { toggleCreatePostModal, toggleEditPostModal, togglePublicModal, togglePersonalModal, toggleLikeCountModal } = modalSlice.actions

export default modalSlice.reducer
