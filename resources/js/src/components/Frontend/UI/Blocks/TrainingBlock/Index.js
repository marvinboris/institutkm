import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Logo from '../../../../UI/Logo';

import './TrainingBlock.scss';

export default function TrainingBlock({ photo, title, category, link = '/', level }) {
    const lang = localStorage.getItem('frontend_lang');

    return <div className='UI TrainingBlock'>
        <Link to={link} className='embed-responsive embed-responsive-16by9 bg-img' style={{ backgroundImage: `url("${photo}")` }}>
            <div className='logo'>
                <Logo />
            </div>
        </Link>

        <div className='text'>
            <Link to={link} className='title'>{title[lang]}</Link>

            <div className='category'>{level.name[lang] + ', '}{category.name[lang]}</div>
        </div>
    </div>;
}