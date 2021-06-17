import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CatUpload = (props) => {

    const [cat, setCat] = useState({
        name: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    let { catId } = useParams();

    const onFileSelected = (e) => {
        if (e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    }

    const uploadFile = (e) => {
        e.preventDefault();

        try {
            // construct the file name
            let fileData = new FormData();
            fileData.set('image', selectedFile, `${Date.now()}-${selectedFile.name}`)

            // set request headers
            const headers = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${props.token}`
                }
            }

            // post to the server
            axios.post(`http://localhost:3000/cats/${catId}/photo`, fileData, headers)
                .then(() => {
                    props.history.push(`/${cat.id}`);
                })

        } catch (err) {
            console.log('An Error Occurred', err);
        }
    }

    useEffect(() => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(selectedFile);
        }
    }, [selectedFile]);

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
            <h1>Upload Photo for {cat.name}</h1>

            <form onSubmit={ uploadFile }>
                <label>Upload Image (max 5MB)
                    <input type="file" onChange={ onFileSelected } />
                </label>
                <br /><br />
                { preview ? <img src={preview} alt="preview" width="500" /> : '' }
                <br /><br />
                <button type="submit">Save</button>
            </form>
            

            <Link to={ `/${cat.id}`}>Back</Link>
        </div>
    )
};

export default CatUpload;