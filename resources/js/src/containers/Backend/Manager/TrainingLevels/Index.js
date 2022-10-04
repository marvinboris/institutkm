import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Action from '../../../../components/Backend/UI/List/Action';

import actions from '../../../../store/actions/backend/training-levels';
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
                    pages: { backend: { components: { list: { action } }, pages: { training_levels: { form } } } }
                }
            },
            backend: { training_levels: { training_levels = [] } },
        } = this.props;
        const lang = localStorage.getItem('backend_lang');

        const data = training_levels.map(training_level => {
            return updateObject(training_level, {
                name: training_level.name[lang],
                created_at: convertDate(training_level.created_at),
                action: <Action props={this.props} resource='training_levels' item={training_level} />,
            });
        });

        return <utility.index.lifecycle.render className='TrainingLevels' props={this.props} state={this.state} resource='training_levels' data={data} fields={[
            { name: form.name, key: 'name', className: 'w-100' },
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