import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Photo from '../../../../components/Backend/UI/List/Photo';
import Action from '../../../../components/Backend/UI/List/Action';

import actions from '../../../../store/actions/backend/training-categories';
import { updateObject, convertDate } from '../../../../shared/utility';
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
                    pages: { backend: { components: { list: { action, see } }, pages: { training_categories: { form } } } }
                }
            },
            backend: { training_categories: { training_categories = [] } },
        } = this.props;
        const lang = localStorage.getItem('backend_lang');

        const data = training_categories.map(training_category => {
            return updateObject(training_category, {
                subject: training_category.subject && training_category.subject[lang],
                photo: <Photo photo={training_category.photo} see={see} title={`${form.category_photo}: ${training_category.name[lang]}`} />,
                created_at: convertDate(training_category.created_at),
                action: <Action props={this.props} resource='training_categories' item={training_category} />,
            });
        });

        return <utility.index.lifecycle.render className='TrainingCategories' props={this.props} state={this.state} resource='training_categories' data={data} fields={[
            { name: form.subject, key: 'subject', className: 'w-100' },
            { name: form.photo, key: 'photo' },
            { name: form.created_at, key: 'created_at' },
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