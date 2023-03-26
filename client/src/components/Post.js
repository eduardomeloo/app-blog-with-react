import {formatISO9075, format} from 'date-fns'
export default function Post({title, summary, cover, content, createdAt, author}) {
    return (
        <div className="post">
            <div className="image">
                <img src="https://images.unsplash.com/photo-1679215805552-e28a96550a23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" className="" />
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