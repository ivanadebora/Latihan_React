import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {  hashHistory } from 'react-router';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { onUserLogin} from '../actions'

const cookies = new Cookies();

class LoginPage1 extends Component {

    componentWillReceiveProps(newProps) {
        if (newProps.username !== '') {
            cookies.set('dataUser', newProps.username, {path: '/'})
        }
    }
   
    btnLoginClick = () => {
        var username = this.refs.username.refs.tbUsername.value;
        var password = this.refs.password.refs.tbPassword.value;
        // this.setState({username}) sudah tidak perlu digunakan lagi
        this.props.onUserLogin({username,password})
    }

    renderError = () => {
        if (this.props.error.length > 0) {
            return <p className="alert alert-danger">{this.props.error}</p>
        }
    }
    
    renderButton = () => {
        if (this.props.loading) {
            return <i className="fa fa-spinner fa-spin" style={{ fontSize: '54px' }}/>
        }
        return <Button color="success" onClick={this.btnLoginClick}>Login</Button>
    }
    
    render() {
        if(this.props.username === "")
        {
            return (
                <div style={{margin: "0 auto"}} className="col-3">
                {/* <h1>Ini Halaman Login</h1> */}
                <Form >           
                    <FormGroup>
                        <Label for="exampleUsername">Username</Label>
                        <Input type="text" name="username" ref="username" innerRef="tbUsername" id="exampleUsername" placeholder="masukkan username"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" ref="password" innerRef="tbPassword" id="examplePassword" placeholder="masukkan password"/>
                    </FormGroup>
                    {this.renderError()}
                    {this.renderButton()}
                </Form>
                <p className="registerhere">
                            Don't have any account ? <a href="/register" className="registerhere-link">Register here</a>
                            </p>
                </div> 
            );
        }
        return <Redirect to="/"/>  
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username, 
        error: state.auth.error,
        loading: state.auth.loading};
    }


export default connect(mapStateToProps,{onUserLogin})(LoginPage1);