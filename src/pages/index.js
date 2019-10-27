import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout.js";
import Logo from "../components/Logo.js";
import Button from "../components/Button.js";
import config from "../Config.json";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.section`
  text-align: center;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

class Index extends React.Component {
  render() {
    console.log(config);
    console.log("test");
    return (
      <Layout>
        <FlexContainer>
          <Section>
            <Logo {...config.files.logo} />
          </Section>
          <Section>
            <h2>{config.text.mainSubHeader}</h2>
            <p>{config.text.raidTimes}</p>
          </Section>
          <Section>
            <Button href={config.links.apply}>Apply Now</Button>
          </Section>
        </FlexContainer>
      </Layout>
    );
  }
}

export default Index;
