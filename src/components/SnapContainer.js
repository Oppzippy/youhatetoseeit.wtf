import React from "react";
import styled from "styled-components";
import { isEqual } from "lodash";

const Container = styled.div`
  flex-grow: 1;
  overflow-y: ${props => (props.isScrollParent ? "scroll" : "initial")};
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
    if (typeof window !== "undefined") {
      this.mediaQuery = window.matchMedia("(hover: none)");
    }

    this.onScroll = this.onScroll.bind(this);
  }

  isScrollSnappingEnabled() {
    return !this.mediaQuery.matches;
  }

  componentDidMount() {
    if (this.props.setScrollFunctions) {
      const scrollFunctions = this.childRefs.map(child => () =>
        this.scrollTo(child.getDomNode())
      );
      this.props.setScrollFunctions(scrollFunctions);
    }
    this.getEventListenerParent().addEventListener("scroll", this.onScroll);
  }

  componentDidUnmount() {
    this.getEventListenerParent().removeEventListener("scroll", this.onScroll);
  }

  getDomNode() {
    return this.container.current;
  }

  getScrollParent() {
    return this.props.parent || this.container.current;
  }

  getEventListenerParent() {
    // documentElement holds the scroll position but does not fire scroll events.
    // window does instead.
    return this.getScrollParent() === document.documentElement
      ? window
      : this.getScrollParent();
  }

  isNodeInView(node) {
    const scrollParent = this.getScrollParent();

    const top = scrollParent.scrollTop;
    const bottom = top + scrollParent.offsetHeight;

    const elementTop = node.offsetTop - scrollParent.offsetTop;
    const elementBottom = elementTop + node.offsetHeight;
    return !(top >= elementBottom || bottom <= elementTop);
  }

  getScrollDirection() {
    const scrollY = this.getScrollParent().scrollTop;
    const scrollingDown = this.state.scrollY > scrollY;
    this.setState({ scrollY });
    return scrollingDown;
  }

  onScroll() {
    console.log("scroll");
    if (this.state.scrolling || !this.isScrollSnappingEnabled()) {
      return;
    }
    const scrollingDown = this.getScrollDirection();

    const nodes = this.childRefs.map(child => child.getDomNode());
    const inView = nodes.filter(node => this.isNodeInView(node));
    if (inView.length > 1) {
      const target = inView.reduce((acc, curr) => {
        // highest node if we're scrolling up, or lowest if we're scrolling down
        return scrollingDown ^ (acc.offsetTop > curr.offsetTop) ? acc : curr;
      });
      this.scrollTo(target);
    }
  }

  scrollTo(node) {
    if (this.state.animationID) {
      window.cancelAnimationFrame(this.state.animationID);
      this.setState({ animationID: null });
    }
    let startTime = null;
    const startY = this.state.scrollY;
    const duration = this.props.duration || 500;
    const target = node.offsetTop - this.getScrollParent().offsetTop;
    const step = timestamp => {
      if (!startTime) {
        startTime = timestamp;
      }
      const scrollParent = this.getScrollParent();
      const progress = (timestamp - startTime) / duration;
      // smooth the animation
      const sinProgress = Math.sin((Math.PI / 2) * progress);
      // offset relative to starting position
      const offset = (target - startY) * sinProgress;
      if (progress < 1) {
        scrollParent.scrollTo(0, startY + offset);
        this.setState({
          animationID: window.requestAnimationFrame(step),
          scrollY: scrollParent.scrollTop,
        });
      } else {
        scrollParent.scrollTo(0, target);
        this.setState({ scrolling: false });
        this.animationID = null;
      }
    };
    window.requestAnimationFrame(step);
    this.setState({
      scrolling: true,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Ignore state
    return !isEqual(nextProps, this.props);
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
        isScrollParent={typeof this.props.parent === "undefined"}
      >
        {children}
      </Container>
    );
  }
}

export { SnapContainer, SnapChild };
