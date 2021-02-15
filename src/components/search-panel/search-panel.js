import React, { Component } from 'react';
import './search-panel.css'

export default class SearchPanel extends Component {

    state = {
        term: ''
    }

    onSearchInput = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onSearchInput(term);
    }

    render() {
        return (
            <form className="search_panel"
            >
                <input type="text"
                       placeholder="type to search"
                       className='form-control search_panel-input'
                       value={this.state.term}
                       onChange={this.onSearchInput}
                />
            </form>
        );
    }
}


