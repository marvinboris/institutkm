import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Photo from '../../../../components/Backend/UI/List/Photo';
import Action from '../../../../components/Backend/UI/List/Action';

import actions from '../../../../store/actions/backend/images';
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
                    pages: { backend: { components: { list: { action, see } }, pages: { images: { form } } } }
                }
            },
            backend: { images: { images = [] } },
        } = this.props;

        const data = images.map(image => {
            return updateObject(image, {
                created_at: convertDate(image.created_at),
                photo: <Photo photo={image.src} see={see} title={`${form.photo}`} />,
                action: <Action props={this.props} resource='images' item={image} />,
            });
        });

        return <utility.index.lifecycle.render className='Features' props={this.props} state={this.state} resource='images' data={data} fields={[
            { name: form.src, key: 'src', className: 'w-100' },
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