import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PublicationNav from '../UI/PublicationNav/';
import Loading from '../../../../components/UI/Preloaders/Loading';

import { showPublication, resetPublications } from '../../../../store/actions/frontend/publications';

import './Show.scss';

class Publications extends Component {
    state = { isMounted: false }



    // Lifecycle methods
    componentDidMount() {
        this.setState({ isMounted: true });
        this.props.show(this.props.match.params.category, this.props.match.params.slug);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.category !== this.props.match.params.category || prevProps.match.params.slug !== this.props.match.params.slug) this.props.show(this.props.match.params.category, this.props.match.params.slug);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            frontend: { publications: { loading, publication = {} } }
        } = this.props;
        const { isMounted } = this.state;
        let content;
        const lang = localStorage.getItem('frontend_lang');

        if (!this.state.isMounted) document.title = `${this.props.content.cms.pages.frontend.header.menu.publications} | ${document.head.querySelector('meta[name="base-title"]').content}`;
        
        const { title, description, body, photo, category, subjects } = publication;
        
        if (title) content = <>
            <div className="bg-img" style={{ backgroundImage: `url("${photo}")` }}>
                <div className='wrapper'>
                    <div className='container'>
                        <div className='category'>{category[lang] + (subjects.length > 0 ? ', ' : '')}{subjects.map(subject => subject.name[lang]).join(', ')}</div>

                        <div className="title">{title[lang]}</div>

                        <div className="description">{description[lang]}</div>
                    </div>
                </div>
            </div>

            <section className='publication'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-9'>
                            <div className='content' dangerouslySetInnerHTML={{ __html: body[lang] }} />
                        </div>

                        <div className='col-lg-3'><PublicationNav /></div>
                    </div>
                </div>
            </section>
        </>;


        return <Loading loading={isMounted && loading}>
            <div className="Publications Show">
                {content}
            </div>
        </Loading>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    show: (category, slug) => dispatch(showPublication(category, slug)),
    reset: () => dispatch(resetPublications()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Publications));