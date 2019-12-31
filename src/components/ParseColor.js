// Libraries
import styled from "styled-components";

const colors = [
  {
    min: 1,
    color: "rgb(229, 204, 128)",
  },
  {
    min: 0.95,
    color: "rgb(255, 128, 0)",
  },
  {
    min: 0.75,
    color: "rgb(164, 54, 238)",
  },
  {
    min: 0.5,
    color: "rgb(0, 112, 255)",
  },
  {
    min: 0.25,
    color: "rgb(30, 255, 0)",
  },
  {
    min: 0,
    color: "#666",
  },
];

function getColor(parse) {
  const color = colors.find(parseColor => parse > parseColor.min - 0.000001);
  return color ?? colors[colors.length - 1].color;
}

const ParseColor = styled.span`
  color: ${props => getColor(props.parse)};
  filter: brightness(0.8);
`;

export default ParseColor;
