import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Form, FormGroup, Label, CustomInput, Col } from 'reactstrap';

import Error from '../../../../components/Messages/Error';
import Feedback from '../../../../components/Messages/Feedback';

import Input from '../../../../components/UI/Input';
import Preloader from '../../../../components/UI/Preloaders/Preloader';

import { authAdminLogin, setHash } from '../../../../store/actions/auth';

export class Login extends Component {
    state = {
        email: '',
        password: '',
        otp: 'email'
    }

    componentDidMount() { 
        document.title = `${this.props.content.cms.pages.auth.pages.admin.login.sign_in} | ${document.head.querySelector('meta[name="base-title"]').content}`;
     }

    componentDidUpdate() {
        const { auth: { hash }, onSetHash, history } = this.props;
        if (hash) {
            onSetHash(hash);
            history.push('/auth/admin/verify');
        }
    }

    submitHandler = e => {
        e.preventDefault();
        this.props.onAuth(e.target);
    }

    inputChangeHandler = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        const { email, password } = this.state;
        const {
            content: {
                cms: {
                    pages: { auth: { pages: { admin: { login } } } }
                }
            },
            auth: { loading, error, message },
            dark = false
        } = this.props;
        let formContent;


        const titleContent = <div className="text-37 text-700 text-blue">{login.sign_in_to} <span className="text-blue">{login.admin_panel}</span></div>;

        formContent = <>
            <Input type="text" icon="user" onChange={this.inputChangeHandler} validation={{ required: true, isEmail: true }} value={email} name="email" required placeholder={login.email_address} />
            <Input type="password" icon="lock" onChange={this.inputChangeHandler} validation={{ required: true }} value={password} name="password" required placeholder={login.password} />

            <FormGroup className={`ml-2 mt-4 mb-5 d-flex align-items-center text-${dark ? "light" : "dark"}`}>
                <div className='text-700 pr-4'>{login.otp_method}</div>
                <Label check>
                    <CustomInput type="radio" id="sms" name="otp" value="sms" label={login.sms} disabled inline />
                </Label>
                <Label check>
                    <CustomInput type="radio" id="email" defaultChecked name="otp" value="email" label={login.email} inline />
                </Label>
            </FormGroup>

            <button className="py-3 px-4 btn btn-blue btn-lg btn-block">{login.sign_in}<i className='fas fa-sign-in-alt' /></button>
        </>;

        const errors = <Error err={error} />;
        const feedback = <Feedback message={message} />;
        let content = null;

        if (loading) content = <div className="h-100 d-flex justify-content-center align-items-center"><Preloader /></div>;
        else content = <Form onSubmit={this.submitHandler}>
            {formContent}
        </Form>;

        return <>
            <div className="mb-5 pb-1">
                {titleContent}
            </div>
            {errors}
            {feedback}
            {content}
        </>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    onAuth: data => dispatch(authAdminLogin(data)),
    onSetHash: hash => dispatch(setHash(hash))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);