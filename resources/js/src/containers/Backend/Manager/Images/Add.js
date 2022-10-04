import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Save from '../../../../components/Backend/UI/Form/Save';

import Input from '../../../../components/UI/Input';

import actions from '../../../../store/actions/backend/images';
import * as utility from '../utility';

const initialState = {
    src: null,

    add: false,
}

class Add extends Component {
    state = { ...initialState, isMounted: false }

    // Component methods
    resetState = () => this.setState({ ...initialState })
    saveAddHandler = () => utility.add.component.saveAddHandler(this.setState.bind(this), this.props)
    inputChangeHandler = e => utility.add.component.inputChangeHandler(this.state, this.setState.bind(this))(e)
    fileUpload = id => utility.add.component.fileUpload(id)

    // Lifecycle methods
    componentDidMount() { utility.add.lifecycle.componentDidMount(this.props, this.setState.bind(this)) }
    componentDidUpdate(prevProps) { utility.add.lifecycle.componentDidUpdate('images', 'image')(prevProps, this.props, this.state, this.setState.bind(this), this.resetState) }
    componentWillUnmount() { this.props.reset() }
    render() {
        const {
            content: {
                cms: {
                    pages: { backend: { pages: { images: { form } } } }
                }
            },
            backend: { images: { image = {} } }
        } = this.props;
        const { src } = this.state;

        const content = <>
            {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

            <div className='row'>
                <div className="col-lg-9">
                    <Input type="image" name="src" label={form.photo} onClick={() => this.fileUpload('src')} cms={form} defaultValue={image.src} value={src} dimensions='16by9' />
                </div>

                <Save edit={this.props.edit} saveAddHandler={this.saveAddHandler} />
            </div>
        </>;

        return <utility.add.lifecycle.render className='Images' props={this.props} state={this.state} resource={'images'}>
            <input type="file" id="src" name="src" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />
            {content}
        </utility.add.lifecycle.render>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: id => dispatch(actions.show(id)),
    post: data => dispatch(actions.post(data)),
    patch: (id, data) => dispatch(actions.patch(id, data)),
    reset: () => dispatch(actions.reset()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));