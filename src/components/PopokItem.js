import React, { Component} from 'react'
import {connect} from 'react-redux';
import { select_popok } from '../actions/index'


class PopokItem extends Component {

    onItemClick = () => {
        this.props.select_popok(this.props.popok);
    }

    render() {
        const {img, nama, harga, description } = this.props.popok
        return (
            <div onClick={this.onItemClick} className={`col-md-${this.props.size} col-sm-6 portfolio-item`}>
              <a className="portfolio-link" data-toggle="modal" href="#portfolioModal1">
              <div className="portfolio-hover">
                <div className="portfolio-hover-content">
                <i className="fas fa-plus fa-3x" />
                </div>
              </div>
              <img className="img-fluid" src={img} alt="popokbayi" />
              </a>
              <div className="portfolio-caption">
              <h4>{nama}</h4>
              <p>{description}</p>
              <b><p className="text-muted">Rp. {harga}</p></b>
              </div>
          </div>
        )
    }
}

export default connect(null,{select_popok}) (PopokItem);