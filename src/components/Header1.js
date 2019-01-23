//import React from 'react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie'; 
import { onUserLogout, keepLogin } from '../actions'

const cookies = new Cookies();
// const Header1 = () => {
//     return (
//         <div>
//             <h2>Ini Function Component Header1</h2>
//         </div>
//     )
// }

//export default Header1;

    // class header1 extends Component {
    //     state = {kucing: 'Meoww-ini fitur state-class component', singa:'Ini lion'}

    //     componentWillMount() {
    //         console.log('Ini Will Mount')
    //     }

    //     componentDidMount() {
    //         console.log('Ini Did Mount')
    //         //this.setState({ kucing: 'Meowww - ini state yg di-update'})
    //         // this.state.kucing = 'meowwww - ini state yg udah di-update'; //harus gunakan setState karena tidak akan men-trigger render ulang dan will update
    //         // this.setState({});
    //         this.setState({ kucing: 'Meowww - ini state yg di-update', singa: 'Ini singa galak', hyena:'Ini hyena'})
    //     }

    //     componentWillUpdate() {
    //         console.log('Ini Will Update')
    //     }

    //     componentDidUpdate() {
    //         console.log('Ini Did Update')
    //     }

    //     render() {
    //         console.log('Ini Render')
    //         console.log(this.state)
    //         var jerapah = 'Apa kabar?'
    //         return (
    //             <div>
    //                 <h2>Ini Function Component IniHeader</h2>
    //                 <h3>{this.state.kucing}</h3>
    //                 <h3>{this.state.singa}</h3>
    //                 <p>{jerapah}</p>
    //                 <p>{ 100+35 }</p>
    //             </div>
    //         )
    //     }
    // }

// export default header1;

    class Header1 extends Component {
        constructor(props) {
            super(props);
        
            this.toggle = this.toggle.bind(this);
            this.state = {
              isOpen: false
            };
          }
          toggle() {
            this.setState({
              isOpen: !this.state.isOpen
            });
          }

          onLogoutSelect = () => {
              this.props.onUserLogout();
              cookies.remove('dataUser')
          }

        //   onUserBrowserPopokSelect = () => {
        //     if (this.props.username === ""){
        //         return (
        //             <NavItem>
        //                 <Link to="/login"><NavLink>Browse Popok</NavLink></Link>
        //             </NavItem>
        //         )
        //     }
        //     return (
        //         <NavItem>
        //                 <Link to="/popoklist"><NavLink>Browse Popok</NavLink></Link>
        //         </NavItem>
        //     )
        //   }

        render() {
            // if (this.props.headerText === undefined)
            // {
            //     return (
            //         <div>
            //             <h1>Hallo, apa kabar?</h1>
            //         </div>
            //     )
            // }
            if(this.props.username === "" ) {
            return (
                // <div>
                //     <h1>{this.props.headerText+''+this.props.angka}</h1>
                //     <h1>{this.props.obj.nama}</h1>
                    
                // </div>

                <div>
                    <Navbar style={{color: 'white', backgroundColor:'#53e28d'}} light expand="md">
                    <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    {/* {this.onUserBrowserPopokSelect()} */}
                    <NavItem>
                       <Link to="/popoklist"><NavLink>Browse Popok</NavLink></Link>
                 </NavItem>
                    <NavItem>
                    <Link to="/register"><NavLink>Register</NavLink></Link>
                    </NavItem>
                    <NavItem>
                    <Link to="/login"><NavLink >Login</NavLink></Link>
                    {/* <NavLink href="/login">Login</NavLink> */}
                    </NavItem>
                   
            </Nav>
          </Collapse>
        </Navbar>
      </div>
            );}

            return (
                <div>
                    <Navbar style={{color: 'white', backgroundColor:'#53e28d'}} light expand="md">
                    <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                {/* {this.onUserBrowserPopokSelect()} */}
                                <NavItem>
                       <NavLink href='/popoklist'>Browse Produk</NavLink>
                 </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                        Hello, {this.props.username}
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                        <DropdownItem><Link to="/manage">
                                                Manage Produk
                                                </Link></DropdownItem>
                                            <DropdownItem>
                                                Option 2
                                            </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem onClick={this.onLogoutSelect}>
                                                Log Out
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </Collapse>
                    </Navbar>
                </div>
            );
        }
    }

    const mapStateToProps = (state) => {
        return { username: state.auth.username}
    }
    export default connect(mapStateToProps, {onUserLogout, keepLogin}) (Header1);
