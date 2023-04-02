import {formatISO9075, format} from 'date-fns'
import { Link } from 'react-router-dom'
export default function Post({_id, title, summary, cover, content, createdAt, author}) {

    const apiUrl =  process.env.REACT_APP_MODE_PRODUCAO === 'FALSE' ?
                    process.env.REACT_APP_API_HOMOLOGACAO :
                    process.env.REACT_APP_API_PRODUCAO

    return (
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`} >
                    <img src={`${apiUrl}/${cover}`} alt="" className="" />
                </Link>
            </div>
            <div className="texts">
                <Link to={`/post/${_id}`} >
                    <h2 className="">{title}</h2>
                </Link>
                <p className="info">
                    <a href="/" className="author">{author.username}</a>
                    <time>{format(new Date(createdAt), 'd MMM yyyy HH:mm')}</time>
                    {/* <time>{formatISO9075(new Date(createdAt))}</time> */}
                </p>
                <p className="summary">{summary}</p>   
            </div>
    </div>
    )
}