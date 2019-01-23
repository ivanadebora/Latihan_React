import React, {Component} from 'react';
import axios from 'axios';
import '../support/css/tabelpopok.css';

class ManageProduk extends Component {

      state = { listPopok: [], idSelectedtoEdit: 0}

    componentDidMount() {
       this.getPopokList();
      }

    getPopokList = () => {
        axios.get('http://localhost:2018/popok')
    
        .then((res) => {
            console.log(res.data)
            this.setState({listPopok: res.data})
        }).catch((err) => {
            console.log (err)
        })
    }
            
    onBtnAddClick = () => {
        var nama = this.refs.namaAdd.value;
        var merek = this.refs.merekAdd.value;
        var harga = parseInt(this.refs.hargaAdd.value);
        var img = this.refs.imgAdd.value;
        var description = this.refs.descAdd.value;

        axios.post('http://localhost:2018/popok', {
            nama, merek, harga, img, description
        })
        .then((res) => {
            console.log(res)
            this.getPopokList()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnEditClick = (Idnya) => {
        this.setState({idSelectedtoEdit:Idnya})
    }


    onBtnSaveClick = (id) => {
        var nama = this.refs.namaEdit.value;
        var merek = this.refs.merekEdit.value;
        var harga = parseInt(this.refs.hargaEdit.value);
        var img = this.refs.imgEdit.value;
        var description = this.refs.descEdit.value;

        axios.put('http://localhost:2018/popok/'+id, {
            nama, merek, harga, img, description
        })
        .then((res) => {
            console.log(res)
            this.setState({idSelectedtoEdit:0})
            this.getPopokList()
        })
        .catch((err) => {
            console.log(err)
        })
    }


    onBtnDeleteClick = (id) => {
        if(window.confirm('Are sure to delete this item?')){
            axios.delete('http://localhost:3001/popok/' + id)
            .then((res) => {
                this.getPopokList();
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

     
    renderBodyPopok = () => {
        var listJSXPopok = this.state.listPopok.map(({id,nama,merek,harga,img,description}) => {
            if (this.state.idSelectedtoEdit === id) {
                return (
                    <tr>
                        <td>{id}</td>
                        <td><input type="text" ref="namaEdit" defaultValue={nama}/></td>
                        <td><select ref="merekEdit" defaultValue={merek}>
                                    <option>Browson</option>
                                    <option>Jhonson</option>
                                    <option>Pampers Indonesi</option>
                                </select></td>
                        <td>Rp. <input type="number" ref="hargaEdit" defaultValue={harga}/></td>
                        <td><input type="text" ref="imgEdit" defaultValue={img}/></td>
                        <td><textarea ref="descEdit" defaultValue={description}/></td>
                        <td><input className="btn btn-success" type="button" value="Save"  onClick={() => this.onBtnSaveClick(id)}/></td>
                        <td><input className="btn btn-danger" type="button" value="Cancel" onClick={() => this.setState({idSelectedtoEdit:0})} /></td>
                    </tr>
                    )
            }
            return (
                <tr>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td>{merek}</td>
                        <td>Rp. {harga}</td>
                        <td><img src={img} width="50px" alt={nama} /></td>
                        <td>{description}</td>
                        <td><input className="btn btn-primary" type="button" value="Edit"  onClick={() => this.onBtnEditClick(id)}/></td>
                        <td><input className="btn btn-danger" type="button" value="Delete" onClick={()=> this.onBtnDeleteClick(id)}/></td>
                    </tr>
            )
             
        })
        return listJSXPopok;
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>Manage Produk</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Merk</th>
                            <th>Harga</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBodyPopok()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td><input type="text" ref="namaAdd" placeholder="Nama Product"/></td>
                            <td><select ref="merekAdd">
                                    <option>Browson</option>
                                    <option>Jhonson</option>
                                    <option>Pampers Indonesi</option>
                                </select></td>
                            <td><input type="number" ref="hargaAdd" placeholder="Harga Product"/></td>
                            <td><input type="text" ref="imgAdd" placeholder="Image URL"/></td>
                            <td><textarea ref="descAdd" placeholder="Enter your description about product"/></td>
                            <td><input type="button" className="btn btn-success" value="Add" onClick={this.onBtnAddClick} /></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            )
    }
}
        
   


export default ManageProduk;