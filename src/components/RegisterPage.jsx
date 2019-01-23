import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { onUserRegister } from '../actions/index';


const cookies = new Cookies();

class RegisterPage extends Component {

    componentWillReceiveProps(newProps) {
        if (newProps.username !== '') {
            cookies.set('dataUser', newProps.username, {path: '/'})
        }
   }

    onBtnRegisterClick = () => {
        var username = this.refs.username.value;
        var email = this.refs.email.value;
        var phone = this.refs.phone.value;
        var password = this.refs.password.value;

        this.props.onUserRegister({username,email,phone,password});
    }

    renderError = () => {
        if (this.props.error.length > 0) {
            return <p className="alert alert-danger">{this.props.error}</p>
        }
    }


    renderLoading = () => {
        if (this.props.loading) {
            return <h3>Please wait...</h3>
        }
        return (<div className="form-group">
        <input type="button" name="submit" id="submit" className="form-submit" defaultValue="Sign Up" onClick ={this.onBtnRegisterClick}/>
    </div>)
    }  

    render() {
        if(this.props.username === "")
        {
        return (
            <div className= "bodyRegister"> 
            <div className="main">
                <section className="signup">
                {/* <img src="images/signup-bg.jpg" alt=""> */}
                    <div className="container1">
                        <div className="signup-content">
                            <form method="POST" id="signup-form" className="signup-form">
                                    <h2 className="form-title">Create account</h2>
                                    <div><br/></div>
                                    <div className="form-group">
                                        <input type="text" className="form-input" ref="username" name="username" id="username" placeholder="Username" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-input" ref="email" name="email" id="email" placeholder="Email" />
                                    </div>
                                    <div className="form-group">
                                        <input type="number" className="form-input" ref="phone" name="phone" id="phone" placeholder="Phone Number" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-input" ref="password" name="password" id="password" placeholder="Password" />
                                    </div>
                                    {this.renderError()}
                                    {this.renderLoading()}
                            </form>
                            <p className="loginhere">
                              Have already an account ? <a href="/login" className="loginhere-link">Login here</a>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            </div> 
        );
        }
        return <Redirect to="/" />
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username, 
        error: state.auth.error,
        loading: state.auth.loading};
    }

export default connect(mapStateToProps,{onUserRegister}) (RegisterPage);