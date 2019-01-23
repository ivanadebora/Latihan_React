import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom';
// import './App.css';
// import './support/css/bootstrap.css';
//import { Button } from 'reactstrap';
//import { Form, FormGroup, Label, Input } from 'reactstrap';
import { keepLogin, cookieChecked } from './actions'
import Header1 from './components/Header1';
//import Content1 from './components/Content1';
import LoginPage1 from './components/LoginPage1';
import HomePage1 from './components/HomePage1';
import RegisterPage from './components/RegisterPage';
import PopokListPage from './components/PopokListPage';
import ManageProduk from './components/ManageProduk';
import PopokDetail from './components/PopokDetail';
// import Footer1 from './components/Footer1';
// import InputData from './components/InputData';


const cookies = new Cookies();

class App extends Component {
  // state = { content: 'Ini content', username: ''}

  // btnOnclick = () => {
  //   this.setState({content: 'This is Content'})
  // }
  componentDidMount() {
    const username = cookies.get('dataUser');
    if (username !== undefined) {
        this.props.keepLogin(username)
    }
    else {
      this.props.cookieChecked();
    }
}

  render() {
    // var {content, username} = this.state;
    if (this.props.cookie) {
      return (
        <div>
          {/* <Header1 
            headerText={"Blessing Commerce"} 
            angka={500} 
            obj={{nama:'Ivana'}}/>
          <Header1 /> */}
          <Header1 navBrand={"Belajar React"} />
          
          <div>
          <Route exact path="/" component={HomePage1}/>
          <Route path="/login" component={LoginPage1}/>
          <Route path="/register" component={RegisterPage}/>
          <Route path="/popoklist" component={PopokListPage}/>
          <Route path="/manage" component={ManageProduk} />
          {/* <Route path="/popokdetail/:id" component={PopokDetail} /> */}
          <Route path="/popokdetail" component={PopokDetail} />
          </div>
      
  
          {/* <Content1 content={'Ini latihan react'}/> */}
          {/* <Content1 contentHeader={content}>
            <p>Ini latihan React</p>
            <h3>Happy Friday!</h3>
            </Content1> */}
          
          {/* <input type="button" style={{color:'violet', backgroundColor:'red'}} 
          value="OK" 
          className="btn btn-primary" 
          onClick = {this.btnOnclick}/> */}
          {/* <Button color="danger" onClick={this.btnOnclick}>Danger</Button> */}
  
          {/* <Form style={{margin: "0 auto"}} className="col-3">
          <FormGroup>
            <Label for="exampleUsername">Username</Label>
            <Input type="text" name="username" ref="username" innerRef="tbUsername" id="exampleUsername" placeholder="masukkan username"/>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="masukkan password"/>
          </FormGroup>
          <Button color="success" onClick={this.btnLoginClick}>Login</Button>
        </Form> */}
  
        </div>
      );
    }
    return (<div>
      <center><i className="fa fa-spinner fa-spin" style={{ fontSize: '54px' }}/></center>
    </div>)
  }
}

const mapStateToProps = (state) => {
  return {cookie: state.auth.cookie}
}

export default withRouter(connect(mapStateToProps,{keepLogin, cookieChecked})(App));
