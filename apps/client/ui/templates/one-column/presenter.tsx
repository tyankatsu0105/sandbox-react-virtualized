import * as React from 'react';
import styled from 'styled-components';

import * as Atoms from '~client/ui/atoms';
import * as Components from '~client/ui/components';
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
  const [values, setValues] = React.useState<string[]>([]);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);
  const handleChange: Components.SelectSingle.ChangeHandler = React.useCallback(
    (values) => {
      setValues([...values]);
    },
    [setValues]
  );
  const handleErrorChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsError(event.target.checked);
    },
    [setIsError]
  );
  const handleDisabledChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsDisabled(event.target.checked);
    },
    [setIsError]
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
          isError={isError}
          disabled={isDisabled}
          errorMessage={'error!!!!!!!'}
          onChange={handleChange}
        />
        values: {JSON.stringify(values, null, 2)}
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
