import React, {Component} from 'react';
import firebase from "../../firebase";
import './home.css'

class Home extends Component {

    state = {
        posts: []
    };

    componentDidMount() {
        firebase.app.ref("posts").once('value', (snapshot) => {
            let state = this.state;
            state.posts = [];

            snapshot.forEach((item) => {
                state.posts.push({
                    key: item.key,
                    titulo: item.val().titulo,
                    autor: item.val().autor,
                    descricao: item.val().descricao,
                    imagem: item.val().imagem
                })
                console.log(item.key)
            })
            this.setState(state)
        });
    }

    render() {
        return (
            <section id="post">
                {this.state.posts.map((post) => {
                    return (
                        <article key={post.key}>
                            <header>
                                <div className="title">
                                    <strong>{post.titulo}</strong>
                                    <span>Autor: {post.autor}</span>
                                </div>
                            </header>
                            <img src={post.imagem} alt="Capa"/>
                            <footer>
                                <span>{post.descricao}...</span>
                            </footer>
                        </article>
                    );
                })}
            </section>
        );
    }
}

export default Home;
