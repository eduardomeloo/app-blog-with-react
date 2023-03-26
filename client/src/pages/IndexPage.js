import Post from "../components/Post";
import { useEffect, useState } from "react";

export default function IndexPage () {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4001/post').then(resp => {
            resp.json().then(posts => {
                setPosts(posts);
            });
        });
    },[]);
    return (
        <>
            <Post />
            <Post />
            <Post />
        </>
    );
}