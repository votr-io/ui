import styled from "@emotion/styled";
import { Flex } from "@rebass/grid/emotion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { animated, useTransition } from "react-spring";

function isDark(color: chroma.Color): boolean {
  return color.luminance() < 0.5;
}

enum States {
  enabled = "enabled",
  hover = "hover",
  focus = "focus",
  selected = "selected",
  activated = "activated",
  pressed = "pressed",
  dragged = "dragged"
}

const baseOverlayOpacity: Record<States, number> = {
  enabled: 0,
  hover: 0.04,
  focus: 0.12,
  selected: 0.08,
  activated: 0.12,
  pressed: 0.16,
  dragged: 0.08
};

function overlayColor(colors: TouchableProps, state: States) {
  const { ink, surface } = colors;
  const opacity = baseOverlayOpacity[state];
  const factor = isDark(surface) ? 2 : 1;
  return ink.alpha(opacity * factor);
}

export interface TouchableProps {
  ink: chroma.Color;
  surface: chroma.Color;
}

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: background-color 0.3s ease-out;
`;

const OverlayContainer = styled(Flex)`
  position: relative;
  overflow: hidden;
`;

const TouchableWrapper = styled.div<TouchableProps>`
  min-height: 48px;
  min-width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover ${Overlay} {
    background: ${p => overlayColor(p, States.hover).css()};
  }
`;

interface RippleProps {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
}
export const Ripple = styled(animated.div)<RippleProps>`
  position: absolute;
  top: ${p => p.y}px;
  left: ${p => p.x}px;
  height: ${p => p.radius * 2}px;
  width: ${p => p.radius * 2}px;
  border-radius: 50%;
  background: ${p => p.color};
`;

let _id = 0;
const nextId = () => `${++_id}`;

function calculateRadius(t: number, r: number, b: number, l: number): number {
  return Math.max(
    Math.sqrt(t ** 2 + l ** 2),
    Math.sqrt(t ** 2 + r ** 2),
    Math.sqrt(b ** 2 + l ** 2),
    Math.sqrt(b ** 2 + r ** 2)
  );
}

export const Touchable: React.FC<TouchableProps> = React.memo(
  ({ children, ...props }) => {
    const wrapper = useRef<HTMLDivElement>(null);
    const [ripples, setRipples] = useState<RippleProps[]>([]);
    const animations = useTransition(ripples, r => r.id, {
      //@ts-ignore
      from: () => ({
        transform: `scale(0)`,
        opacity: 0.5
      }),
      //@ts-ignore
      enter: () => ({
        transform: `scale(1)`,
        opacity: 1
      }),
      //@ts-ignore
      leave: item => async next => {
        await next({
          transform: `scale(1)`,
          opacity: 1
        });
        await next({
          opacity: 0
        });
      }
    });
    const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (wrapper.current == null) {
        return;
      }
      const { clientX, clientY } = e;
      const { top, left } = wrapper.current.getBoundingClientRect();
      const centerX = clientX - left;
      const centerY = clientY - top;
      const fromRight = wrapper.current.clientWidth - centerX;
      const fromBottom = wrapper.current.clientHeight - centerY;
      const radius = calculateRadius(centerY, fromRight, fromBottom, centerX);

      const x = centerX - radius;
      const y = centerY - radius;
      setRipples(ripples =>
        ripples.concat({
          x,
          y,
          radius,
          id: nextId(),
          color: overlayColor(props, States.pressed).css()
        })
      );
    }, []);
    const onMouseUp = useCallback(() => {
      setRipples([]);
    }, []);

    useEffect(() => {
      document.addEventListener("mouseup", onMouseUp);

      () => document.removeEventListener("mouseup", onMouseUp);
    }, []);

    return (
      <TouchableWrapper {...props} onMouseDown={onMouseDown}>
        <OverlayContainer ref={wrapper}>
          <Overlay />
          {//
          //@ts-ignore
          animations.map(({ item, props }) => (
            <Ripple {...item} style={props} key={item.id} />
          ))}
          {children}
        </OverlayContainer>
      </TouchableWrapper>
    );
  }
);
