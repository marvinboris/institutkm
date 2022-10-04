import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loading from '../../../components/UI/Preloaders/Loading';

import PageTitle from '../../../components/Frontend/UI/Title/PageTitle';

import TrainingBlock from '../../../components/Frontend/UI/Blocks/TrainingBlock';

import { getTrainings, resetTrainings } from '../../../store/actions/frontend/trainings';

import './Trainings.scss';

class Trainings extends Component {
    state = { isMounted: false }



    // Lifecycle methods
    componentDidMount() {
        this.setState({ isMounted: true });
        this.props.get(this.props.match.params.category);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.category !== this.props.match.params.category) this.props.get(this.props.match.params.category);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: { cms: {
                pages: { frontend: { pages: { trainings: cms } } }
            } },
            frontend: { trainings: { loading, category = {}, trainings = [] } }
        } = this.props;
        const { isMounted } = this.state;
        const lang = localStorage.getItem('frontend_lang');

        if (!this.state.isMounted) document.title = `${this.props.content.cms.pages.frontend.header.menu.trainings} | ${document.head.querySelector('meta[name="base-title"]').content}`;

        const trainingsContent = trainings.map(training => <div key={JSON.stringify(training)} className='col-md-4 col-lg-3'><TrainingBlock {...training} /></div>);

        return <Loading loading={isMounted && loading}>
            <div className="Trainings">
                {this.props.match.params.category ? <PageTitle title={cms.title} subtitle={category.name && category.name[lang]} photo={category.photo} /> : <PageTitle {...cms} />}

                <section className='trainings'>
                    <div className='container'>
                        <div className='row'>{trainingsContent}</div>
                    </div>
                </section>
            </div>
        </Loading>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: category => dispatch(getTrainings(category)),
    reset: () => dispatch(resetTrainings()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Trainings));