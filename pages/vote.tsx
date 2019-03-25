import styled from "@emotion/styled-base";
import { Flex } from "@rebass/grid/emotion";
import chroma from "chroma-js";
import { useState } from "react";
import { Ballot } from "../src/components/ballot";
import { Button } from "../src/components/controls";
import {
  foreground,
  gradient_dark,
  gradient_light,
  makeShadow
} from "../src/components/styles";
import { PageProps } from "../src/components/types";
import { Headline, Text } from "../src/components/typography";
import { useGetElection } from "../src/generated/apolloHooks";
import { Page, Content } from "../src/components/page";
import { CandidateCard } from "../src/components/candidateCard";

const ID = "04a36ba7-0ea3-4052-a323-873bea0b2b68";
const TOKEN =
  "21effad760ffe38541cc06977f22ea929b13c0b4d539b8c6f81f5c13f2f1decbb9f6551526237999ed7bc2035450b80a3c1ac9c1b52ddb7e9f205c2825494bb8204d806b1924f5f4cb4dc70f621badcbd388e42dccb5e2840dfcb5dcacaef24bbd1cd472ac9786b7c55ef1b0827fb426f2c3284fa7";

const Header = styled(Flex)`
  flex-direction: column;
  flex: 0 0 auto;
  margin: 16px 16px 8px;
  padding-bottom: 8px;
  align-items: center;
`;

const VotePage: React.FC<PageProps> = props => {
  const id = props.path.split("/")[2];
  const { loading, error, data } = useGetElection({ id });
  const [votes, setVotes] = useState<string[]>([]);

  if (loading || data == null) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error {error.message}</div>;
  }

  const [election] = data.getElections.elections;

  return (
    <Page>
      <Flex flex="1" flexDirection="column" alignItems="center">
        <Content flex="1 0 auto" flexDirection="column">
          <Header>
            <Headline style={{ marginRight: 8 }}>{election.name}</Headline>
            <Text>{election.description}</Text>
          </Header>
          <Flex flex="1 0 auto">
            <Ballot
              candidates={election.candidates}
              votes={votes}
              onChange={setVotes}
            />
          </Flex>
          <Flex
            flexDirection="row"
            flex="0 0 auto"
            p="8px 16px 16px"
            justifyContent="flex-end"
          >
            <Button>Submit</Button>
          </Flex>
        </Content>
      </Flex>
    </Page>
  );
};

export default VotePage;
