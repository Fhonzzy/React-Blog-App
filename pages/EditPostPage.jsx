import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
	toolbar: [
		[{ header: [1, 2, false] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		["link", "image"],
		["clean"],
	],
};

const formats = [
	"header",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
	"link",
	"image",
];
function EditPostPage() {
	const [title, setTitle] = useState("");
	const [file, setFile] = useState("");
	const [content, setContent] = useState("");
	const [summary, setSummary] = useState("");
	const [redirect, setRedirect] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		fetch(`https://node-blog-api-qm4l.onrender.com/getpost/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setTitle(data.title);
				setContent(data.content);
				setSummary(data.summary);
			});
	}, []);

	async function editPost(e) {
		e.preventDefault();
		const data = new FormData();

		data.set("title", title);
		data.set("summary", summary);
		data.set("id", id);
		if (file?.[0]) {
			data.set("file", file?.[0]);
		}
		data.set("content", content);

		const response = await fetch("https://node-blog-api-qm4l.onrender.com/post", {
			method: "PUT",
			body: data,
			credentials: "include",
		});
		if (response.ok) {
			// setRedirect(true)
		}
	}

	if (redirect) {
		return <Navigate to={`/getpost/${id}`} />;
	}

	return (
		<form action="" onSubmit={editPost} className="createpost-form">
			<input
				type="text"
				placeholder="title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<input
				type="text"
				placeholder="summary"
				value={summary}
				onChange={(e) => setSummary(e.target.value)}
			/>
			<input
				type="file"
				//No need for a value set to files
				onChange={(e) => setFile(e.target.files)}
			/>
			<ReactQuill
				modules={modules}
				theme={"snow"}
				formats={formats}
				value={content}
				onChange={(newValue) => setContent(newValue)}
				className="quill"
			/>
			<button>Edit Post</button>
		</form>
	);
}

export default EditPostPage;
