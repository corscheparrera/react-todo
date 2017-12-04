import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TodoForm, TodoList, Footer } from "./components/todo/";
import { partial, pipe } from "./lib/utils";
import {
	addTodo,
	generateId,
	findById,
	toggleTodo,
	updateTodo,
	removeTodo,
	filterTodos
} from "./lib/todoHelpers";
import {
	loadTodos,
	createTodo,
	saveTodo,
	destroyTodo
} from "./lib/todoService";

const Container = styled.div`text-align: center;`;
const AppHeader = styled.div`
	background-color: #222;
	height: 150px;
	padding: 20px;
	color: white;
`;
const TodoApp = styled.div`
	padding-top: 20vh;
	display: inline-block;
	text-align: left;
`;

class App extends Component {
	state = {
		todos: [],
		currentTodo: ""
	};
	static contextTypes = {
		route: PropTypes.string
	};

	componentDidMount() {
		loadTodos().then(todos => this.setState({ todos }));
	}

	handleRemove = (id, event) => {
		event.preventDefault();
		const updatedTodo = removeTodo(this.state.todos, id);
		this.setState({ todos: updatedTodo });
		destroyTodo(id).then(() => this.showTempMessage("Todo Removed"));
	};

	handleToggle = id => {
		const getToggledTodo = pipe(findById, toggleTodo);
		const updated = getToggledTodo(id, this.state.todos);
		const getUpdatedTodos = partial(updateTodo, this.state.todos);
		const updatedTodos = getUpdatedTodos(updated);
		this.setState({ todos: updatedTodos });
		saveTodo(updated).then(() => this.showTempMessage("Todo Updated"));
	};

	handleInputChange = event => {
		this.setState({ currentTodo: event.target.value });
	};

	handleSubmit = event => {
		event.preventDefault();
		const newId = generateId();
		const newTodo = {
			id: newId,
			name: this.state.currentTodo,
			isComplete: false
		};
		const updatedTodos = addTodo(this.state.todos, newTodo);
		this.setState({
			todos: updatedTodos,
			currentTodo: "",
			errorMessage: ""
		});
		createTodo(newTodo).then(() => this.showTempMessage("Todo added"));
	};

	showTempMessage = msg => {
		this.setState({ message: msg });
		setTimeout(() => this.setState({ message: "" }), 2500);
	};

	handleEmptySubmit = event => {
		event.preventDefault();
		this.setState({
			errorMessage: "Please supply a todo name"
		});
	};

	render() {
		const submitHandler = this.state.currentTodo
			? this.handleSubmit
			: this.handleEmptySubmit;
		const displayTodos = filterTodos(this.state.todos, this.context.route);

		return (
			<Container>
				<AppHeader>
					<h2 style={{ paddingTop: "30px" }}>React todos</h2>
				</AppHeader>

				<TodoApp>
					{this.state.errorMessage && (
						<span style={{ color: "red" }}>
							{this.state.errorMessage}
						</span>
					)}
					{this.state.message && (
						<span style={{ color: "green" }}>
							{this.state.message}
						</span>
					)}
					<TodoForm
						handleInputChange={this.handleInputChange}
						currentTodo={this.state.currentTodo}
						handleSubmit={submitHandler}
					/>
					<Footer />
					<TodoList
						handleToggle={this.handleToggle}
						todos={displayTodos}
						handleRemove={this.handleRemove}
					/>
				</TodoApp>
			</Container>
		);
	}
}

export default App;
