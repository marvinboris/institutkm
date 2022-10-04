import React from 'react';

import './SectionTitle.scss';

const SectionTitle = ({ head, title, subtitle, centered }) => {
    let i = 0

    return <div className={`SectionTitle${centered ? " centered" : ""}`}>
        <div className='text'>
            {head && <div className='super'>{head}</div>}

            {title && <div className='title'>{title}</div>}

            {subtitle && <div className='subtitle'>
                {subtitle}
            </div>}
        </div>
    </div>;
};

export default SectionTitle;