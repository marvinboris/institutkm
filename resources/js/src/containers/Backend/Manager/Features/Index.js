import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Action from '../../../../components/Backend/UI/List/Action';

import actions from '../../../../store/actions/backend/features';
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
                    pages: { backend: { components: { list: { action } }, pages: { features: { form } } } }
                }
            },
            backend: { features: { features = [] } },
        } = this.props;

        const data = features.map(feature => {
            return updateObject(feature, {
                created_at: convertDate(feature.created_at),
                action: <Action props={this.props} resource='features' item={feature} />,
            });
        });

        return <utility.index.lifecycle.render className='Features' props={this.props} state={this.state} resource='features' data={data} fields={[
            { name: form.name, key: 'name', className: 'w-100' },
            { name: form.prefix, key: 'prefix' },
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