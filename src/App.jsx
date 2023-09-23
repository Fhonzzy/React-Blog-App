import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "../component/Layout";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import CreatePostPage from "../pages/CreatePostPage";
import SignInPage from "../pages/SignInPage";
import PostPage from "../pages/PostPage";
import { UserContextProvider } from "./UserContext";
import EditPostPage from "../pages/EditPostPage";

function App() {
	return (
		<UserContextProvider>
      <Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Homepage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/create" element={<CreatePostPage />} />
					<Route path="/register" element={<SignInPage />} />
					<Route path="/post/:id" element={<PostPage />} />
					<Route path="/edit/:id" element={<EditPostPage />} />
				</Route>
			</Routes>
    </UserContextProvider>
	);
}

export default App;
