import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Action from '../../../../components/Backend/UI/List/Action';
import Photo from '../../../../components/Backend/UI/List/Photo';

import actions from '../../../../store/actions/backend/testimonies';
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
                    pages: { backend: { components: { list: { action, see } }, pages: { testimonies: { form } } } }
                }
            },
            backend: { testimonies: { testimonies = [] } },
        } = this.props;
        const lang = localStorage.getItem('backend_lang');

        const data = testimonies.map(testimony => {
            const formattedBody = htmlEntities(testimony.body[lang]);

            return updateObject(testimony, {
                body: formattedBody,
                created_at: convertDate(testimony.created_at),
                photo: <Photo photo={testimony.photo} see={see} title={`${form.testimony_photo}: ${testimony.name}`} />,
                action: <Action props={this.props} resource='testimonies' item={testimony} />,
            });
        });

        return <utility.index.lifecycle.render className='Testimonies' props={this.props} state={this.state} resource='testimonies' data={data} fields={[
            { name: form.name, key: 'name' },
            { name: form.body, key: 'body', className: 'w-100' },
            { name: form.photo, key: 'photo' },
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