import styled from "@emotion/styled-base";
import { Flex } from "@rebass/grid/emotion";
import chroma from "chroma-js";
import { CandidateCard } from "../src/components/candidateCard";
import { Button } from "../src/components/controls";
import {
  divider,
  gradient_dark,
  gradient_light,
  makeShadow,
  foreground
} from "../src/components/styles";
import { PageProps } from "../src/components/types";
import { Headline, Subheader, Text } from "../src/components/typography";

const gradient = chroma.scale([gradient_dark, gradient_light]);

const PageContainer = styled(Flex)`
  flex: 0 0 auto;
  flex-direction: column;
  width: 1080px;
  background: ${foreground.css()};
  ${makeShadow(8)};
`;

const VoteContainer = styled(Flex)`
  flex-direction: column;
  flex: 1 0 auto;
  padding: 16px;
`;

const CandidateContainer = styled(VoteContainer)`
  ${makeShadow(2).inset}
  border-radius: 2px;
`;

const Header = styled(Flex)`
  flex-direction: column;
  flex: 0 0 auto;
  margin: 16px 16px 8px;
  padding-bottom: 8px;
  align-items: baseline;
`;

const election = {
  name: "The Animal Kingdom",
  description: "...you know the one from the CGPGray video.",
  candidates: [
    { name: "Tiger", description: "So feirce!" },
    { name: "Gorilla", description: "Pretty mellow guy." },
    { name: "Turtle", description: "Chill AF." },
    { name: "Leopard", description: "Real cool cat." },
    { name: "Owl", description: "Who?" }
  ]
};

const Placeholder = styled(Flex)`
  height: 56px;
  margin: 8px 0;
  flex-direction: row;
  align-items: center;
`;

const VotePage: React.FC<PageProps> = props => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      flex="1"
      style={{
        overflow: "auto"
      }}
    >
      <Flex flex="1" />
      <PageContainer>
        <Header>
          <Headline style={{ marginRight: 8 }}>{election.name}</Headline>
          <Text>{election.description}</Text>
        </Header>
        <Flex flexDirection="row" flex="1 0 auto">
          <Flex flexDirection="column" flex="1" p="8px 16px">
            <Flex
              pb="16px"
              justifyContent="center"
              flex="0 0 auto"
              style={{ borderBottom: `1px solid ${divider.css()}` }}
            >
              <Subheader>Candidates</Subheader>
            </Flex>
            <VoteContainer>
              {election.candidates.map((candidate, i) => (
                <CandidateCard
                  key={i}
                  candidate={candidate}
                  // borderColor={desaturated_gradient(
                  //   i / (election.candidates.length - 1)
                  // ).css()}
                />
              ))}
            </VoteContainer>
          </Flex>
          <Flex flexDirection="column" flex="2" p="8px 16px">
            <Flex pb="16px" justifyContent="center" flex="0 0 auto">
              <Subheader>Ballot</Subheader>
            </Flex>
            <Flex flexDirection="column" flex="1">
              <CandidateContainer>
                {/* {election.candidates.map((candidate, i) => (
                  <CandidateCard
                    key={i}
                    candidate={candidate}
                    borderColor={gradient(
                      i / (election.candidates.length - 1)
                    ).css()}
                  />
                ))} */}
              </CandidateContainer>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          flexDirection="row"
          flex="0 0 auto"
          p="8px 16px 16px"
          justifyContent="flex-end"
        >
          <Button>Submit</Button>
        </Flex>
      </PageContainer>
      <Flex flex="2" />
    </Flex>
  );
};

export default VotePage;
