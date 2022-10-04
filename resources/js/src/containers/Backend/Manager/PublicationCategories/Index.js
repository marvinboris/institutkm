import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Action from '../../../../components/Backend/UI/List/Action';

import actions from '../../../../store/actions/backend/publication-categories';
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
                    pages: { backend: { components: { list: { action } }, pages: { publication_categories: { form } } } }
                }
            },
            backend: { publication_categories: { publication_categories = [] } },
        } = this.props;
        const lang = localStorage.getItem('backend_lang');

        const data = publication_categories.map(publication_category => {
            return updateObject(publication_category, {
                name: publication_category.name[lang],
                created_at: convertDate(publication_category.created_at),
                action: <Action props={this.props} resource='publication_categories' item={publication_category} />,
            });
        });

        return <utility.index.lifecycle.render className='PublicationCategories' props={this.props} state={this.state} resource='publication_categories' data={data} fields={[
            { name: form.name, key: 'name', className: 'w-100' },
            { name: form.is_active, key: 'is_active' },
            { name: form.created_at, key: 'created_at' },
            { name: action, key: 'action' }
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