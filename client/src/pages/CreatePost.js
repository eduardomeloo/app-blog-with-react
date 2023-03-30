import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Editor from '../components/Editor';
//Documentação: https://yarnpkg.com/package/react-quill#readme

export default function CreatePost() {
    const [title, setTitle]       = useState('');
    const [summary, setSummary]   = useState('');
    const [content, setContent]   = useState('');
    const [files, setFiles]       = useState('');
    const [redirect, setRedirect] = useState(false);

    const apiUrl =  process.env.REACT_APP_MODE_PRODUCAO === 'FALSE' ?
                    process.env.REACT_APP_API_HOMOLOGACAO :
                    process.env.REACT_APP_API_PRODUCAO

    async function createNewPost(ev) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        ev.preventDefault();
        
        const response = await fetch(apiUrl+'/post', {
            method: 'POST',
            credentials: 'include',
            body: data,
        })

        if(response.ok) {
            setRedirect(true)
        }
    }

    if(redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <form onSubmit={createNewPost} >
            <input type="title"   placeholder="Title" 
                value={title} onChange={ev => setTitle(ev.target.value)} />

            <input type="summary" placeholder="Summary" 
                value={summary} onChange={ev => setSummary(ev.target.value)} />

            <input type="file" onChange={ev => setFiles(ev.target.files)} />

            <Editor onChange={setContent} value={content} />

            <button style={{marginTop: '5px'}}>Create post</button>
        </form>
    )
}