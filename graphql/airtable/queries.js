import { gql } from '@apollo/client';

export const GET_USER_CEREAL_SELECTIONS = gql`
  query GetUserCerealSelections {
    userCereals {
      id
      userName
    }
  }
`;
