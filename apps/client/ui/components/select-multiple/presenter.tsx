import * as React from 'react';
import {
  List as ReactVirtualizedList,
  ListRowProps as ReactVirtualizedListRowProps,
} from 'react-virtualized/dist/commonjs/List';
import { AutoSizer as ReactVirtualizedAutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import { CSSTransition } from 'react-transition-group';

import styled from 'styled-components';

import * as Atoms from '~client/ui/atoms';

import { Option } from './container';

// ----------------------------------------
// helpers
// ----------------------------------------
const transitionClassName = 'fade';
type Icon = keyof typeof Atoms.Icon.icons;

// ----------------------------------------
// props
// ----------------------------------------
type Props = {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  options: Option[];
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
  selectedOptions: Option[];
  handleClickOptionListItem: (params: {
    event: React.MouseEvent<HTMLDivElement, MouseEvent>;
    option: Props['options'][number];
  }) => void;
  handleKeyDownOptionListItem: (params: {
    event: React.KeyboardEvent<HTMLDivElement>;
    option: Props['options'][number];
  }) => void;
  menuItemRef: React.MutableRefObject<HTMLDivElement>;
  controlRef: React.MutableRefObject<HTMLDivElement>;
  componentWrapRef: React.MutableRefObject<any>;
  handleClickRemoveItemButton: (params: {
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    option: Props['options'][number];
  }) => void;
  handleKeyDownRemoveItemButton: (params: {
    event: React.KeyboardEvent<HTMLButtonElement>;
    option: Props['options'][number];
  }) => void;
};

// ----------------------------------------
// component
// ----------------------------------------

export const Component: React.VFC<Props> = (props) => {
  const rowRenderer = (rowRendererProps: ReactVirtualizedListRowProps) => {
    const option = props.options[rowRendererProps.index];
    const tabIndex = props.isOpen ? 0 : -1;
    const isSelected = props.selectedOptions.some(
      (selectedOption) => selectedOption.value === option.value
    );

    const createRef = () => {
      if (rowRendererProps.index === 0) return props.menuItemRef;
      if (props.menuItemRef.current == null && rowRendererProps.index === 0)
        return props.menuItemRef;
      if (
        option.value ===
        props.selectedOptions[props.selectedOptions.length - 1]?.value
      )
        return props.menuItemRef;
    };

    const icon: Icon = isSelected ? 'checked' : 'unChecked';

    return (
      <OptionListItem
        ref={createRef()}
        key={rowRendererProps.key}
        style={rowRendererProps.style}
        tabIndex={tabIndex}
        onClick={(event) => props.handleClickOptionListItem({ event, option })}
        onKeyDown={(event) =>
          props.handleKeyDownOptionListItem({ event, option })
        }
        isSelected={isSelected}
      >
        <OptionListItemIconWrap>
          <Atoms.Icon.Component icon={icon}></Atoms.Icon.Component>
        </OptionListItemIconWrap>

        <span>{option.label}</span>
      </OptionListItem>
    );
  };

  const scrollToIndex = React.useMemo(() => {
    if (props.selectedOptions.length === 0) return 0;

    const index = props.options.findIndex(
      (option) =>
        option.value ===
        props.selectedOptions[props.selectedOptions.length - 1].value
    );
    return index;
  }, [props.options, props.selectedOptions]);

  return (
    <Wrap ref={props.componentWrapRef}>
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
        <HiddenInput
          value={props.selectedOptions.map(
            (selectedOption) => selectedOption.value
          )}
          aria-hidden
          tabIndex={-1}
          {...props.inputProps}
        />
        {props.selectedOptions.length > 0 ? (
          <SelectValueWrap
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
          >
            {props.selectedOptions.map((selectedOption) => (
              <SelectValue>
                <SelectValueLabel>{selectedOption.label}</SelectValueLabel>
                <SelectValueButton
                  onClick={(event) =>
                    props.handleClickRemoveItemButton({
                      event,
                      option: selectedOption,
                    })
                  }
                  onKeyDown={(event) =>
                    props.handleKeyDownRemoveItemButton({
                      event,
                      option: selectedOption,
                    })
                  }
                >
                  <Atoms.Icon.Component
                    icon="close"
                    size={16}
                  ></Atoms.Icon.Component>
                </SelectValueButton>
              </SelectValue>
            ))}
          </SelectValueWrap>
        ) : (
          <Placeholder disabled={props.disabled}>選択してください</Placeholder>
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
  min-height: 40px;
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

const OptionList = styled.div`
  height: 300px;
`;

type OptionListItemProps = {
  isSelected: boolean;
};
const OptionListItem = styled.div<OptionListItemProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) =>
    props.isSelected && props.theme.colors.grey[300]};
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

const OptionListItemIconWrap = styled.div`
  color: ${(props) => props.theme.colors.lightGreen[700]};
  height: 100%;
  margin-right: ${(props) => props.theme.spacer(2)};
`;

const SelectValueWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const SelectValue = styled.div`
  cursor: auto;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.common.white};
  border: 1px solid ${(props) => props.theme.colors.lightGreen[700]};
  border-radius: 6px;
  margin-top: ${(props) => props.theme.spacer(1)};
  margin-left: ${(props) => props.theme.spacer(1)};
  padding: ${(props) => props.theme.spacer(1)}
    ${(props) => props.theme.spacer(2)};
`;
const SelectValueLabel = styled.span``;
const SelectValueButton = styled.button`
  cursor: pointer;
  display: flex;
  margin-left: ${(props) => props.theme.spacer(1)};
  color: ${(props) => props.theme.colors.red[400]};
`;
