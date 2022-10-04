import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Logo from '../../UI/Logo';

import './Footer.scss';

const Block = ({ title, side, children }) => <div className={`col ${side}`}>
    <div className='title'>{title}</div>

    <div className='body'>{children}</div>
</div>;

class Footer extends Component {
    render() {
        const {
            content: {
                cms: {
                    global: { app_name, company_name }, pages: { frontend: { footer: cms } }
                }, trainings, gallery_image
            }
        } = this.props;
        const lang = localStorage.getItem('frontend_lang');

        return <div className='Footer'>
            <div className='top'>
                <div className='container'>
                    <div className='row'>
                        <Block title={cms.top.navigation.title} side='left order-1 order-lg-0'>
                            <div><Link to={'/'}>{cms.top.navigation.menu.home}</Link></div>
                            <div><Link to={'/about'}>{cms.top.navigation.menu.about}</Link></div>
                            <div><Link to={'/trainings'}>{cms.top.navigation.menu.trainings}</Link></div>
                            <div><Link to={'/publications'}>{cms.top.navigation.menu.publications}</Link></div>
                            <div><Link to={'/contact'}>{cms.top.navigation.menu.contact}</Link></div>
                        </Block>

                        <Block title={cms.top.gallery.title} side='left order-2 order-lg-1'>
                            <Link to={'/gallery'}>
                                <div className='embed-responsive embed-responsive-1by1 bg-img' style={{ backgroundImage: `url("${gallery_image}")` }} />
                                <div className='go-to-gallery'>{cms.top.gallery.go_to_gallery}</div>
                            </Link>
                        </Block>

                        <div className='col-lg-4 center order-0 order-lg-2'>
                            <div className='logo'><Logo /></div>

                            <div className='title'>{company_name}</div>

                            <div className='body'>
                                <div className='address'>{cms.top.institute.address}</div>
                                <div className='phone'><a href={`tel:${cms.top.institute.phone}`}>{cms.top.institute.phone}</a></div>
                            </div>
                        </div>

                        <div className='col-lg-4 right order-3 order-lg-3'>
                            <div className='title'>{cms.top.trainings.title}</div>

                            <div className='body'>
                                <div className='row'>
                                    {trainings.map(training => <div key={JSON.stringify(training)} className="col-6"><Link to={training.link}>{training.name[lang]}</Link></div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bottom'>
                <div className='container'>
                    <div>
                        <div>© {(new Date()).getFullYear()} <Link className='app-name' to='/'>{app_name}</Link></div>
                        <div>{cms.bottom.all_rights} {company_name}</div>
                    </div>

                    <div className='social-networks'>{cms.bottom.social_networks.map(social_network => <a key={JSON.stringify(social_network)} href={social_network.link} target='_blank'><i className={`fab fa-${social_network.icon}`} /></a>)}</div>
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Footer);