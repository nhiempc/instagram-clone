import React from 'react';
import style from './Stories.module.css';

type StoryProps = {
    img: string;
    username: string;
};

const StoryItem: React.FunctionComponent<StoryProps> = ({ img, username }) => {
    return (
        <div
            className={`${style.story_item} flex flex-col items-center cursor-pointer`}
        >
            <div className={`${style.image_border} relative`}>
                <img
                    src={img}
                    alt={username}
                    className='rounded-full border-white border-[2px]'
                />
            </div>
            <p>{username.toLowerCase()}</p>
        </div>
    );
};

export default StoryItem;
