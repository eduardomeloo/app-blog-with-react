import Post from "../components/Post";
import { useEffect, useState } from "react";

export default function IndexPage () {
    const [posts, setPosts] = useState([]);

    const apiUrl =  process.env.REACT_APP_MODE_PRODUCAO === 'FALSE' ?
                    process.env.REACT_APP_API_HOMOLOGACAO :
                    process.env.REACT_APP_API_PRODUCAO

    const headers = new Headers();
    headers.append('Accept', 'application/json');

    useEffect(() => {
        fetch(apiUrl+'/post',{
            headers: headers
        }).then(resp => {
            resp.json().then(posts => {
                setPosts(posts);
            });
        });
    },[]);
    return (
        <>
            {posts.length > 0 ? 
                posts.map(post => (
                    <Post key={post._id} {...post} />
                ))
                :
                null
            }
        </>
    );
}