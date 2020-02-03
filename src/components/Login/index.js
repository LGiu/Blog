import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import firebase from "../../firebase";
import './login.css'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            erro: ""
        }
        this.entrar = this.entrar.bind(this);
        this.login = this.login.bind(this);
        this.dashboard = this.dashboard.bind(this);
    }

    componentDidMount() {
        if(firebase.getCurrent()){
            return this.dashboard();
        }
    }

    entrar(e) {
        this.setState({erro: ""});
        this.login();
        e.preventDefault();
    }

    login = async () => {
        const {email, password} = this.state;

        try {
            await firebase.login(email, password).catch((error) => {
                if (error.code === "auth/user-not-found") {
                    this.setState({erro: "O usuário informado não existe!"});
                } else {
                    this.setState({erro: "Código de erro: " + error.code});
                }
                return null;
            });
        } catch (e) {
            this.setState({erro: "Erro ao realizar login!"});
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
                <form onSubmit={this.entrar} id="login">
                    <label>Email</label>
                    <input type="email" autoComplete="off" autoFocus value={this.state.email}
                           onChange={(e) => this.setState({email: e.target.value})} placeholder="Digite seu email..."/>
                    <label>Senha</label>
                    <input type="password" autoComplete="off" value={this.state.password}
                           onChange={(e) => this.setState({password: e.target.value})}
                           placeholder="Digite sua senha..."/>
                    <button type="submit">Entrar</button>
                    <Link to="/register">Não possui conta? Cadastre-se agora.</Link>
                    <label className="erro">{this.state.erro}</label>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);
