import * as React from 'react';
import styled from 'styled-components';

// ----------------------------------------
// props
// ----------------------------------------

// ----------------------------------------
// component
// ----------------------------------------

export const Component: React.VFC = () => (
  <Wrapper>
    <Heading>Sandbox React Virtualized</Heading>
    <a
      target="_blank"
      rel="noreferrer"
      href="https://github.com/tyankatsu0105/sandbox-react-virtualized"
    >
      GitHub
    </a>
  </Wrapper>
);

// ----------------------------------------
// styles
// ----------------------------------------
const Wrapper = styled.header`
  padding: ${(props) => props.theme.spacer(2)};
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 2rem;
`;
