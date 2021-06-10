import axios from "axios";
import { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

const Cats = () => {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/cats').then(result => {
            console.log(result);
            setCats(result.data);
        });
    }, []);

    return (<div>
        <h1>All the kitties</h1>
        <ul>
            { cats.map(cat => 
                <li key={cat.id}>
                    <Link to={ "/" + cat.id }>{cat.name}</Link>
                </li>
            ) }
        </ul>

        <Link to="/new">Create a Cat</Link>
    </div>);
}

export default withRouter(Cats);