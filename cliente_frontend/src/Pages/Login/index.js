import React, { Component } from 'react'
import axios from 'axios' //permite hacer solicitudes al backend
import Header from '../../componentes/Header/'
export default class index extends Component {
    
    componentDidMount(){
        const token = localStorage.getItem('auth-token');
        if(token){
            this.props.history.push('/admin')
        }
    }

    constructor(props){
        super(props);
        console.log(this.props)
            this.state = {
                 email: '',
              password: '',
              errormsg: this.props.location.state?this.props.location.state.message:''
            };
          //vincular el manejador de los inputs al state:
          this.manejarInput = this.manejarInput.bind(this);
          this.submitFormulario = this.submitFormulario.bind(this);
        }
        manejarInput(e) {
            const { value, name} = e.target 
            this.setState({
               [name]: value
            }) 
         // console.log(e.target.value, e.target.name);
         // console.log(this.state);
        }

        submitFormulario(e) {
            e.preventDefault(); //evitar resetear la pagina
            axios.post('http://localhost:5000/api/user/login', {
                email: this.state.email,
                password: this.state.password
               //luego de registrarse el servidor retorna el token json el cual se guarda en el chache del navegador:
           }).then(response => { 
            console.log(response)
            localStorage.setItem('auth-token', response.data.token)
            this.props.history.push('/admin')
            return; 
           })
            .catch(error => {
                console.log(error)
               //console.log(error.response.data)
                this.setState({errormsg: error.response.data})
            });
           
           //.then(res => localStorage.setItem('auth-token', res.data.token));
            /*
           this.setState({email: ''});
           this.setState({password: ''});
            */
        }
        


    render() {
        return (
        
        <div className="row">
        <div className="col-md-4"></div>
        
        <div className="col-md-4">
        <Header title="React LOGIN"/>
        <hr className="my-3" />
         <form onSubmit={this.submitFormulario}>

         <div className="form-group">
            <p>Email:</p>
            <input type="email" className="form-control" name="email" onChange={this.manejarInput}/> 
        </div>
        <div className="form-group">
            <p>Password:</p>
            <input type="password" className="form-control" name="password" onChange={this.manejarInput}/> 
        </div>
            <button type="submit">Login</button>
        </form>
        <hr></hr>
        <span>
            {this.state.errormsg}
        </span>
        </div>
       
        <div className="col-md-4"></div>
        </div>
        )
    }
}
