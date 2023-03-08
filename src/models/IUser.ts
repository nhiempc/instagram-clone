export type IUser = {
    id?: string;
    username: string;
    fullName: string;
    avatar: string;
};
export const initUser = (): IUser => {
    return{
        id: '1',
        username: 'nhiempc',
        fullName: 'Nguyễn Văn Nhiệm',
        avatar: '/_next/static/media/avatar.7f76d32f.jpg'
    }
} 