import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loading from '../../../components/UI/Preloaders/Loading';

import PageTitle from '../../../components/Frontend/UI/Title/PageTitle';

import PublicationView from './UI/PublicationView';
import PublicationNav from './UI/PublicationNav';

import { getPublications, resetPublications } from '../../../store/actions/frontend/publications.js';

import './Publications.scss';

class Publications extends Component {
    state = { isMounted: false }



    // Lifecycle methods
    componentDidMount() {
        this.setState({ isMounted: true })
        this.props.get(this.props.match.params.category);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: { cms: {
                pages: { frontend: { pages: { publications: cms } } }
            } },
            frontend: { publications: { loading, publications = [] } }
        } = this.props;
        const { isMounted } = this.state;

        if (!this.state.isMounted) document.title = `${this.props.content.cms.pages.frontend.header.menu.publications} | ${document.head.querySelector('meta[name="base-title"]').content}`;

        const publicationsContent = publications.map(publication => <PublicationView key={JSON.stringify(publication)} {...publication} />);

        return <Loading loading={isMounted && loading}>
            <div className="Publications">
                <PageTitle {...cms} />

                <section className='publications'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-9'>{publicationsContent}</div>

                            <div className='col-lg-3'><PublicationNav /></div>
                        </div>
                    </div>
                </section>
            </div>
        </Loading>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: category => dispatch(getPublications(category)),
    reset: () => dispatch(resetPublications()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Publications));