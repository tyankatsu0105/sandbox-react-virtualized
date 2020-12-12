import * as React from 'react';
import {
  List as ReactVirtualizedList,
  ListRowProps as ReactVirtualizedListRowProps,
} from 'react-virtualized/dist/commonjs/List';
import { AutoSizer as ReactVirtualizedAutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import { CSSTransition } from 'react-transition-group';

import styled from 'styled-components';

// ----------------------------------------
// helpers
// ----------------------------------------
const transitionClassName = 'fade';

// ----------------------------------------
// props
// ----------------------------------------
type Props = {
  options: {
    value: string;
    label: string;
  }[];
  errorMessage?: string;
  isError?: boolean;
  disabled?: boolean;
  isOpen: boolean;
  handleClickControlOpen: () => void;
  handleClickControlClose: () => void;
  handleKeyDownControlOpen: (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => void;
  handleKeyDownControlClose: (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => void;
  values: string[];
  handleClickOptionListItem: (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
  handleKeyDownOptionListItem: (
    event: React.KeyboardEvent<HTMLLIElement>
  ) => void;
  handleClickResetValue: () => void;
  handleEnterResetValue: (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  menuItemRef: React.MutableRefObject<HTMLLIElement>;
  controlRef: React.MutableRefObject<HTMLDivElement>;
};

// ----------------------------------------
// component
// ----------------------------------------

export const Component: React.VFC<Props> = (props) => {
  const rowRenderer = (rowRendererProps: ReactVirtualizedListRowProps) => {
    const option = props.options[rowRendererProps.index];
    const tabIndex = props.isOpen ? 0 : -1;
    const isSelected = props.values.includes(option.value);

    const createRef = () => {
      if (rowRendererProps.index === 0) return props.menuItemRef;
      if (props.menuItemRef.current == null && rowRendererProps.index === 0)
        return props.menuItemRef;
      if (option.value === props.values[0]) return props.menuItemRef;
    };

    return (
      <OptionListItem
        ref={createRef()}
        key={rowRendererProps.key}
        style={rowRendererProps.style}
        tabIndex={tabIndex}
        data-value={option.value}
        onClick={props.handleClickOptionListItem}
        onKeyDown={props.handleKeyDownOptionListItem}
        isSelected={isSelected}
      >
        {option.label}
      </OptionListItem>
    );
  };

  const scrollToIndex = React.useMemo(() => {
    if (props.values.length === 0) return 0;

    const index = props.options.findIndex(
      (option) => option.value === props.values[0]
    );
    return index;
  }, [props.options, props.values]);

  return (
    <>
      <Wrap>
        <Control
          ref={props.controlRef}
          tabIndex={0}
          isError={props.isError}
          disabled={props.disabled}
          onClick={
            props.isOpen
              ? props.handleClickControlClose
              : props.handleClickControlOpen
          }
          onKeyDown={
            props.isOpen
              ? props.handleKeyDownControlClose
              : props.handleKeyDownControlOpen
          }
        >
          <HiddenInput value={props.values} aria-hidden tabIndex={-1} />
          {props.values.length > 0 ? (
            props.values[0]
          ) : (
            <Placeholder disabled={props.disabled}>
              選択してください
            </Placeholder>
          )}

          <OpenToggle>{props.isOpen ? 'CLOSE' : 'OPEN'}</OpenToggle>
        </Control>

        {props.isError && <ErrorText>{props.errorMessage}</ErrorText>}

        <CSSTransition
          classNames={transitionClassName}
          timeout={700}
          in={props.isOpen}
        >
          <OptionListWrap>
            <OptionList>
              <ReactVirtualizedAutoSizer>
                {({ height, width }) => (
                  <ReactVirtualizedList
                    tabIndex={-1}
                    scrollToIndex={scrollToIndex}
                    width={width}
                    height={height}
                    rowCount={props.options.length}
                    rowHeight={40}
                    rowRenderer={rowRenderer}
                  />
                )}
              </ReactVirtualizedAutoSizer>
            </OptionList>
          </OptionListWrap>
        </CSSTransition>
      </Wrap>

      <ButtonWrap>
        <Button
          type="button"
          onClick={props.handleClickResetValue}
          onKeyDown={props.handleEnterResetValue}
        >
          clear
        </Button>
      </ButtonWrap>
    </>
  );
};

// ----------------------------------------
// styles
// ----------------------------------------

const Wrap = styled.div`
  position: relative;
`;

type ControlProps = {
  isError: Props['isError'];
  disabled: Props['disabled'];
};
const Control = styled.div<ControlProps>`
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.colors.common.black};
  border-color: ${(props) => props.isError && props.theme.colors.red[500]};
  height: 40px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => props.disabled && props.theme.colors.common.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacer(2)};

  background-color: ${(props) =>
    props.disabled && props.theme.colors.grey[600]};
`;

const HiddenInput = styled.input`
  width: 100%;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  bottom: 0;
  left: 0;
`;

type PlaceholderProps = {
  disabled: Props['disabled'];
};
const Placeholder = styled.p<PlaceholderProps>`
  color: ${(props) =>
    props.disabled
      ? props.theme.colors.common.white
      : props.theme.colors.grey[500]};
`;

const OpenToggle = styled.div`
  padding-left: ${(props) => props.theme.spacer(4)};
`;

const ErrorText = styled.p`
  margin-top: ${(props) => props.theme.spacer(1)};
  color: ${(props) => props.theme.colors.red[500]};
`;

const OptionListWrap = styled.div`
  border-radius: 6px;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.theme.colors.common.white};
  width: 100%;
  position: absolute;
  left: 0;
  opacity: 0;
  pointer-events: none;

  &.${transitionClassName}-appear, &.${transitionClassName}-enter {
    opacity: 0;
    transform: translate(0, 40px);
  }
  &.${transitionClassName}-appear-active,
    &.${transitionClassName}-enter-active,
    &.${transitionClassName}-enter-done {
    opacity: 1;
    transform: translate(0, 20px);
    transition: transform 0.4s, opacity 0.4s;
    pointer-events: auto;
  }
  &.${transitionClassName}-exit {
    opacity: 1;
    transform: translate(0, 20px);
    pointer-events: auto;
  }
  &.${transitionClassName}-exit-active {
    opacity: 0;
    transform: translate(0, 40px);
    transition: transform 0.4s, opacity 0.4s;
  }
`;

const OptionList = styled.ul`
  height: 300px;
`;

type OptionListItemProps = {
  isSelected: boolean;
};
const OptionListItem = styled.li<OptionListItemProps>`
  cursor: pointer;
  background-color: ${(props) =>
    props.isSelected && props.theme.colors.lightGreen[400]};
  padding: ${(props) => props.theme.spacer(2)}
    ${(props) => props.theme.spacer(3)} ${(props) => props.theme.spacer(2)}
    ${(props) => props.theme.spacer(3)};
  &:hover {
    background-color: ${(props) => props.theme.colors.grey[300]};
  }
  &:focus {
    outline: none;
    background-color: ${(props) => props.theme.colors.grey[400]};
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${(props) => props.theme.spacer(2)};
`;
const Button = styled.button`
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.common.white};
  border: 1px solid ${(props) => props.theme.colors.common.black};
  border-radius: 6px;
  font-weight: bold;
  text-align: center;
  padding: ${(props) => props.theme.spacer(2)}
    ${(props) => props.theme.spacer(3)};
`;
