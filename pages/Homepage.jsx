import { useEffect, useState } from "react";
import Posts from "../component/Posts";

function Homepage() {
	const [posts, setPosts] = useState([]);

	// const getPost = async () => {
	// 	const response = await ;
	// 	const data = await response.json();
	// 	setPosts(data);
	// };

	useEffect(() => {
		fetch("https://node-blog-api-qm4l.onrender.com/post")
		.then((res)=> res.json())
		.then((posts)=> setPosts(posts))
	}, []);
	return (
		<main>
			{posts.length > 0 &&
				posts.map((post) => {
					return <Posts key={post._id} {...post} />;
				})}
		</main>
	);
}

export default Homepage;
