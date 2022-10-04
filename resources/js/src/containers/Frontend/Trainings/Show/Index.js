import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loading from '../../../../components/UI/Preloaders/Loading';

import PreRegistration from './PreRegistration';

import View from '../../../../components/Backend/UI/List/Photo/View';

import { showTraining, resetTrainings } from '../../../../store/actions/frontend/trainings';

import './Show.scss';

class Trainings extends Component {
    state = { isMounted: false }



    // Lifecycle methods
    componentDidMount() {
        this.setState({ isMounted: true });
        this.props.get(this.props.match.params.category, this.props.match.params.slug);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.category !== this.props.match.params.category || prevProps.match.params.slug !== this.props.match.params.slug) this.props.get(this.props.match.params.slug);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: {
                cms: { pages: { frontend: { pages: { trainings: cms } } } }
            },
            frontend: { trainings: { loading, training = {} } }
        } = this.props;
        const { isMounted } = this.state;
        let content;
        const lang = localStorage.getItem('frontend_lang');

        if (!this.state.isMounted) document.title = `${this.props.content.cms.pages.frontend.header.menu.trainings} | ${document.head.querySelector('meta[name="base-title"]').content}`;

        const { title, description, body, photo, level, category } = training;

        if (title) content = <>
            <div className="bg-img" style={{ backgroundImage: `url("${photo}")` }}>
                <div className='wrapper'>
                    <div className='container'>
                        <div className='category'>{level.name[lang] + ', '}{category.name[lang]}</div>

                        <div className="title">{title[lang]}</div>

                        <div className='bottom'>
                            <div className="description">{description[lang]}</div>

                            <div className='register'>
                                <View title={cms.form.title} content={<PreRegistration training={training} />}>
                                    <button className={`btn btn-${window.APP_SECONDARY_COLOR}`}>{cms.pre_registration}</button>
                                </View>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className='training'>
                <div className='container'>
                    <div className='content' dangerouslySetInnerHTML={{ __html: body[lang] }} />
                </div>
            </section>
        </>;

        return <Loading loading={isMounted && loading}>
            <div className="Trainings Show">
                {content}
            </div>
        </Loading>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: (category, slug) => dispatch(showTraining(category, slug)),
    reset: () => dispatch(resetTrainings()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Trainings));