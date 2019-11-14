import React from "react";
import styled from "styled-components";
import { isEqual } from "lodash";

const Container = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  & > * {
    scroll-snap-align: start;
    position: relative;
  }
  @media screen and (max-width: 2px) {
    scroll-snap-type: none;
  }
`;

class SnapChild extends React.Component {
  constructor(props) {
    super(props);
    this.childRef = React.createRef();
  }

  getDomNode() {
    return this.childRef.current;
  }

  render() {
    return (
      <div ref={this.childRef} {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

class SnapContainer extends React.Component {
  state = {
    y: 0,
    style: { scrollSnapType: "y mandatory" },
  };

  constructor(props) {
    super(props);
    this.container = React.createRef();
  }

  getDomNode() {
    return this.container.current;
  }

  onScroll() {
    const scrollY = this.getDomNode().scrollTop + this.getDomNode().offsetTop;
    this.setState({ scrollY });
    const top = scrollY;
    const bottom = top + this.getDomNode().offsetHeight;
    const down = this.state.y < scrollY;
    const nodes = this.childRefs.map(child => child.getDomNode());
    const inView = nodes.filter(node => {
      const elementTop = node.offsetTop;
      const elementBottom = elementTop + node.offsetHeight;
      return !(top >= elementBottom || bottom <= elementTop);
    });
    if (
      inView.length === 0 ||
      (inView.length === 1 && inView[0].offsetHeight > bottom - top)
    ) {
      this.setState({
        style: { scrollSnapType: "none" },
      });
    } else {
      this.setState({
        style: { scrollSnapType: "y mandatory" },
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state.style, nextState.style);
  }

  render() {
    this.childRefs = [];
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        ref: el => {
          if (el) {
            this.childRefs.push(el);
          }
        },
      });
    });
    return (
      <Container
        style={this.state.style}
        onScroll={() => this.onScroll()}
        ref={this.container}
      >
        {children}
      </Container>
    );
  }
}

export { SnapContainer, SnapChild };
