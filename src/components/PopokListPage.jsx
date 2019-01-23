import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PopokItem from './PopokItem';


class PopokListPage extends Component{

  state = { listPopok: [], searchListPopok: []};

  componentDidMount() {

    axios.get('http://localhost:2018/popok')

        .then((res) => {
            console.log(res.data)
            this.setState({listPopok: res.data, searchListPopok: res.data})
        }).catch((err) => {
            console.log (err)
        })
  }

  onBtnSearchClick() {
    var nama = this.refs.namaSearch.value;
    var merek = this.refs.merekSearch.value;
    var hargaMin = parseInt(this.refs.hargaMinSearch.value);
    var hargaMax = parseInt(this.refs.hargaMaxSearch.value);

    var arrSeacrh = this.state.listPopok.filter((item) => {
      return (item.nama.toLowerCase().includes(nama.toLowerCase()) && 
        item.merek.includes(merek) &&
        item.harga >= hargaMin &&
        item.harga <= hargaMax)
    })
    this.setState({searchListPopok: arrSeacrh})

  }

  renderListPopok = () => {
    var total = 12;
    var size = 4;
    var check = true;
    var listJSXPopok = this.state.searchListPopok.map((item) => {
      if (total === 0 && check === true) {
        size = 6;
        total = 12;
        check = false;
      }
      else if (total === 0 && check === false){
        size = 4;
        total = 12;
        check = true;
      }
      total -= size;

      return (
        <PopokItem size={size} popok={item} />
      )
    })
  return listJSXPopok;
}


    render() {
      if(this.props.username !== '') {
        if(this.props.popok.id !== 0) {
          // return <Redirect to={`/popokdetail/${this.props.popok.id}`} />
          return <Redirect to={`/popokdetail?popok_id=${this.props.popok.id}&namapopok=${this.props.popok.nama}`} />
        }
        return(
          <section className="bg-light" id="portfolio">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">Popok List</h2>
                <h3 className="section-subheading text-muted">Best Popok in Town</h3>
              </div>
              <div>
                    Filter by Merk: <select ref="merekSearch">
                        <option value="">All Merk</option>
                        <option>Browson</option>
                        <option>Jhonson</option>
                        <option>Pampers Indonesi</option>
                    </select>
                    <span className="col-2"></span>
                    Filter by Nama Produk: <input type="text" ref="namaSearch" placeholder="Nama Produk"/>
                    <span className="col-2"></span>
                    Harga: Rp. <input type="number" ref="hargaMinSearch" defaultValue="0"/> - Rp. <input type="number" ref="hargaMaxSearch" defaultValue="99999"/>
                    <div><p>...</p></div>
                    <center><input type="button" className="btn btn-success col-2" value="Search" onClick={this.onBtnSearchClick.bind(this)} /></center>
              </div>
            </div>
            <div className="row">
            {this.renderListPopok()}
            </div>
          </div>
        </section>
      );
      }
      return <Redirect to="/login" />
    }
}

const mapStateToProps = (state) => {
  return {
      username: state.auth.username, popok: state.selectedPopok};
  }

export default connect(mapStateToProps)(PopokListPage);