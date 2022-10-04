import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CustomInput } from 'reactstrap';

// Components
import Save from '../../../../components/Backend/UI/Form/Save';

import Input from '../../../../components/UI/Input';
import { updateObject } from '../../../../shared/utility';

import actions from '../../../../store/actions/backend/training-categories';
import * as utility from '../utility';

const initialState = {
    subject_id: '',
    photo: null,

    add: false,
}

class Add extends Component {
    state = { ...initialState, isMounted: false }

    // Component methods
    resetState = () => this.setState({ ...initialState })
    saveAddHandler = () => utility.add.component.saveAddHandler(this.setState.bind(this), this.props)
    inputChangeHandler = e => utility.add.component.inputChangeHandler(this.state, this.setState.bind(this))(e)

    // Lifecycle methods
    componentDidMount() { utility.add.lifecycle.componentDidMount(this.props, this.setState.bind(this)) }
    componentDidUpdate(prevProps) { utility.add.lifecycle.componentDidUpdate('training_categories', 'training_category')(prevProps, this.props, this.state, this.setState.bind(this), this.resetState) }
    componentWillUnmount() { this.props.reset() }
    render() {
        const {
            content: {
                cms: {
                    pages: { backend: { pages: { training_categories: { form } } } }
                },
                languages
            },
            backend: { training_categories: { subjects = [], training_category = {} } },
        } = this.props;
        const { subject_id, photo } = this.state;
        const lang = localStorage.getItem('backend_lang');

        const subjectsOptions = subjects.map(subject => updateObject(subject, { name: subject.name[lang] })).sort((a, b) => a.name.localeCompare(b.name)).map(subject => <option key={JSON.stringify(subject)} value={subject.id}>{subject.name}</option>);

        const content = <>
            {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

            <div className='row'>
                <div className="col-lg-9">
                    <div className='row'>
                        <Input type="select" className="col-lg-6" name="subject_id" label={form.subject} onChange={this.inputChangeHandler} required value={subject_id}>
                            <option>{form.select_subject}</option>
                            {subjectsOptions}
                        </Input>
                    </div>
                </div>

                <div className="col-lg-3">
                    <Input type="image" name="photo" label={form.photo} onClick={() => this.fileUpload('photo')} cms={form} defaultValue={training_category.photo} value={photo} />
                </div>

                <Save edit={this.props.edit} saveAddHandler={this.saveAddHandler} />
            </div>
        </>;

        return <utility.add.lifecycle.render className='TrainingCategories' props={this.props} state={this.state} resource={'training_categories'}>
            <input type="file" id="photo" name="photo" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />
            {content}
        </utility.add.lifecycle.render>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: id => dispatch(actions.show(id)),
    info: () => dispatch(actions.info()),
    post: data => dispatch(actions.post(data)),
    patch: (id, data) => dispatch(actions.patch(id, data)),
    reset: () => dispatch(actions.reset()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));