import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loading from '../../../components/UI/Preloaders/Loading';

import PageTitle from '../../../components/Frontend/UI/Title/PageTitle';
import SectionTitle from '../../../components/Frontend/UI/Title/SectionTitle';

import { getAbout, resetAbout } from '../../../store/actions/frontend/about';

import './About.scss';

class About extends Component {
    state = {
        isMounted: false,
    }



    // Lifecycle methods
    componentDidMount() {
        this.props.get();
        this.setState({ isMounted: true });
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: {
                cms: {
                    pages: { frontend: { pages: { about: cms } } }
                },
            },
            frontend: { about: { loading } }
        } = this.props;
        const { isMounted } = this.state;

        if (!this.state.isMounted) document.title = `${this.props.content.cms.pages.frontend.header.menu.about} | ${document.head.querySelector('meta[name="base-title"]').content}`;

        return <Loading loading={isMounted && loading}>
            <div className="About">
                <PageTitle {...cms} />

                <section className='word'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-3'>
                                <img src={cms.word.photo} className="img-fluid" />
                            </div>

                            <div className='col-lg-9 mt-3 mt-lg-0 text'>
                                <SectionTitle {...cms.word} />

                                <p dangerouslySetInnerHTML={{ __html: cms.word.description }} />
                            </div>
                        </div>
                    </div>
                </section>

                <section className='about'>
                    <div className='container'>
                        <SectionTitle {...cms.about} />

                        <div dangerouslySetInnerHTML={{ __html: cms.about.description }} />
                    </div>
                </section>
            </div>
        </Loading>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: () => dispatch(getAbout()),
    reset: () => dispatch(resetAbout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(About));