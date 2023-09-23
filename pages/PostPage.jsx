import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { formatISO9075 } from "date-fns";
import { Usercontext } from "../src/UserContext";

function PostPage() {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const { userData } = useContext(Usercontext);

	async function getPostDetail() {
		const response = await fetch(`https://node-blog-api-qm4l.onrender.com/getpost/${id}`);
		const data = await response.json();
		// console.log(data);
		setPost(data);
	}

	useEffect(() => {
		getPostDetail();
	}, []);

	if (!post) {
		return "";
	}

	return (
		<main className="single-post-div">
			<h2 className="single-post-title">{post.title}</h2>
			<div className="single-info">
				<div>
					Article by: <i className="author-name">{post.author.username}</i>
				</div>
				{userData.id === post.author._id && (
					<div className="edit-delete-post-div">
						<Link to={`/edit/${post._id}`}className="edit-post react-link">Edit Post</Link>
						<Link className="delete-post react-link">Delete Post</Link>
					</div>
				)}
				<div>
					<p className="post-time">
						Published: {formatISO9075(new Date(post.createdAt))}
					</p>
				</div>
			</div>
			<div className="single-image-div">
				<img src={`https://node-blog-api-qm4l.onrender.com/${post.cover}`} alt="" />
			</div>
			<div
				className="single-post-content"
				dangerouslySetInnerHTML={{ __html: post.content }}
			/>
		</main>
	);
}

export default PostPage;
