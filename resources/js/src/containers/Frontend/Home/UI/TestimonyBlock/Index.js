import React from 'react';

import './TestimonyBlock.scss';

export default function TestimonyBlock({ body, name, photo }) {
    return <div className='UI TestimonyBlock'>
        <div>
            <div className='img'>
                <div className='bg-img' style={{ backgroundImage: `url("${photo}")` }} />
            </div>
        </div>

        <div className='text'>
            <div className='name'>{name}</div>
        </div>

        <div className='body'>{body}</div>
    </div>;
}