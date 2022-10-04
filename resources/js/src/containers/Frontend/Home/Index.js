import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

// Preloaders
import Loading from '../../../components/UI/Preloaders/Loading';

// UI Components
import Banner from './UI/Banner';
import ViewAll from './UI/ViewAll';
import TestimonyBlock from './UI/TestimonyBlock';
import TrainingCategoryBlock from './UI/TrainingCategoryBlock';
import ImageBlock from '../../../components/Frontend/UI/Blocks/ImageBlock';
import SectionTitle from '../../../components/Frontend/UI/Title/SectionTitle';
import TrainingBlock from '../../../components/Frontend/UI/Blocks/TrainingBlock';
import PublicationBlock from '../../../components/Frontend/UI/Blocks/PublicationBlock';
import OwlCarousel from '../../../components/UI/OwlCarousel';

import { getHome, resetHome } from '../../../store/actions/frontend/home';

import './Home.scss';

class Home extends Component {
    state = { isMounted: false, activePublicationIndex: 0 }



    // Component methods


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
                    pages: { frontend: { pages: { home: cms } } }
                },
            },
            frontend: { home: { loading, banner_publications = [], training_categories = [], testimonies = [], publications = [], trainings = [], gallery = [] } }
        } = this.props;
        const { isMounted } = this.state;
        const lang = localStorage.getItem('frontend_lang');

        if (!this.state.isMounted) document.title = `${document.head.querySelector('meta[name="base-title"]').content}`;

        const trainingCategoriesContent = training_categories.map(item => <div key={`TrainingCategoryBlock-${JSON.stringify(item)}`} className='col-md-4 col-lg-3'><TrainingCategoryBlock {...item} /></div>);
        const trainingsContent = trainings.map(item => <div key={`TrainingBlock-${JSON.stringify(item)}`} className='col-lg-3'><TrainingBlock {...item} /></div>);
        const galleryContent = gallery.map(item => <ImageBlock key={`ImageBlock-${JSON.stringify(item)}`} src={item.src} />);
        const testimoniesContent = testimonies.map(item => <TestimonyBlock key={`TestimonyBlock-${JSON.stringify(item)}`} {...{ ...item, body: item.body[lang] }} />);
        const publicationListContent = publications.map(item => <div key={`PublicationBlock-${JSON.stringify(item)}`} className='col-lg-4'><PublicationBlock  {...item} /></div>);

        return <Loading loading={isMounted && loading}>
            <div className="Home">
                <Banner banner_publications={banner_publications} />

                <section className='training-categories'>
                    <div className='container'>
                        <div className='row'>{trainingCategoriesContent}</div>
                    </div>
                </section>

                <section className='trainings'>
                    <div className='container'>
                        <SectionTitle {...cms.trainings} />

                        <div className='row'>
                            {trainingsContent}
                        </div>

                        <ViewAll link='/trainings'>{cms.trainings.view_all}</ViewAll>
                    </div>
                </section>

                <section className='gallery'>
                    <div className='container'>
                        <SectionTitle {...cms.gallery} />

                        <div className='content'>
                            {galleryContent}
                        </div>

                        <ViewAll link='/gallery'>{cms.gallery.view_all}</ViewAll>
                    </div>
                </section>

                <section className='testimonies'>
                    <div className='container'>
                        <SectionTitle {...cms.testimonies} />

                        <div className='row'>
                            <div className='col-md-8 col-lg-7 col-xl-6'>
                                {testimonies.length > 0 && <OwlCarousel ref="testimonies-carousel" options={{ items: 1, dots: true, loop: true, autoplay: true }}>{testimoniesContent}</OwlCarousel>}
                            </div>
                        </div>
                    </div>
                </section>

                <section className='publications'>
                    <div className='container'>
                        <SectionTitle {...cms.publications} />

                        <div className='row'>
                            {publicationListContent}
                        </div>

                        <ViewAll link='/publications'>{cms.publications.view_all}</ViewAll>
                    </div>
                </section>
            </div>
        </Loading>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: () => dispatch(getHome()),
    reset: () => dispatch(resetHome()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));