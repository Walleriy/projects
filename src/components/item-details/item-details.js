import React, { Component } from 'react';
import './item-details.css';
import Spinner from "../spinner";
import ErrorButton from "../error-button";

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
}

export {
    Record
};

export default class ItemDetails extends Component {

    state = {
        item: null,
        loading: false
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId ||
            this.props.getData !== prevProps.getData) {
            this.setState({loading: true})
            this.updateItem();
        }
    }

    updateItem() {
        const { itemId, getData } = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    loading: false
                });
            })
    }

    render() {

        const { item } = this.state;
        if (!this.state.item) {
            return <span>Select an item from a list</span>
        }

        if (this.state.loading) {
            return <Spinner />
        }

        const { name, image } = item;

        return (
            <div className="item-details card">
                <img className="item-image"
                     src={image} />

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(this.props.children, (child) => {
                              return React.cloneElement(child, { item });
                            })
                        }
                    </ul>
                    <ErrorButton />
                </div>
            </div>
        )
    }
}
