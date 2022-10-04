import React from 'react';
import { Link } from 'react-router-dom';

import './ViewAll.scss';

export default function ViewAll({ link, children }) {
    return <div className='UI ViewAll'>
        <Link to={link} className={'btn btn-outline-' + window.APP_PRIMARY_COLOR}>{children}</Link>
    </div>
}