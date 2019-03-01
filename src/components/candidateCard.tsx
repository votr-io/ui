import styled from "@emotion/styled";
import React, {
  useCallback,
  ChangeEvent,
  useMemo,
  useEffect,
  useRef,
  useLayoutEffect
} from "react";
import { renderToString } from "react-dom/server";
import { AnimatedFlex, Input } from "./controls";
import { card, makeShadow, pink, divider } from "./styles";
import { Bold, Text } from "./typography";
import { Candidate, PropTypes } from "./types";
import { Flex } from "@rebass/grid/emotion";

const Card = styled(AnimatedFlex)<{ elevation?: number }>`
  max-width: 320px;
  min-height: 60px;
  border-radius: 4px;
  border-left: 4px solid #6e6e6e;
  background: ${card.css()};
  padding: 4px 16px;
  margin: 8px 0;
  ${p => makeShadow(p.elevation == null ? 2 : p.elevation)}
`;

const TEXTAREA_PADDING = 4;
const PADDING_BOTTOM = 3;
const Editable = styled.textarea<{ disabled?: boolean }>`
  position: relative;
  flex: 1 0 auto;
  padding: ${TEXTAREA_PADDING}px 0;
  border: 0px;
  border-bottom: 1px solid ${p => (p.disabled ? "transparent" : divider.css())};
  margin-bottom: 0.5em;
  outline: none;
  transition: border-color 0.2s ease-out;
  resize: none;

  &:focus {
    border-color: ${pink.css()};
  }
`;

const BoldEditable = Bold.withComponent(Editable);
const TextEditable = Text.withComponent(Editable);

interface Props {
  editable?: boolean;
  candidate: Candidate;
  onCandidateChange?: (c: Candidate) => void;
  borderColor?: string;
}

const resize = ($el: HTMLElement | null) => {
  if ($el == null) {
    return;
  }
  $el.style.height = "0px";
  $el.style.height = `${$el.scrollHeight - TEXTAREA_PADDING * 2}px`;
};

const removeNewlines = (str: string) => str.replace(/(\r\n|\n|\r)/gm, "");

export const CandidateCard: React.FC<
  Props & PropTypes<typeof Card>
> = React.memo(
  ({
    children,
    editable,
    onCandidateChange,
    candidate,
    borderColor,
    elevation,
    ...otherProps
  }) => {
    const $name = React.createRef<HTMLTextAreaElement>();
    const $description = React.createRef<HTMLTextAreaElement>();

    const onNameChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (candidate == null || onCandidateChange == null) {
          return;
        }
        onCandidateChange({
          ...candidate,
          name: removeNewlines(e.target.value)
        });
      },
      [candidate]
    );

    const onDescriptionChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (candidate == null || onCandidateChange == null) {
          return;
        }
        onCandidateChange({
          ...candidate,
          description: removeNewlines(e.target.value)
        });
      },
      [candidate]
    );

    useLayoutEffect(() => {
      resize($name.current);
      resize($description.current);
    });

    console.log("card render");
    return (
      <Card
        {...otherProps}
        style={{ borderColor: borderColor || "#555", ...otherProps.style }}
        elevation={elevation || 2}
      >
        {candidate == null || children ? (
          children
        ) : (
          <Flex flex="1" flexDirection="column" justifyContent="space-around">
            <BoldEditable
              placeholder="name"
              rows={1}
              value={candidate.name}
              onChange={onNameChange}
              ref={$name}
              maxLength={50}
              required
              disabled={!editable}
            />
            <TextEditable
              placeholder="description"
              rows={1}
              value={candidate.description}
              onChange={onDescriptionChange}
              ref={$description}
              maxLength={80}
              disabled={!editable}
            />
          </Flex>
        )}
      </Card>
    );
  }
);
