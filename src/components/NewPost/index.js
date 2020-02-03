import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import firebase from "../../firebase";
import './newpost.css'
import app from "firebase";

class NewPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            titulo: "",
            imagem: "",
            descricao: "",
            autor: "",
            erro: ""
        }

        this.cadastrar = this.cadastrar.bind(this);
    }

    componentDidMount() {
        if (!firebase.getCurrent()) {
            return this.props.history.replace('/login');
            return null;
        }
    }

    cadastrar = async (e) => {
        e.preventDefault();
        this.setState({erro: ""});

        if (this.state.titulo === '') {
            this.setState({erro: "O título deve ser informado!"});
            return null;
        }
        if (this.state.url === '') {
            this.setState({erro: "A url da imagem deve ser informada!"});
            return null;
        }
        if (this.state.descricao === '') {
            this.setState({erro: "A descrição deve ser informada!"});
            return null;
        }

        try {
            await firebase.getCurrentUser((info) => {
                this.setState({autor: info.val().nome});
            });

            let chave = firebase.app.ref('posts').push().key;
            await firebase.app.ref("posts").child(chave).set({
                titulo: this.state.titulo,
                imagem: this.state.imagem,
                descricao: this.state.descricao,
                autor: this.state.autor,
            });

            this.props.history.push("/dashboard");
        } catch (e) {
            this.setState({erro: "Erro ao cadastrar novo post!" + e});
        }

    }

    render() {
        return (
            <div>
                <header id="voltar">
                    <Link to="/dashboard">Voltar</Link>
                    <hr/>
                </header>
                <form onSubmit={this.cadastrar} id="newpost">
                    <label>Título</label>
                    <input type="text" autoComplete="off" autoFocus value={this.state.titulo}
                           onChange={(e) => this.setState({titulo: e.target.value})}
                           placeholder="Digite o título do post..."/>
                    <label>Url Imagem</label>
                    <input type="text" autoComplete="off" value={this.state.imagem}
                           onChange={(e) => this.setState({imagem: e.target.value})}
                           placeholder="Digite a url da imagem.."/>
                    <label>Descrição</label>
                    <textarea type="text" autoComplete="off" value={this.state.descricao}
                              onChange={(e) => this.setState({descricao: e.target.value})}
                              placeholder="Digite a descrição do post.."/>
                    <button type="submit">Cadastrar</button>
                    <label className="erro">{this.state.erro}</label>
                </form>
            </div>
        );
    }
}

export default withRouter(NewPost);
