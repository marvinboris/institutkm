import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Photo from '../../../../components/Backend/UI/List/Photo';
import Action from '../../../../components/Backend/UI/List/Action';

import actions from '../../../../store/actions/backend/trainings';
import { updateObject, convertDate, htmlEntities } from '../../../../shared/utility';
import * as utility from '../utility';

class Index extends Component {
    state = { isMounted: false }



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
                    pages: { backend: { components: { list: { action, see } }, pages: { trainings: { form } } } }
                }
            },
            backend: { trainings: { trainings = [] } },
        } = this.props;
        const lang = localStorage.getItem('backend_lang');

        const data = trainings.map(training => {
            const title = training.title[lang];
            const category = training.category[lang];
            const level = training.level[lang];
            const description = training.description[lang];
            const formattedBody = htmlEntities(training.body[lang]);

            return updateObject(training, {
                created_at: convertDate(training.created_at),
                title,
                category,
                level,
                description,
                body: formattedBody,
                photo: <Photo photo={training.photo} see={see} title={`${form.training_photo}: ${title}`} />,
                action: <Action props={this.props} resource='trainings' item={training} />,
            });
        });

        return <utility.index.lifecycle.render className='Trainings' props={this.props} state={this.state} resource='trainings' data={data} fields={[
            { name: form.title, key: 'title', className: 'w-100' },
            { name: form.category, key: 'category' },
            { name: form.level, key: 'level' },
            { name: form.description, key: 'description' },
            { name: form.body, key: 'body' },
            { name: form.photo, key: 'photo' },
            { name: form.is_active, key: 'is_active' },
            { name: action, key: 'action', fixed: true }
        ]} />;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: (page, show, search) => dispatch(actions.get(page, show, search)),
    delete: id => dispatch(actions.delete(id)),
    reset: () => dispatch(actions.reset()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));