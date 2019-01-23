import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Carousel1 from '../components/Carousel1';




class HomePage1 extends Component {

    state = { listPopok: []}

    componentDidMount() {
        axios.get('http://localhost:2018/popok')

            .then((res) => {
                console.log(res.data)
                this.setState({listPopok: res.data})
            }).catch((err) => {
                console.log (err)
            })
    }

    // componentWillMount() {
    //     axios.get('http://localhost:2018/popok')

    //         .then((res) => {
    //             this.setState({listPopok: res.data})
    //         }).catch((err) => {
    //             console.log ('error')
    //         })
    // }

 
    // renderListPopok = () => {
    //     var listJSXPopok = this.state.listPopok.map((item) => {
    //         return (<div>
    //             <h3>{item.nama}</h3>
    //             <p>{item.description}</p>
    //         </div>)
    //     })
    //     return listJSXPopok;
    // }

    render() {

        console.log(this.state.listPopok)
        return (
            <div>
                <Carousel1 />
                <center><h1>Ini HomePage</h1></center>
                {/* {this.renderListPopok()} */}
                <h2>{this.props.pikachu}</h2>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return ({
        pikachu: state.pikachu
    });
}

export default connect(mapStateToProps) (HomePage1);