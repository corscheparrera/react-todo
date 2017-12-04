import React from "react";
import PropTypes from "prop-types";
import { partial } from "../../lib/utils";
import styled from "styled-components";
export const TodoItem = props => {
	//with this bind, our function know what its first argument value is, which is the id of the todoItem
	const handleToggle = partial(props.handleToggle, props.id);
	const handleRemove = partial(props.handleRemove, props.id);

	const Li = styled.li`list-style-type: none;`;
	const DeleteItem = styled.a`
		text-decoration: none;
		color: red;
	`;
	return (
		<Li>
			<span className="delete-item">
				<DeleteItem href="#" onClick={handleRemove}>
					X
				</DeleteItem>
			</span>

			<input
				type="checkbox"
				onChange={handleToggle}
				checked={props.isComplete}
			/>
			{props.name}
		</Li>
	);
};

TodoItem.propTypes = {
	name: PropTypes.string.isRequired,
	isComplete: PropTypes.bool,
	id: PropTypes.number.isRequired
};
