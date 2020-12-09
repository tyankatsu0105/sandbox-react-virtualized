import * as React from 'react';
import styled from 'styled-components';

// ----------------------------------------
// props
// ----------------------------------------
type Props = {
  options: {
    value: string;
    label: string;
  }[];
  isOpen: boolean;
  handleClickControlOpen: () => void;
  handleClickControlClose: () => void;
  handleKeyDownControlOpen: (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => void;
  handleKeyDownControlClose: (
    event: React.KeyboardEvent<HTMLLIElement>
  ) => void;
  values: string[];
  handleClickOptionListItem: (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
  handleKeyDownOptionListItem: (
    event: React.KeyboardEvent<HTMLLIElement>
  ) => void;
};

// ----------------------------------------
// component
// ----------------------------------------

export const Component: React.VFC<Props> = (props) => (
  <>
    <Control
      tabIndex={0}
      onClick={props.handleClickControlOpen}
      onKeyDown={props.handleKeyDownControlOpen}
    >
      {props.values.length > 0 ? (
        props.values[0]
      ) : (
        <Placeholder>選択してください</Placeholder>
      )}

      <OpenToggle>{props.isOpen ? 'CLOSE' : 'OPEN'}</OpenToggle>
    </Control>

    {props.isOpen && (
      <OptionListWrap>
        <OptionList>
          {props.options.map((option) => (
            <OptionListItem
              key={option.value}
              tabIndex={0}
              data-value={option.value}
              onClick={props.handleClickOptionListItem}
              onKeyDown={props.handleKeyDownOptionListItem}
            >
              {option.label}
            </OptionListItem>
          ))}
        </OptionList>
      </OptionListWrap>
    )}
  </>
);

// ----------------------------------------
// styles
// ----------------------------------------

const Control = styled.div`
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.colors.common.black};
  height: 40px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacer(2)};
`;

const Placeholder = styled.p`
  color: ${(props) => props.theme.colors.grey[500]};
`;

const OpenToggle = styled.div`
  padding-left: ${(props) => props.theme.spacer(4)};
`;

const OptionListWrap = styled.div`
  border-radius: 6px;

  transform: translateY(20px);
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.2);
  /* max-height: 150px; */
  /* overflow-y: scroll; */
`;

const OptionList = styled.ul``;

const OptionListItem = styled.li`
  cursor: pointer;
  padding: ${(props) => props.theme.spacer(2)}
    ${(props) => props.theme.spacer(3)} ${(props) => props.theme.spacer(2)}
    ${(props) => props.theme.spacer(3)};
  &:hover {
    background-color: ${(props) => props.theme.colors.green[200]};
  }
`;
