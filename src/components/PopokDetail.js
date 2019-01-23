import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import {select_popok} from '../actions'



class PopokDetail extends Component {

    componentDidMount() {
        // var popokId = this.props.match.params.id;
        console.log(this.props.location.search)
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        var popokId = params.popok_id
        console.log(popokId)
        axios.get( `http://localhost:2018/popok/${popokId}`)
        .then((res) => {
            this.props.select_popok(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        var {nama, merek, harga, img, description} = this.props.popok
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4" >
                        <img src={img} alt={img} className="img-responsive"  />
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <h1>{nama}</h1>
                        </div>
                        <div className="row">
                            <h3>{merek}</h3>
                        </div>
                        <div className="row">
                            <h4>Rp. {harga}</h4>
                        </div>
                        <div className="row">
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { popok: state.selectedPopok}
}

export default connect(mapStateToProps, {select_popok}) (PopokDetail);