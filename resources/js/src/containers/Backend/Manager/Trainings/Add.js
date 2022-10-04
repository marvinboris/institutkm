import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormGroup } from 'reactstrap';

// Components
import Save from '../../../../components/Backend/UI/Form/Save';
import Editor from '../../../../components/Backend/UI/Form/Editor';

import Input from '../../../../components/UI/Input';

import actions from '../../../../store/actions/backend/trainings';
import * as utility from '../utility';

const initialState = {
    title: {},
    description: {},
    body: {},
    photo: null,
    category_id: '',
    level_id: '',
    is_active: '1',

    translate: process.env.MIX_DEFAULT_LANG,

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
    componentDidUpdate(prevProps) { utility.add.lifecycle.componentDidUpdate('trainings', 'training')(prevProps, this.props, this.state, this.setState.bind(this), this.resetState) }
    componentWillUnmount() { this.props.reset() }
    render() {
        const {
            content: {
                cms: {
                    pages: { backend: { components: { form: { active, inactive } }, pages: { trainings: { form } } } }
                }, languages
            },
            backend: { trainings: { training = {}, categories = [], levels = [] } },
        } = this.props;
        const { title, description, body, photo, is_active, category_id, level_id, translate } = this.state;
        const lang = localStorage.getItem('backend_lang');

        const languagesOptions = languages.map(language => <option key={JSON.stringify(language)} value={language.abbr}>{language.name}</option>);
        const trainingCategoriesOptions = categories.map(category => <option key={JSON.stringify(category)} value={category.id}>{category.name[lang]}</option>);
        const trainingLevelsOptions = levels.map(level => <option key={JSON.stringify(level)} value={level.id}>{level.name[lang]}</option>);

        const content = <>
            {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

            <div className='row'>
                <div className="col-lg-9">
                    <div className="row">
                        {languages.map(l => <Fragment key={`language-${l.abbr}`}>
                            <Input type="text" id={`title-${l.abbr}`} className={`col-lg-12${l.abbr === translate ? "" : " d-none"}`} onChange={this.inputChangeHandler} value={title[l.abbr]} name={`title[${l.abbr}]`} required label={form.title} />
                            <Input type="textarea" id={`description-${l.abbr}`} className={`col-lg-12${l.abbr === translate ? "" : " d-none"}`} onChange={this.inputChangeHandler} value={description[l.abbr]} name={`description[${l.abbr}]`} required label={form.description} />
                            <FormGroup id={`body-${l.abbr}`} className={`col-lg-12${l.abbr === translate ? "" : " d-none"}`}>
                                {this.props.edit && training.body && training.body[l.abbr] === body[l.abbr] && <Editor defaultValue={training.body[l.abbr]} name={`body[${l.abbr}]`} placeholder={form.body} />}
                                {!this.props.edit && <Editor name={`body[${l.abbr}]`} placeholder={form.body} />}
                            </FormGroup>
                        </Fragment>)}
                    </div>
                </div>

                <div className="col-lg-3">
                    <Input type="select" name="translate" label={form.language} onChange={this.inputChangeHandler} value={translate}>
                        {languagesOptions}
                    </Input>
                </div>

                <div className="col-12 mb-3">
                    <hr />
                </div>

                <div className="col-lg-9">
                    <Input type="image" name="photo" label={form.photo} onClick={() => this.fileUpload('photo')} cms={form} defaultValue={training.photo} value={photo} dimensions='21by9' />
                </div>

                <div className="col-lg-3">
                    <Input type="select" name="category_id" label={form.category} onChange={this.inputChangeHandler} value={category_id}>
                        {trainingCategoriesOptions}
                    </Input>
                    <Input type="select" name="level_id" label={form.level} onChange={this.inputChangeHandler} value={level_id}>
                        {trainingLevelsOptions}
                    </Input>
                    <Input type="select" label={form.is_active} onChange={this.inputChangeHandler} value={is_active} name="is_active" required>
                        <option>{form.select_status}</option>
                        <option value={1}>{active}</option>
                        <option value={0}>{inactive}</option>
                    </Input>
                </div>

                <Save edit={this.props.edit} saveAddHandler={this.saveAddHandler} />
            </div>
        </>;

        return <utility.add.lifecycle.render className='Trainings' props={this.props} state={this.state} resource={'trainings'}>
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