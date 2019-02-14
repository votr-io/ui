import { PageProps } from "../components/types";
import styled from "@emotion/styled-base";
import { AnimatedFlex } from "../components/controls";
import {
  pink,
  card_disabled,
  elevations,
  disabled,
  gradient_light,
  gradient_dark
} from "../components/styles";
import { Flex } from "@rebass/grid/emotion";
import { Bold, Text } from "../components/typography";
import chroma from "chroma-js";

const CandidateCard = styled(AnimatedFlex)`
  border-radius: 4px;
  border-left: 10px solid ${disabled.css()};
  background: ${card_disabled.css()};
  flex-direction: column;
  padding: 8px 16px;
  margin: 8px 0;
  ${elevations[2]}
`;

const cards = [...Array(10)].map((v, i) => i);
const gradient = chroma.scale([gradient_dark, gradient_light]);

const VotePage: React.FC<PageProps> = props => {
  return (
    <Flex flexDirection="column" flex="1" alignItems="flex-start">
      {cards.map(i => {
        const color = gradient(i / (cards.length - 1));
        return (
          <CandidateCard
            key={i}
            style={{
              borderColor: color.css()
              // backgroundColor: color.alpha(0.16).css()
            }}
          >
            <Bold>Candidate Name</Bold>
            <Text>Candidate description</Text>
          </CandidateCard>
        );
      })}
    </Flex>
  );
};

export default VotePage;
