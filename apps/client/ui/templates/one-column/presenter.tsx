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

export const Component: React.VFC = () => (
  <Wrapper>
    <Section>
      <Atoms.Heading.Component headingLevel="h2">
        Select single
      </Atoms.Heading.Component>

      <Components.SelectSingle.Component options={options} />
    </Section>

    <Section>
      <Atoms.Heading.Component headingLevel="h2">
        Select multiple
      </Atoms.Heading.Component>
    </Section>
  </Wrapper>
);

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
