import PostForm from "./components/post-form/PostForm";
import PostsList from "./components/posts-list/PostsList";
import FetchedPosts from "./components/fetched-posts/FetchedPosts";

function App() {
  return (
    <div className="container pt-3">
        <div className="row">
            <div className="col">
                <PostForm />
            </div>
        </div>
        <div className="row">
            <div className="col">
                <h2>Синхронні пости</h2>
                <PostsList />
            </div>
            <div className="col">
                <h2>Асинхронні пости</h2>
                <FetchedPosts />
            </div>
        </div>
    </div>
  );
}

export default App;
