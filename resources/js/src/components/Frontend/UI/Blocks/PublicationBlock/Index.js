import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Logo from '../../../../UI/Logo';

import './PublicationBlock.scss';

export default function PublicationBlock({ photo, title, description, category, link = '/', subjects }) {
    const lang = localStorage.getItem('frontend_lang');

    return <div className='UI PublicationBlock'>
        <Link to={link} className='embed-responsive embed-responsive-16by9 bg-img' style={{ backgroundImage: `url("${photo}")` }}>
            <div className='logo'>
                <Logo />
            </div>
        </Link>

        <div className='text'>
            <div className='category'>{category[lang] + (subjects.length > 0 ? ', ' : '')}{subjects.map(subject => subject.name[lang]).join(', ')}</div>

            <Link to={link} className='title'>{title[lang]}</Link>

            <div className='description' dangerouslySetInnerHTML={{ __html: description[lang] }} />
        </div>
    </div>;
}