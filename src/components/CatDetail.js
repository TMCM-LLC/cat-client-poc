import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router";
import { Link } from "react-router-dom";

const CatDetail = ({history}) => {

    const [cat, setCat] = useState({});

    let { catId } = useParams();

    useEffect(() => {
        // Load Cat from the API
        const url = `http://localhost:3000/cats/${catId}`;

        axios.get(url).then(result => {
            console.log(result);
            setCat(result.data);
        }, err => {
            history.push('/');
        });
    }, [catId, history]);

    return (
        <div>
            <h1>{cat.name}</h1>
            <p>{cat.description}</p>

            <Link to="/">Back to Cat List</Link> |  
            <Link to={ `/${cat.id}/edit`}>Edit</Link>
        </div>
    );
};

export default withRouter(CatDetail);