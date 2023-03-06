export type IPost = {
    id: string;
    caption: string;
    image: string;
    profileImg: string;
    timestamp?: string;
    username: string;
};

export const initPost = (): IPost => {
    return{
        id: '',
        caption: '',
        image: '',
        profileImg: '',
        timestamp: '',
        username: '',
    }
} 