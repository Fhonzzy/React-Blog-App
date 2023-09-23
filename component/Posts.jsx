// import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
function Posts({ _id, title, content, cover, author, createdAt, summary }) {
	return (
		<section className="container">
			<div>
				<Link to={`/post/${_id}`}>
					<img src={`http://localhost:5000/${cover}`} alt="Article Image" />
				</Link>
			</div>
			<Link to={`/post/${_id}`} className="react-link">
				<div className="texts">
					<h2 className="title">{title}</h2>
					<div className="info">
						<p>{author.username}</p>
						<TimeAgo date={createdAt} />
					</div>
					<div>
						<p>{summary}</p>
					</div>
				</div>
			</Link>
		</section>
	);
}

export default Posts;
