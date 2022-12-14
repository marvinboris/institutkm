import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Logo from '../../../../components/UI/Logo';

import './Layout.scss';

class Layout extends Component {
    render() {
        const {
            content: {
                cms: { pages: { auth: { footer } } }
            },
            children,
        } = this.props;

        return <div className='Auth User Layout'>
            <header>
                <div className='container'>
                    <Logo type="named" />
                </div>
            </header>

            <main className='flex-fill'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-4'>{children}</div>
                    </div>
                </div>
            </main>

            <footer>
                <div className='container'>
                    <div><i className={`far fa-copyright fa-fw text-14 text-md-16 text-xl-18 text-${window.APP_SECONDARY_COLOR}`} /> {footer.copyrights} {(new Date()).getFullYear()}. {footer.all_rights} <span className='special'><Logo type='named' /></span></div>
                </div>
            </footer>
        </div>
    }
}

const mapStateToProps = state => ({ ...state });

export default withRouter(connect(mapStateToProps)(Layout));