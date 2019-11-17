import React from "react";
import styled from "styled-components";
import { isEqual } from "lodash";

const Container = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  & > * {
    position: relative;
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
    scrollY: 0,
    scrolling: false,
  };

  constructor(props) {
    super(props);
    this.container = React.createRef();
  }

  getDomNode() {
    return this.container.current;
  }

  onScroll() {
    if (this.state.scrolling) {
      return;
    }
    const scrollY = this.getDomNode().scrollTop;
    this.setState({ scrollY });
    // Top and bottom of the visible scroll section
    const top = scrollY;
    const bottom = top + this.getDomNode().offsetHeight;
    const scrollingDown = this.state.scrollY > scrollY;
    const nodes = this.childRefs.map(child => child.getDomNode());
    const inView = nodes.filter(node => {
      // Account for offset of the container
      const elementTop = node.offsetTop - this.getDomNode().offsetTop;
      const elementBottom = elementTop + node.offsetHeight;
      return !(top >= elementBottom || bottom <= elementTop);
    });
    if (inView.length > 1) {
      const target = inView.reduce((acc, curr) => {
        // highest node if we're scrolling up, or lowest if we're scrolling down
        return scrollingDown ^ (acc.offsetTop > curr.offsetTop) ? acc : curr;
      });
      this.scrollTo(target);
    }
  }

  scrollTo(node) {
    let startTime = null;
    const duration = this.props.duration || 500;
    const target = node.offsetTop - this.getDomNode().offsetTop;
    const step = timestamp => {
      if (!startTime) {
        startTime = timestamp;
      }
      const progress = (timestamp - startTime) / duration;
      // smooth the animation
      const sinProgress = Math.sin((Math.PI / 2) * progress);
      // offset relative to starting position
      const offset = (target - this.state.scrollY) * sinProgress;
      if (progress < 1) {
        this.getDomNode().scrollTo(0, this.state.scrollY + offset);
        window.requestAnimationFrame(step);
      } else {
        this.getDomNode().scrollTo(0, target);
        // update state once at the end instead of at every step
        this.setState({
          scrolling: false,
          scrollY: this.getDomNode().scrollTop,
        });
      }
    };
    window.requestAnimationFrame(step);
    this.setState({
      scrolling: true,
    });
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
