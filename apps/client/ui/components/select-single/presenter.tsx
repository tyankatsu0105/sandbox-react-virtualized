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
  handleClose: () => void;
  handleClickControlOpen: () => void;
  handleClickControlClose: () => void;
  handleKeyDownControlOpen: (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => void;
  handleKeyDownControlClose: (
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
      <Placeholder>
        選択してください <input type="hidden" />
      </Placeholder>
      <OpenToggle>{props.isOpen ? 'CLOSE' : 'OPEN'}</OpenToggle>
    </Control>

    {props.isOpen && (
      <OptionListWrap>
        <OptionList>
          {props.options.map((option) => (
            <OptionListItem
              tabIndex={0}
              data-value={option.value}
              onClick={props.handleClose}
              onKeyDown={props.handleKeyDownControlClose}
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

  width: 100%;
  transform: translateY(20px);
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.2);
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
