import React, { useMemo } from "react";
import { Candidate } from "./types";
import { Flex } from "@rebass/grid/emotion";
import styled from "@emotion/styled";
import { makeShadow, divider, gradient_dark, gradient_light } from "./styles";
import { Subtitle } from "./typography";
import { CandidateCard } from "./candidateCard";
import chroma from "chroma-js";

const gradient = chroma.scale([gradient_dark, gradient_light]);

export interface BallotProps {
  candidates: Candidate[];
  votes: string[];
  onChange: (votes: string[]) => void;
}

export const Ballot: React.FC<BallotProps> = ({
  candidates,
  votes,
  onChange
}) => {
  const idMap = useMemo(() => {
    return candidates.reduce(
      (idMap, candidate) => {
        idMap[candidate.id] = candidate;
        return idMap;
      },
      {} as Record<string, Candidate>
    );
  }, [candidates]);
  const candidateIds = Object.keys(idMap);
  const offBallot = candidateIds
    .filter(id => !votes.includes(id))
    .map(id => idMap[id]);
  const onBallot = votes.map<Candidate>(id => idMap[id]);

  return (
    <Flex flexDirection="row" flex="1 0 auto">
      <Flex flexDirection="column" flex="1" p="8px 16px">
        <Flex
          pb="16px"
          justifyContent="center"
          flex="0 0 auto"
          style={{ borderBottom: `1px solid ${divider.css()}` }}
        >
          <Subtitle>Candidates</Subtitle>
        </Flex>
        <VoteContainer>
          {offBallot.map((candidate, i) => (
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
          <Subtitle>Ballot</Subtitle>
        </Flex>
        <Flex flexDirection="column" flex="1">
          <CandidateContainer>
            {onBallot.map((candidate, i) => (
              <CandidateCard
                key={i}
                candidate={candidate}
                // borderColor={desaturated_gradient(
                //   i / (election.candidates.length - 1)
                // ).css()}
              />
            ))}
          </CandidateContainer>
        </Flex>
      </Flex>
    </Flex>
  );
};

const VoteContainer = styled(Flex)`
  flex-direction: column;
  flex: 1 0 auto;
  padding: 16px;
`;

const CandidateContainer = styled(VoteContainer)`
  ${makeShadow(2).inset}
  border-radius: 2px;
`;

const Placeholder = styled(Flex)`
  height: 56px;
  margin: 8px 0;
  flex-direction: row;
  align-items: center;
`;
