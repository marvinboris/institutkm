import React, { Component } from 'react';

import Toolbar from '../../components/Frontend/Navigation/Toolbar';
import Footer from '../../components/Frontend/Footer';

import './Frontend.scss';

export default ({ children }) => <div className="Frontend">
    <Toolbar />

    <div className='main'>{children}</div>

    <Footer />
</div>;
