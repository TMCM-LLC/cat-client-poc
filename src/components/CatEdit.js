import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router";
import { Link } from "react-router-dom";

const CatEdit = (props) => {

    const [cat, setCat] = useState({
        name: '',
        description: ''
    });

    let { catId } = useParams();

    const updateCat = (e) => {
        e.preventDefault();
                
        if (cat.name !== '' && cat.description !== '') {
            const req = {
                ...cat
            };

            const options = {
                headers: {
                    'Authorization': `Bearer ${props.token}`
                }
            }

            const url = 'http://localhost:3000/cats/' + cat.id;
            axios.put(url, req, options).then(result => {
                console.log(result.data); 
                props.history.push(`/${cat.id}`);
            }, err =>  {
                localStorage.removeItem('myJWT');
                props.history.push('/login');
            });
        }
    }

    const deleteCat = () => {
        const options = {
            headers: {
                'Authorization': `Bearer ${props.token}`
            }
        }

        const url = 'http://localhost:3000/cats/' + cat.id;
        axios.delete(url, options).then(result => {
            console.log(result.data); 
            props.history.push(`/`);
        }, err =>  {
            localStorage.removeItem('myJWT');
            props.history.push('/login');
        });
    }

    useEffect(() => {
        // Load Cat from the API
        const url = `http://localhost:3000/cats/${catId}`;

        axios.get(url).then(result => {
            console.log(result);
            setCat(result.data);
        }, err => {
            props.history.push('/');
        });
    }, [catId, props.history]);

    return (
        <div>
            <form onSubmit={ updateCat }>
                <h1>Edit {cat.name}</h1>
                <label>Name</label>
                <input type="text" name="name" value={cat.name} onChange={ e => 
                    setCat({ 
                        ...cat,
                        name: e.target.value 
                    }) } />
                <label>Description</label>
                <input type="text" name="description" value={cat.description}  onChange={ e => 
                    setCat({ ...cat, description: e.target.value }) } />
                <button>Update!</button>
            </form>

            <Link to={ `/${cat.id} `}>Back to Cat</Link>
            <br/ >
            <button onClick={ deleteCat }>Delete Cat</button>
        </div>
    );
};

export default withRouter(CatEdit);