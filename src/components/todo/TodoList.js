import React from "react";
import PropTypes from "prop-types";
import { TodoItem } from "./TodoItem";

export const TodoList = props => {
	return (
		<div className="Todo-list">
			<ul style={{ padding: "0px" }}>
				{props.todos.map(todo => (
					<TodoItem
						handleRemove={props.handleRemove}
						handleToggle={props.handleToggle}
						key={todo.id}
						{...todo}
					/>
				))}
			</ul>
		</div>
	);
};

TodoList.propTypes = {
	todos: PropTypes.array.isRequired
};
