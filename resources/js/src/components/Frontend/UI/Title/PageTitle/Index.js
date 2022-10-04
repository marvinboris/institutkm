import React from 'react';

import './PageTitle.scss';

export default ({ title, subtitle, photo = '/images/aviv-rachmadian-7F7kEHj72MQ-unsplash.jpg' }) => <div className='PageTitle' style={{ backgroundImage: `linear-gradient(var(--color-primary-70), var(--color-primary-70)), url('${photo}')` }}>
    <div className='container'>
        <div className='title'>{title}</div>

        <div className='subtitle'>{subtitle}</div>
    </div>
</div>;