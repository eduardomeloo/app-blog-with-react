import {formatISO9075, format} from 'date-fns'
export default function Post({title, summary, cover, content, createdAt, author}) {
    return (
        <div className="post">
            <div className="image">
                <img src={'http://localhost:4001/'+cover} alt="" className="" />
            </div>
            <div className="texts">
                <h2 className="">{title}</h2>
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