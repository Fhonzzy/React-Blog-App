import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from 'react-router-dom';

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

function CreatePostPage() {
	const [title, setTitle] = useState("");
	const [file, setFile] = useState("");
	const [content, setContent] = useState("");
	const [summary, setSummary] = useState("")
	const [redirect, setRedirect] = useState(false)

	const publishPost = async (e) => {
		const postData = new FormData();

		postData.set("title", title);
		postData.set('summary', summary)
		postData.set("file", file[0]);
		//Grab the first file
		postData.set("content", content);

		e.preventDefault();

		const response = await fetch("http://localhost:5000/post", {
			method: "POST",
			body: postData,
			credentials: "include",
		});
		
		if (response.ok) {
			setRedirect(true)
		}
	};

	if (redirect) {
		return <Navigate to={'/'}/>
	}

	return (
		<form action="" onSubmit={publishPost} className="createpost-form">
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
				formats={formats}
				value={content}
				onChange={(newValue) => setContent(newValue)}
				className="quill"
			/>
			<button>Create Post</button>
		</form>
	);
}

export default CreatePostPage;
