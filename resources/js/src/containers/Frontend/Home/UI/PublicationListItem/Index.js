import React from 'react';

import Subject from '../../../../../components/Frontend/UI/Other/Subject';

import './PublicationListItem.scss';

export default function PublicationListItem({ title, photo, subjects = [] }) {
    const lang = localStorage.getItem('frontend_lang');

    return <div className='UI PublicationListItem'>
        <div className='photo'>
            <div className='embed-responsive embed-responsive-4by3 bg-img' style={{ backgroundImage: `url("${photo}")` }} />
        </div>

        <div className='info'>
            <div className='header'>
                {subjects.map(item => <Subject key={JSON.stringify(`PublicationListItem-Subject-${JSON.stringify(item)}`)} {...item} />)}
            </div>

            <div className='title'>{title[lang]}</div>
        </div>
    </div>
}