import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import firebase from "../../firebase";
import './register.css'

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            email: "",
            password: "",
            erro: ""
        }

        this.cadastrar = this.cadastrar.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.dashboard = this.dashboard.bind(this);
    }

    componentDidMount() {
        if(firebase.getCurrent()){
            return this.dashboard();
        }
    }

    cadastrar(e){
        e.preventDefault();
        this.setState({erro: ""});
        this.onRegister();
    }

    onRegister = async () => {
        const {nome, email, password} = this.state;

        try {
            await firebase.register(nome, email, password).catch((error) => {
                this.setState({erro: "Código de erro: " + error.code});
                return null;
            });
        } catch (e) {
            this.setState({erro: "Erro ao realizar cadastro!"});
        }

        if(this.state.erro === ""){
            return this.dashboard();
        }
    }


    dashboard() {
        return this.props.history.replace('/dashboard');
    }

    render() {
        return (
            <div>
                <h1 className="register-h1">Crie sua conta</h1>
                <form onSubmit={this.cadastrar} id="register">
                    <label>Nome</label>
                    <input type="text" autoComplete="off" autoFocus value={this.state.nome}
                           onChange={(e) => this.setState({nome: e.target.value})} placeholder="Digite seu nome..."/>
                    <label>Email</label>
                    <input type="email" autoComplete="off" value={this.state.email}
                           onChange={(e) => this.setState({email: e.target.value})} placeholder="Digite seu email..."/>
                    <label>Senha</label>
                    <input type="password" autoComplete="off" value={this.state.password}
                           onChange={(e) => this.setState({password: e.target.value})}
                           placeholder="Digite sua senha..."/>
                    <button type="submit">Cadastrar</button>
                    <label className="erro">{this.state.erro}</label>
                </form>
            </div>
        );
    }
}

export default withRouter(Register);
