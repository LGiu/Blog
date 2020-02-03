import React, {Component} from 'react';
import {Link} from "react-router-dom";
import firebase from "../../firebase";
import './dashboard.css'

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: localStorage.nome,
        }

        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
    }

    async componentDidMount() {
        if (!firebase.getCurrent()) {
            return this.login();
            return null;
        } else {
            firebase.getCurrentUser((info) => {
                localStorage.nome = info.val().nome;
                this.setState({nome: localStorage.nome});
            });
        }
    }

    logout = async () => {
        await firebase.logout();
        localStorage.removeItem("nome");
        return this.props.history.replace('/');
    }

    login() {
        return this.props.history.replace('/login');
    }

    render() {
        return (
            <div id="dashboard">
                <h2>Olá {this.state.nome}!</h2>
                <Link to="/dashboard/new">Novo Post</Link>
                <button onClick={() => this.logout()}>Sair</button>
            </div>
        );
    }
}

export default Dashboard;
