import * as React from 'react';
import styled from 'styled-components';

import * as Atoms from '~client/ui/atoms';
import * as Components from '~client/ui/components';
// ----------------------------------------
// helpers
// ----------------------------------------
const options = [
  {
    label: 'list-1',
    value: '1',
  },
  {
    label: 'list-2',
    value: '2',
  },
  {
    label: 'list-3',
    value: '3',
  },
  {
    label: 'list-4',
    value: '4',
  },
  {
    label: 'list-5',
    value: '5',
  },
];

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
