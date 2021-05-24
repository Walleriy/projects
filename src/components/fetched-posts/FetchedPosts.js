import Post from "../post/Post";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../../redux/actions";

export default () => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => {
        return state.posts.fetchedPosts
    })
    const loading = useSelector(state => {
        return state.app.loading
    })

    if (loading) {
        return (
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

    if (!posts.length) {
        return <button
            className="btn btn-primary"
            onClick={() => dispatch(fetchPosts())}
        >
            Завантажити
        </button>
    }

    return posts.map( post => <Post post={post} key={post.id}/>)
}