import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loading from '../../../components/UI/Preloaders/Loading';

import Error from '../../../components/Messages/Error';
import Feedback from '../../../components/Messages/Feedback';

import PageTitle from '../../../components/Frontend/UI/Title/PageTitle';
import SectionTitle from '../../../components/Frontend/UI/Title/SectionTitle';

import Input from '../../../components/UI/Input';
import Form from '../../../components/Frontend/UI/Form';

import { postContact, resetContact } from '../../../store/actions/frontend/contact';

import './Contact.scss';

const initialState = {
    name: '',
    email: '',
    subject: '',
    message: '',
};

class Contact extends Component {
    state = { ...initialState, isMounted: false, componentLoading: false }



    // Component methods
    saveHandler = e => {
        e.preventDefault();
        if (!this.props.frontend.contact.loading) this.props.post(e.target);
    }

    inputChangeHandler = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }



    // Lifecycle methods
    componentDidMount() {
        this.setState({ isMounted: true, componentLoading: true }, () => setTimeout(() => {
            this.setState({ componentLoading: false });
        }, 250));
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.frontend.contact.message && this.props.frontend.contact.message && this.props.frontend.contact.message.type === 'success') this.setState({ ...initialState });
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: { cms: {
                pages: { frontend: { pages: { contact: cms } } }
            } },
            frontend: { contact: { loading, error, message: backend_message } }
        } = this.props;
        const { name, email, subject, message, isMounted, componentLoading } = this.state;

        if (!this.state.isMounted) document.title = `${this.props.content.cms.pages.frontend.header.menu.contact} | ${document.head.querySelector('meta[name="base-title"]').content}`;

        return <Loading loading={isMounted && componentLoading}>
            <div className="Contact">
                <PageTitle {...cms} />

                <section className='contact'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <iframe src="https://www.google.com/maps/d/embed?mid=1qxttzUZkrtU0Q2Pnr0BgOAGLrsOz4YpQ&ehbc=2E312F" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                            </div>

                            <div className='col-lg-6'>
                                <SectionTitle {...cms.contact} />

                                <p>{cms.contact.description}</p>

                                <Error err={error} />
                                <Feedback message={backend_message} />

                                <Form loading={loading} onSubmit={this.saveHandler}>
                                    <div className="row">
                                        <Input type='text' name='name' className="col-md-6" onChange={this.inputChangeHandler} value={name} placeholder={cms.form.name} disabled={loading} />
                                        <Input type='email' name='email' className="col-md-6" onChange={this.inputChangeHandler} value={email} placeholder={cms.form.email} disabled={loading} />
                                        <Input type='text' name='subject' className="col-12" onChange={this.inputChangeHandler} value={subject} placeholder={cms.form.subject} disabled={loading} />
                                        <Input type='textarea' name='message' className="col-12" onChange={this.inputChangeHandler} value={message} placeholder={cms.form.message} required disabled={loading} />
                                    </div>

                                    <div className='submit'>
                                        <button className={`btn btn-outline-${window.APP_PRIMARY_COLOR}${loading ? ' btn-disabled' : ''}`}>{cms.form.submit}</button>
                                    </div>
                                </Form>
                            </div>

                            <div className='col-12'>
                                <div className='row'>
                                    {cms.contact.blocks.map(block => <div key={JSON.stringify(block)} className='block col-lg-2'>
                                        <div className='info'>
                                            <div className='icon'><i className={`fas fa-${block.icon}`} /></div>

                                            <div className='text'>
                                                <div className='title'>{block.title}</div>

                                                <div className='body'>{block.description}</div>
                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Loading>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    post: data => dispatch(postContact(data)),
    reset: () => dispatch(resetContact()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Contact));