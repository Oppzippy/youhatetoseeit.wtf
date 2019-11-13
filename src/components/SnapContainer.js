import React from "react";
import styled from "styled-components";

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

class SnapContainer extends React.Component {
  state = {
    y: 0,
    style: { scrollSnapType: " y mandatory" },
  };
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }
  onScroll() {
    // TODO fix this ref nonsense
    // If more than one element is in view, enable scroll snapping
    // this way scroll snapping doesn't mess with elements larger than the viewport height
    const scrollY =
      this.container.current.scrollTop + this.container.current.offsetTop;
    const top = scrollY;
    const bottom = top + this.container.current.offsetHeight;
    const down = this.state.y < scrollY;
    const inView = this.props.scrollElements.filter(ref => {
      const dom = ref.current.container.current;
      const elementTop = dom.offsetTop;
      const elementBottom = elementTop + dom.offsetHeight;
      return !(top >= elementBottom || bottom <= elementTop);
    });
    console.log(bottom - top);
    if (
      inView.length === 0 ||
      (inView.length === 1 &&
        inView[0].current.container.current.offsetHeight > bottom - top)
    ) {
      this.setState({
        style: { scrollSnapType: "none" },
      });
    } else {
      this.setState({
        style: { scrollSnapType: "y mandatory" },
      });
    }
    this.setState({
      scrollY,
    });
  }
  render() {
    return (
      <Container
        style={this.state.style}
        onScroll={() => this.onScroll()}
        ref={this.container}
      >
        {this.props.children}
      </Container>
    );
  }
}

export default SnapContainer;
