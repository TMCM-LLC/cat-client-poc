import axios from "axios";
import { useState } from "react";
import { withRouter } from "react-router";

const NewCat = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const createCat = (e) => {
        e.preventDefault();
        
        if (name !== '' && description !== '') {
            const req = {
                name,
                description
            };

            const options = {
                headers: {
                    'Authorization': `Bearer ${props.token}`
                }
            }

            axios.post('http://localhost:3000/cats', req, options).then(result => {
                console.log(result.data); 
                props.history.push('/');
            }, err =>  {
                localStorage.removeItem('myJWT');
                props.history.push('/login');
            });
        }
    };

    return (<div>
        <form onSubmit={ createCat }>
            <h1>Create new kitty</h1>
            <label>Name</label>
            <input type="text" name="name" onChange={ e => setName(e.target.value) } />
            <label>Description</label>
            <input type="text" name="description" onChange={ e => setDescription(e.target.value) } />
            <button>Create!</button>
        </form>
    </div>);
};

export default withRouter(NewCat);