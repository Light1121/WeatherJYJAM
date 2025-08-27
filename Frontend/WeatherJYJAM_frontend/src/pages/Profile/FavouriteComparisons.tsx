import type { FC } from "react";
import styled from "styled-components";

const Section = styled.div`
  background-color: #bfdbfe;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  padding-left: 1.25rem;
  list-style: disc;
`;

const FavouriteComparisons: FC = () => (
  <Section>
    <Title>Favourite Comparisons</Title>
    <List>
      <li>Comparison</li>
      <li>Comparison</li>
      <li>Comparison</li>
    </List>
  </Section>
);

export default FavouriteComparisons;
