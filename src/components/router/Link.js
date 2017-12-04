import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledLink = styled.a`
	padding-left: 2px;
	padding-right: 2px;
	text-decoration: none;
	color: #db7093;
	font-weight: ${props => (props.activeRoute ? "bold" : "normal")};
`;

export class Link extends Component {
	static contextTypes = {
		route: PropTypes.string,
		linkHandler: PropTypes.func
	};
	handleClick = event => {
		event.preventDefault();
		this.context.linkHandler(this.props.to);
	};
	render() {
		Link.styles = {
			active: {
				fontWeight: "bold"
			}
		};
		const activeClass =
			this.context.route === this.props.to ? "active" : "";
		return (
			<StyledLink
				href="#"
				activeRoute={activeClass}
				onClick={this.handleClick}>
				{this.props.children}
			</StyledLink>
		);
	}
}

Link.propTypes = {
	to: PropTypes.string.isRequired
};
