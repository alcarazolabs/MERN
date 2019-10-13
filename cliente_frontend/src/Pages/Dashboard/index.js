import React, { Component } from 'react'
import Header from '../../componentes/Header'
import axios from 'axios' //permite hacer solicitudes al backend
import {Link} from 'react-router-dom'

export default class index extends Component {
   
            constructor() {
                super();

                this.state = {
                    user: {},
                    name: '',
                    email: '',
                    mensaje: ''
                    
                }
            
            this.manejarInput = this.manejarInput.bind(this);
            this.submitFormulario = this.submitFormulario.bind(this);
            }
        manejarInput(e) {
                const { value, name} = e.target 
                this.setState({
                   [name]: value
                }) 

         }
       
       
       componentDidMount(){
        const token = localStorage.getItem('auth-token');
        axios.get('http://localhost:5000/api/post/getinfo', { 
            headers: {'auth-token': token} }).then(response => { 
             console.log(response)
             this.setState({user: response.data})
             
             console.log(this.state.user.name, this.state.user.email)
            })
             .catch(error => {
                console.log(error)
             });

    };
    submitFormulario(e) {
        e.preventDefault(); //evitar resetear la pagina
        console.log(this.state.name, this.state.email)
        const token = localStorage.getItem('auth-token');
        
        var postData = {
            name: this.state.name,
            email: this.state.email
         }
         const headers = {
            'auth-token': token
          }
          
        axios.post('http://localhost:5000/api/user/actualizar', postData, {
            headers: headers
        }).then(response => { 
                console.log(response)
                this.setState({mensaje: response.data.mensaje})
         }).catch(error => {
              console.log(error)
              this.setState({mensaje: error.response.data})
        });
    }


    render() {
        return (
            <div>
                <Header title="Dashboard - Admin"/>
                <div className="container p-4">
                
                <p>Hola Usuario:</p>
                <strong>{this.state.user.name}</strong>
                <p>Email:</p>
                <strong>{this.state.user.email}</strong>
                <hr className="my-3" />
                <strong>Actualizar Datos:</strong>
                <hr className="my-3" />
                <form  onSubmit={this.submitFormulario}>

                    <p>Nombres:</p>
                    <input type="text" className="form-control" name="name" onChange={this.manejarInput}/>
                    <p>Email:</p>
                    <input type="email" className="form-control" name="email" onChange={this.manejarInput}/>
                
                <span>{this.state.mensaje}</span>
                
                <br/>
                    <button type="submit">Actualizar</button>           
                </form>
                
                <br/>
                <Link to="/logout">Salir - Logout</Link>

            
            </div>
               
            </div>
        )
    }
}
