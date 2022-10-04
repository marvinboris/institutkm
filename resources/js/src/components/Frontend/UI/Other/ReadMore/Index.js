import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './ReadMore.scss';

class ReadMore extends Component {
    render() {
        const {
            content: { cms: { pages: { frontend: { components: { section: { read_more } } } } } },
            link, children
        } = this.props;

        return <div className='UI ReadMore'>
            <Link to={link} className={`btn btn-outline-${window.APP_PRIMARY_COLOR}`}>
                <div className='text'>{children || read_more}</div>

                <i className='fas fa-angle-right' />
            </Link>
        </div>
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(ReadMore);