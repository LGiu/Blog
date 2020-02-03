import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyASohXFvHXBIuyNLaPFSvk1cI9jjpGb2o4",
    authDomain: "reactapp-ba205.firebaseapp.com",
    databaseURL: "https://reactapp-ba205.firebaseio.com",
    projectId: "reactapp-ba205",
    storageBucket: "reactapp-ba205.appspot.com",
    messagingSenderId: "565552318719",
    appId: "1:565552318719:web:b8d342c6ef544557dd24ca"
};

class Firebase {

    constructor() {
        app.initializeApp(firebaseConfig);

        this.app = app.database();
    }

    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email, password);
    }

    logout() {
        return app.auth().signOut();
    }

    async register(nome, email, password) {
        await app.auth().createUserWithEmailAndPassword(email, password);
        return app.database().ref("usuarios").child(app.auth().currentUser.uid).set({
            nome: nome
        })
    }

    isInitialized() {
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent(){
        return app.auth().currentUser != null && app.auth().currentUser.email != null;
    }

    async getCurrentUser(callback){
        if(app.auth().currentUser != null){
            const uid = app.auth().currentUser.uid;
            await app.database().ref('usuarios').child(uid).once('value').then(callback);
        } else {
            return null;
        }
    }
}

export default new Firebase();