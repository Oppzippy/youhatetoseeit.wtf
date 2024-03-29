// Libraries
import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const Nav = styled.nav`
  color: var(--text-color-light);
  display: flex;
  padding: 0 200px;
  background-color: var(--bg-color-dark);
`;

const NavLink = styled(Link)`
  &:link,
  &:visited {
    color: inherit;
    text-decoration: none;
    padding: 10px;

    &:hover {
      background-color: var(--bg-color-dark-2);
    }
    &[data-selected="true"] {
      color: var(--text-color-dark);
      background-color: var(--bg-color-light);
    }
  }
`;

const Container = styled.main`
  color: var(--text-color-dark);
  background-color: var(--bg-color-light);
  width: 100%;
  min-height: 100vh;
  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Section = styled.div`
  width: ${props => 100 / (props.columns ?? 2)}%;
  float: left;
  padding: 5%;
  @media (max-width: 1200px) {
    width: auto;
    float: none;
  }
`;

const Box = styled.section`
  background-color: var(--bg-color-light-2);
  padding: 20px 15px;
  border-radius: 10px;
`;

export default props => {
  return (
    <>
      <Nav>
        {props.nav.map((link, i) => (
          <NavLink to={link.href} data-selected={link.selected} key={i}>
            {link.text}
          </NavLink>
        ))}
      </Nav>
      <Container className="clearfix">
        {React.Children.map(props.children, (child, i) => (
          <Section columns={props.columns} key={i}>
            <Box>{child}</Box>
          </Section>
        ))}
      </Container>
    </>
  );
};
