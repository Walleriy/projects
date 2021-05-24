import {Component} from "react";
import {connect} from 'react-redux'
import {createPost, showAlert} from "../../redux/actions";

class PostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }
    }

    submitHandler = event => {
        event.preventDefault()

        const { title } = this.state

        debugger
        if (!title.trim()) {
            return this.props.showAlert('Назва не може бути порожньою')
        }

        const newPost = {
            title,
            id: Date.now().toString()
        }

        this.props.createPost(newPost)
        this.setState({
            title: ''
        })
    }

    changeInputHandler = event => {
        this.setState(prevState => ({
           [event.target.name]: event.target.value
        }))
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                {this.props.alert &&
                <div className="alert alert-secondary" role="alert">
                    {this.props.alert}
                </div>}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Загловок поста</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={this.state.title}
                        name="title"
                        onChange={this.changeInputHandler}
                    />
                </div>
                <button className="btn btn-success" type="submit">Створити</button>
            </form>
        )
    }
}

const mapDispatchToProps = {
    createPost,
    showAlert
}

const mapStateToProps = state => ({
    alert: state.app.alert
})

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
