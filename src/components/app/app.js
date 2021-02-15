import React, {Component} from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";

import './app.css'
import ItemAddForm from "../item-add-form";

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: 'all'
    }

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {

        this.setState(({todoData}) => {

            const idx = todoData.findIndex((el) => el.id === id);

            const result = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx+1)
            ];

            return {
                todoData: result
            }

        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({todoData}) => {

            const res = [...todoData, newItem];

            return {
                todoData: res
            }
        })
    }

    changeItemAttr = (id, attr) => {
        this.setState(({todoData}) => {

            const idx = todoData.findIndex((el) => el.id === id);

            const oldItem = todoData[idx];
            const newItem = {...oldItem,
                [attr]: !oldItem[attr]};

            const result = [
                ...todoData.slice(0, idx),
                newItem,
                ...todoData.slice(idx+1)
            ];

            return {
                todoData: result
            }

        });
    }

    onToggleDone = (id) => {
        this.changeItemAttr(id, 'done');
    };

    onToggleImportant = (id) => {
        this.changeItemAttr(id, 'important');
    };

    search(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        })
    }

    onSearchInput = (term) => {
        this.setState({
            term: term
        });
    };

    filter(items, filter) {
        switch (filter) {
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    onFilterChange = (filter) => {
        this.setState({
            filter: filter
        });
    }

    render() {
        const { todoData, term, filter } = this.state;

        const visibleItems = this.filter( this.search(todoData, term), filter);
        const doneCount = visibleItems.filter((el) => el.done).length;
        const todoCount = visibleItems.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchInput = {this.onSearchInput}
                    />
                    <ItemStatusFilter filter={filter}
                                      onFilterChange={this.onFilterChange}
                    />
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm
                    onItemAdd={this.addItem}
                />
            </div>
        );
    };

};
