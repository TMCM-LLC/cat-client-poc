import axios from "axios";
import { useState } from "react";
import { withRouter } from "react-router";

const Login = ({history}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const signIn = (e) => {
        e.preventDefault();
        
        if (username !== '' && password !== '') {
            const req = {
                username,
                password
            };

            axios.post('http://localhost:3000/users/login', req).then(result => {
                const token = result.data.jwt;   
                localStorage.setItem('myJWT', token); 
                history.push('/');
            });
        }
    };

    return (<div>
        <form onSubmit={ signIn }>
            <h1>Sign In</h1>
            <label>Username</label>
            <input type="text" name="username" onChange={ e => setUsername(e.target.value) } />
            <label>Password</label>
            <input type="text" name="password" onChange={ e => setPassword(e.target.value) } />
            <button>Sign In</button>
        </form>
    </div>);
}

export default withRouter(Login);