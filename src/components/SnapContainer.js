import React from "react";
import styled from "styled-components";
import { isEqual } from "lodash";
import bowser from "bowser";

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

    this.onScroll = this.onScroll.bind(this);
    this.onMouseWheel = this.onMouseWheel.bind(this);
  }

  componentDidMount() {
    if (this.props.setScrollFunctions) {
      const scrollFunctions = this.childRefs.map(child => () =>
        this.scrollTo(child.getDomNode())
      );
      this.props.setScrollFunctions(scrollFunctions);
    }

    // Disable snapping for unsupported browsers
    const scrollParent = this.props.parent || this.container.current;
    if (scrollParent) {
      this.setScrollParent(scrollParent);
    }
    const browser = bowser.getParser(window.navigator.userAgent);
    this.browserName = browser.getBrowserName();
    if (browser.getBrowserName() === "Microsoft Edge") {
      this.isSnappingDisabled = true;
    }
  }

  componentWillUnmount() {
    this.removeScrollParent();
  }

  getDomNode() {
    return this.container.current;
  }

  getScrollParent() {
    return this.scrollParent;
  }

  setScrollParent(scrollParent) {
    this.removeScrollParent();
    this.scrollParent = scrollParent;
    this.scrollParent.addEventListener("scroll", this.onScroll);
    this.scrollParent.addEventListener("mousewheel", this.onMouseWheel, {
      passive: false,
    });
    this.scrollParent.addEventListener("touchmove", this.onMouseWheel, {
      passive: false,
    });
  }

  removeScrollParent() {
    if (this.scrollParent) {
      this.scrollParent.removeEventListener("scroll", this.onScroll);
      this.scrollParent.removeEventListener("mousewheel", this.onMouseWheel);
      this.scrollParent.removeEventListener("touchmove", this.onMouseWheel);
    }
  }

  getScrollParentY() {
    const scrollParent = this.getScrollParent();
    if (this.browserName === "chrome" && scrollParent === window) {
      return document.querySelector("html").scrollTop;
    }
    return scrollParent === window
      ? scrollParent.scrollY
      : scrollParent.scrollTop;
  }

  isNodeInView(node) {
    const scrollParent = this.getScrollParent();

    const top = this.getScrollParentY();
    const bottom =
      top + (scrollParent.offsetHeight || scrollParent.innerHeight); // innerHeight for window

    const elementTop = node.offsetTop;
    const elementBottom = elementTop + node.offsetHeight;
    return !(top >= elementBottom || bottom <= elementTop);
  }

  getScrollDirection() {
    const scrollY = this.getScrollParentY();
    const scrollingDown = this.state.scrollY < scrollY;

    this.setState({ scrollY });
    return scrollingDown;
  }

  onMouseWheel(event) {
    if (this.state.scrolling) {
      event.preventDefault();
    }
  }

  onScroll(event) {
    if (this.state.scrolling) {
      return;
    }
    const scrollingDown = this.getScrollDirection();
    if (this.isSnappingDisabled) {
      return;
    }

    const nodes = this.childRefs.map(child => child.getDomNode());
    const inView = nodes.filter(node => this.isNodeInView(node));
    if (inView.length > 1) {
      const target = inView.reduce((acc, curr) => {
        // highest node if we're scrolling up, or lowest if we're scrolling down
        return scrollingDown ^ (acc.offsetTop < curr.offsetTop) ? acc : curr;
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
    const target = node.offsetTop;
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
        scrollParent.scrollTo(0, Math.floor(startY + offset));
        this.setState({
          animationID: window.requestAnimationFrame(step),
          scrollY: Math.floor(startY + offset),
        });
      } else {
        scrollParent.scrollTo(0, target);
        this.setState({ scrolling: false, scrollY: target });
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
        ref={this.container}
        isScrollParent={typeof this.props.parent === "undefined"}
      >
        {children}
      </Container>
    );
  }
}

export { SnapContainer, SnapChild };
