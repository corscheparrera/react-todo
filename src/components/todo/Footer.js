import React from "react";
import { Link } from "../router";
import styled from "styled-components";

const Wrapper = styled.div`
	padding-top: 20px;
	text-align: center;
`;

export const Footer = () => {
	return (
		<Wrapper>
			<Link to="/">All</Link>
			<Link to="/active">Active</Link>
			<Link to="/complete">Complete</Link>
		</Wrapper>
	);
};
