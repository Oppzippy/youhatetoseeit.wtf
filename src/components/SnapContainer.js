import React from "react";
import styled from "styled-components";
import bowser from "bowser";

// All mobile devices, smart tvs, etc.
const osBlacklist = new Set([
  "iOS",
  "Android",
  "Windows Phone",
  "BlackBerry",
  "PlayStation 4",
  "WebOS",
  "Bada",
  "Tizen",
  "Roku",
]);

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
    if (
      browser.isBrowser("Microsoft Edge") || // edge doesn't scroll smoothly
      osBlacklist.has(browser.getOSName())
    ) {
      // TODO check if safari works
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
    this.scrollY = this.getScrollParentY();
    this.scrollParent.addEventListener("scroll", this.onScroll);
    this.scrollParent.addEventListener("mousewheel", this.onMouseWheel, {
      passive: false,
    });
  }

  removeScrollParent() {
    if (this.scrollParent) {
      this.scrollParent.removeEventListener("scroll", this.onScroll);
      this.scrollParent.removeEventListener("mousewheel", this.onMouseWheel);
    }
  }

  getScrollParentY() {
    const scrollParent = this.getScrollParent();
    return scrollParent === window
      ? scrollParent.scrollY
      : scrollParent.scrollTop;
  }

  getScrollParentHeight() {
    const scrollParent = this.getScrollParent();
    return scrollParent === window
      ? scrollParent.innerHeight
      : scrollParent.offsetHeight;
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
    if (this.scrollY < scrollY) {
      return 1;
    } else if (this.scrollY > scrollY) {
      return -1;
    }
    return 0;
  }

  onMouseWheel(event) {
    if (this.scrolling) {
      event.preventDefault();
    }
  }

  onScroll(event) {
    if (this.scrolling) {
      // Don't try to snap while an animation is playing
      return;
    }
    if (this.isSnappingDisabled) {
      return;
    }
    const scrollDirection = this.getScrollDirection();
    if (scrollDirection === 0) {
      // Scroll event occurred, but no change in y
      return;
    }

    const nodes = this.childRefs.map(child => child.getDomNode());
    const inView = nodes.filter(node => this.isNodeInView(node));
    if (inView.length > 1) {
      const target = inView.reduce((acc, curr) => {
        // highest node if we're scrolling up, or lowest if we're scrolling down
        return (scrollDirection === 1) ^ (acc.offsetTop < curr.offsetTop)
          ? acc
          : curr;
      });
      this.scrollTo(
        scrollDirection === 1
          ? target
          : target.offsetTop +
              target.offsetHeight -
              this.getScrollParentHeight()
      );
    }
    this.scrollY = this.getScrollParentY();
  }

  scrollTo(target) {
    if (this.animationID) {
      window.cancelAnimationFrame(this.animationID);
      this.animationID = null;
    }
    let startTime = null;
    const startY = this.scrollY;
    const duration = this.props.duration || 500;
    if (typeof target === "object") {
      target = target.offsetTop;
    }
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
        this.animationID = window.requestAnimationFrame(step);
        this.scrollY = startY + offset;
      } else {
        scrollParent.scrollTo(0, target);
        // may be a decimal with zoom that isnt 100%. target is always an integer.
        this.scrollY = this.getScrollParentY();
        this.scrolling = false;
        this.animationID = null;
      }
    };
    window.requestAnimationFrame(step);
    this.scrolling = true;
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
        ref={this.container}
        isScrollParent={typeof this.props.parent === "undefined"}
      >
        {children}
      </Container>
    );
  }
}

export { SnapContainer, SnapChild };
