import * as React from 'react';
import styled from 'styled-components';

import * as Atoms from '~client/ui/atoms';
import * as Components from '~client/ui/components';
import * as Shared from '~client/shared';
import * as ApplicationUtils from '~client/application/utils';
// ----------------------------------------
// helpers
// ----------------------------------------

const options = Array.from({ length: 1000 }).map((_, index) => ({
  label: `list-${index}`,
  value: index.toString(),
}));

// ----------------------------------------
// props
// ----------------------------------------

// ----------------------------------------
// component
// ----------------------------------------

export const Component: React.VFC = () => {
  const [selectSingleValues, setSelectSingleValues] = React.useState<string[]>(
    []
  );
  const [selectSingleIsError, setSelectSingleIsError] = React.useState<boolean>(
    false
  );
  const [selectSingleIsDisabled, setSelectSingleIsDisabled] = React.useState<
    boolean
  >(false);
  const handleChange: Components.SelectSingle.ChangeHandler = React.useCallback(
    (values) => {
      setSelectSingleValues([...values]);
    },
    [setSelectSingleValues]
  );
  const handleErrorChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectSingleIsError(event.target.checked);
    },
    [setSelectSingleIsError]
  );
  const handleDisabledChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectSingleIsDisabled(event.target.checked);
    },
    [setSelectSingleIsDisabled]
  );

  const handleClickResetValue = React.useCallback(() => {
    handleChange([]);
    setSelectSingleValues([]);
  }, [setSelectSingleValues, handleChange]);

  const handleEnterResetValue = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      Shared.Utils.Keys.keyDownHandler({
        event,
        keyCode: ApplicationUtils.KeyCode.keyCode.Enter,
        callback: () => {
          handleChange([]);
          setSelectSingleValues([]);
        },
      });
    },
    [setSelectSingleValues, handleChange]
  );
  return (
    <Wrapper>
      <Section>
        <Atoms.Heading.Component headingLevel="h2">
          Select single
        </Atoms.Heading.Component>
        <CheckBoxListWrap>
          <CheckBoxItemLabel htmlFor="error">
            <CheckBox
              type="checkbox"
              name="error"
              id="error"
              onChange={handleErrorChange}
            />
            error
          </CheckBoxItemLabel>
          <CheckBoxItemLabel htmlFor="disable">
            <CheckBox
              type="checkbox"
              name="disable"
              id="disable"
              onChange={handleDisabledChange}
            />
            disabled
          </CheckBoxItemLabel>
        </CheckBoxListWrap>
        <Components.SelectSingle.Component
          options={options}
          isError={selectSingleIsError}
          disabled={selectSingleIsDisabled}
          errorMessage={'error!!!!!!!'}
          onChange={handleChange}
          values={selectSingleValues}
          valuesUpdateHandler={setSelectSingleValues}
        />
        <ButtonWrap>
          <Button
            type="button"
            onClick={handleClickResetValue}
            onKeyDown={handleEnterResetValue}
          >
            clear
          </Button>
        </ButtonWrap>
        values: {JSON.stringify(selectSingleValues, null, 2)}
      </Section>
      <Section>
        <Atoms.Heading.Component headingLevel="h2">
          Select multiple
        </Atoms.Heading.Component>
      </Section>
    </Wrapper>
  );
};

// ----------------------------------------
// styles
// ----------------------------------------
const Wrapper = styled.main`
  padding: ${(props) => props.theme.spacer(2)};
`;

const Section = styled.section`
  & + & {
    margin-top: ${(props) => props.theme.spacer(5)};
  }
`;

const CheckBoxListWrap = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacer(2)};
`;
const CheckBoxItemLabel = styled.label`
  font-size: 1rem;
`;
const CheckBox = styled.input``;

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
