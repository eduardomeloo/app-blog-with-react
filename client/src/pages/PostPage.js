import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const {id} = useParams();
    useEffect(() => {
        fetch(`http://localhost:4001/post/${id}`)
            .then(res => {
                res.json().then(postInfo => {
                    setPostInfo(postInfo);
                });
            });
    }, []);
    return (
        <div>Post Page</div>
    );
}