import styled from "styled-components";
import { BoxProps } from "./types";

export const Styles = {
  Container: styled.div<BoxProps>`
    width: ${({ width }) => width};
    min-width: ${({ minWidth }) => minWidth};
    max-width: ${({ maxWidth }) => maxWidth};
    height: ${({ height }) => height};
    min-height: ${({ minHeight }) => minHeight};
    max-height: ${({ maxHeight }) => maxHeight};
    background-color: ${({ backgroundColor }) => backgroundColor};
    border-radius: ${({ borderRadius }) => borderRadius};

    padding: ${({ padding }) => padding};
    padding-left: ${({ paddingLeft, paddingX }) => paddingLeft || paddingX};
    padding-right: ${({ paddingRight, paddingX }) => paddingRight || paddingX};
    padding-top: ${({ paddingTop, paddingY }) => paddingTop || paddingY};
    padding-bottom: ${({ paddingBottom, paddingY }) =>
      paddingBottom || paddingY};

    margin: ${({ margin }) => margin};
    margin-left: ${({ marginLeft, marginX }) => marginLeft || marginX};
    margin-right: ${({ marginRight, marginX }) => marginRight || marginX};
    margin-top: ${({ marginTop, marginY }) => marginTop || marginY};
    margin-bottom: ${({ marginBottom, marginY }) => marginBottom || marginY};

    display: flex;
    flex-direction: column;
    align-items: ${({ alignX }) => {
      if (alignX === "left") {
        return "flex-start";
      }
      if (alignX === "center") {
        return "center";
      }
      if (alignX === "right") {
        return "flex-end";
      }
    }};
    justify-content: ${({ alignY }) => {
      if (alignY === "top") {
        return "flex-start";
      }
      if (alignY === "center") {
        return "center";
      }
      if (alignY === "bottom") {
        return "flex-end";
      }
    }};
  `,
};