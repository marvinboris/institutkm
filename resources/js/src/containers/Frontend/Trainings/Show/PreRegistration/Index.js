import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';

import Error from '../../../../../components/Messages/Error';
import Feedback from '../../../../../components/Messages/Feedback';

import Input from '../../../../../components/UI/Input';
import Preloader from '../../../../../components/UI/Preloaders/Preloader';

import { postPreregistration } from '../../../../../store/actions/frontend/trainings';

import './PreRegistration.scss';

const initialState = {
    first_name: '',
    last_name: '',
    birthdate: '',
    gender: '',
    address: '',
    phone: '',
    country: '',
    city: '',
    level: '',
    activity: '',
}

class PreRegistration extends Component {
    state = { ...initialState }



    // Component methods
    saveHandler = e => {
        e.preventDefault();
        this.props.post(e.target);
    }

    inputChangeHandler = e => {
        const { name, value, files } = e.target;
        this.setState({ [name]: files ? files[0] : value });
    }



    // Lifecycle methods
    componentDidUpdate(prevProps) {
        if (!prevProps.frontend.trainings.message && this.props.frontend.trainings.message && this.props.frontend.trainings.message.type === 'success' && !this.props.edit) this.setState({ ...initialState });
    }

    render() {
        const {
            content: {
                cms: {
                    pages: { frontend: { pages: { trainings: { form: cms } } } }
                }, countries,
            },
            frontend: { trainings: { loading, error, message: backend_message } },
            training,
        } = this.props;
        const { first_name, last_name, activity, address, birthdate, city, country, gender, level, phone } = this.state;
        let content;
        const lang = localStorage.getItem('frontend_lang');

        const countriesOptions = countries.map(item => <option key={JSON.stringify(item)} value={item.country}>{item.name}</option>);
        const genderOptions = Object.keys(cms.gender).map(item => <option key={`gender-${item}`} value={item}>{cms.gender[item]}</option>);

        const errors = <>
            <Error err={error} />
        </>;

        if (loading) content = <div className='col-12'>
            <Preloader />
        </div>;
        else content = <div className='col-12'>
            <Feedback message={backend_message} time={5000} />

            <div className='row justify-content-center'>
                <div className='col-12'>
                    <div className='title'>{cms.title}</div>
                    <div className='subtitle'>{training.title[lang]}</div>
                </div>

                <div className="col-12">
                    <Row>
                        <Input className="col-lg-6" type="text" name="first_name" label={cms.first_name} onChange={this.inputChangeHandler} required value={first_name} />
                        <Input className="col-lg-6" type="text" name="last_name" label={cms.last_name} onChange={this.inputChangeHandler} required value={last_name} />
                        <Input className="col-lg-6" type="date" name="birthdate" label={cms.birthdate} onChange={this.inputChangeHandler} required value={birthdate} />
                        <Input className="col-lg-6" type="select" name="gender" label={cms.gender.label} onChange={this.inputChangeHandler} required value={gender}>
                            {genderOptions}
                        </Input>
                        <Input className="col-12" type="textarea" name="address" label={cms.address} onChange={this.inputChangeHandler} required value={address} />
                        <Input className="col-lg-6" type="tel" name="phone" label={cms.phone} onChange={this.inputChangeHandler} required value={phone} />
                        <Input className="col-lg-6" type="select" name="country" label={cms.country} onChange={this.inputChangeHandler} required value={country}>
                            {countriesOptions}
                        </Input>
                        <Input className="col-lg-6" type="text" name="city" label={cms.city} onChange={this.inputChangeHandler} required value={city} />
                        <Input className="col-lg-6" type="text" name="level" label={cms.level} onChange={this.inputChangeHandler} required value={level} />
                        <Input className="col-lg-6" type="text" name="activity" label={cms.activity} onChange={this.inputChangeHandler} required value={activity} />
                    </Row>
                </div>
            </div>

            <div className='submit'>
                <button className={`btn btn-${window.APP_PRIMARY_COLOR}`}>{cms.submit}<i className='fas fa-paper-plane' /></button>
            </div>
        </div>;


        return <div className='PreRegistration'>
            {errors}
            <form onSubmit={this.saveHandler} encType="multipart/form-data" className="row justify-content-center">
                <input type='hidden' name='training' defaultValue={training.id} />
                {content}
            </form>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    post: data => dispatch(postPreregistration(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreRegistration);