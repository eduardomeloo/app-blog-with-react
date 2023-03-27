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

    if(!postInfo) return '';

    return (
        <div className="post-page">
            <div>
                <div className="image">
                    <img src={`http://localhost:4001/${postInfo.cover}`} alt="" />
                </div>
            </div>
            <h1>{postInfo.title}</h1>
            <div dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>
    );
}