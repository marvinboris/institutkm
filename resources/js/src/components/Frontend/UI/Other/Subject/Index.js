import React from 'react';

import './Subject.scss';

export default function Subject({ name, color }) {
    const lang = localStorage.getItem('frontend_lang');

    return <div className='UI Subject'>
        <div className={`bg-${color}`}>{name[lang]}</div>
    </div>
}