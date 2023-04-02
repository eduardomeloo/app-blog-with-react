import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
export default function EditPost() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    
    const headers = new Headers();
    headers.append('Accept', 'application/json');

    const apiUrl = process.env.REACT_APP_MODE_PRODUCAO === 'FALSE' ?
                   process.env.REACT_APP_API_HOMOLOGACAO :
                   process.env.REACT_APP_API_PRODUCAO

     useEffect(() => {
        fetch(apiUrl+'/post/'+id, {
            headers: headers
        }).then(res => {
                res.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);
                })
            });
    },[]);
    async function updatePost(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if(files?.[0]) {
            data.set('file', files?.[0]);
        }
        
        const response = await fetch(apiUrl+'/post/', {
            headers: headers,
            method: 'PUT',
            body: data,
            credentials: 'include'
        });

        if(response.ok) {
            setRedirect(true);
        }
    }
    
    if(redirect) {
        return <Navigate to={'/post/'+id} />
    }

    return (
        <form onSubmit={updatePost} >
            <input type="title"   placeholder="Title" 
                value={title} onChange={ev => setTitle(ev.target.value)} />

            <input type="summary" placeholder="Summary" 
                value={summary} onChange={ev => setSummary(ev.target.value)} />

            <input type="file" onChange={ev => setFiles(ev.target.files)} />

            <Editor onChange={setContent} value={content} />

            <button style={{marginTop: '5px'}}>Update Post</button>
        </form>
    );
}