import Post from "../post/Post";
import {connect} from "react-redux";

const Posts = ({syncPosts}) => {
    if (!syncPosts.length) {
        return <p className="text-center">Відсутні пости</p>
    }
    return syncPosts.map( (post, index) => <Post post={post} key={post.id}/>)
}

const mapStateToProps = state => ({
    syncPosts: state.posts.posts
})

export default connect(mapStateToProps, null)(Posts)