import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loading from '../../../components/UI/Preloaders/Loading';

import PageTitle from '../../../components/Frontend/UI/Title/PageTitle';
import SectionTitle from '../../../components/Frontend/UI/Title/SectionTitle';

import ImageBlock from '../../../components/Frontend/UI/Blocks/ImageBlock';

import { getGallery, resetGallery } from '../../../store/actions/frontend/gallery';

import './Gallery.scss';

class Gallery extends Component {
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
                    pages: { frontend: { pages: { gallery: cms } } }
                },
            },
            frontend: { gallery: { loading, gallery = [] } }
        } = this.props;
        const { isMounted } = this.state;

        if (!this.state.isMounted) document.title = `${this.props.content.cms.pages.frontend.header.menu.gallery} | ${document.head.querySelector('meta[name="base-title"]').content}`;

        const galleryContent = gallery.map(item => <ImageBlock key={`ImageBlock-${JSON.stringify(item)}`} src={item.src} />);

        return <Loading loading={isMounted && loading}>
            <div className="Gallery">
                <PageTitle {...cms} />

                <section className='gallery'>
                    <div className='container'>
                        <div className='content'>
                            {galleryContent}
                        </div>
                    </div>
                </section>
            </div>
        </Loading>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: () => dispatch(getGallery()),
    reset: () => dispatch(resetGallery()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Gallery));