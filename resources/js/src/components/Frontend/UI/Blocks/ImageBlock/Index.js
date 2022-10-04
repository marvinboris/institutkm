import React from 'react';

import Logo from '../../../../UI/Logo';

import './ImageBlock.scss';

export default function ImageBlock({ src }) {
    return <div className='UI ImageBlock'>
        <div className='embed-responsive embed-responsive-1by1 bg-img' style={{ backgroundImage: `url("${src}")` }}>
            <div className='logo'>
                <Logo />
            </div>
        </div>
    </div>;
}