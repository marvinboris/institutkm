import React from 'react';
import { Link } from 'react-router-dom';

import './TrainingCategoryBlock.scss';

export default function TrainingCategoryBlock({ name, photo, link }) {
    const lang = localStorage.getItem('frontend_lang');

    return <div className='UI TrainingCategoryBlock'>
        <Link to={link}>
            <div className='embed-responsive embed-responsive-4by3 bg-img' style={{ backgroundImage: `url("${photo}")` }} />

            <div className='name'>
                <span>{name[lang]}</span>
            </div>
        </Link>
    </div>;
}