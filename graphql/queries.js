import { gql } from '@apollo/client';

export const GET_SNOWBOARDERS = gql`
  query GetSnowboarders {
    snowboarders {
      name
      id
      revelstokeMatchupId
      duelsMatchupId
      country
    }
  }
`;

export const GET_USER = gql`
  query GetUser($uid: String) {
    members(uid: $uid) {
      id
      name
      leagues {
        id
        name
        brackets {
          id
          userName
          name
        }
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($uid: String, $name: String, $email: String) {
    insert_members(uid: $uid, name: $name, emailAddress: $email) {
      id
    }
  }
`;

export const CREATE_LEAGUE = gql`
  mutation CreateLeague($name: String, $memberRecordId: String) {
    insert_leagues(
      name: $name
      members: [$memberRecordId]
      admin: [$memberRecordId]
    ) {
      id
    }
  }
`;

export const JOIN_LEAGUE = gql`
  mutation JoinLeague($id: String, $memberRecordIds: [String]) {
    update_leagues(id: $id, members: $memberRecordIds) {
      id
    }
  }
`;

export const GET_LEAGUE_BRACKETS = gql`
  query GetLeagueBrackets($id: String) {
    leagues(id: $id) {
      brackets {
        name
        userName
        dR1M1 {
          name
        }
        dR1M2 {
          name
        }
        dR1M3 {
          name
        }
        dR1M4 {
          name
        }
        dR1M5 {
          name
        }
        dR1M6 {
          name
        }
        dR1M7 {
          name
        }
        dR1M8 {
          name
        }
        rR1M1 {
          name
        }
      }
    }
  }
`;

export const GET_LEAGUE_CONFIG = gql`
  query GetLeagueConfig($id: String) {
    leagues(id: $id) {
      id
      name
      admin {
        id
      }
    }
  }
`;

export const GET_LEAGUE_MEMBERS = gql`
  query GetLeagueMembers($id: String) {
    leagues(id: $id) {
      members {
        id
        name
      }
    }
  }
`;

export const CREATE_BRACKET = gql`
  mutation CreateBracket($name: String, $memberId: String) {
    insert_userBrackets(name: $name, memberId: [$memberId]) {
      id
    }
  }
`;

export const GET_BRACKET = gql`
  query GetBracket($recId: String) {
    userBrackets(id: $recId) {
      dR1M1 {
        name
      }
      dR1M2 {
        name
      }
      dR1M3 {
        name
      }
      dR1M4 {
        name
      }
      dR1M5 {
        name
      }
      dR1M6 {
        name
      }
      dR1M7 {
        name
      }
      dR1M8 {
        name
      }
      rR1M1 {
        name
      }
    }
  }
`;

export const UPDATE_USER_BRACKET = gql`
  mutation UPDATE_USER_BRACKET(
    $id: String
    $R_R1_M1: [String]
    $R_R1_M2: [String]
    $R_R1_M3: [String]
    $R_R1_M4: [String]
    $R_R1_M5: [String]
    $R_R1_M6: [String]
    $R_R1_M7: [String]
    $R_R1_M8: [String]
    $R_R2_M1: [String]
    $R_R2_M2: [String]
    $R_R2_M3: [String]
    $R_R2_M4: [String]
    $R_R3_M1: [String]
    $R_R3_M2: [String]
    $R_R4_M1: [String]
    $R_R5_M1: [String]
  ) {
    update_userBrackets(
      id: $id
      rR1M1: $R_R1_M1
      rR1M2: $R_R1_M2
      rR1M3: $R_R1_M3
      rR1M4: $R_R1_M4
      rR1M5: $R_R1_M5
      rR1M6: $R_R1_M6
      rR1M7: $R_R1_M7
      rR1M8: $R_R1_M8
      rR2M1: $R_R2_M1
      rR2M2: $R_R2_M2
      rR2M3: $R_R2_M3
      rR2M4: $R_R2_M4
      rR3M1: $R_R3_M1
      rR3M2: $R_R3_M2
      rR4M1: $R_R4_M1
      rR5M1: $R_R5_M1
    ) {
      id
    }
  }
`;

export const GET_WINNERS = gql`
  query GetWinners($name: String) {
    winners(name: $name) {
      dR1M1 {
        name
      }
      dR1M2 {
        name
      }
      dR1M3 {
        name
      }
      dR1M4 {
        name
      }
      dR1M5 {
        name
      }
      dR1M6 {
        name
      }
      dR1M7 {
        name
      }
      dR1M8 {
        name
      }
      rR1M1 {
        name
      }
    }
  }
`;

export const EDIT_LEAGUE_NAME = gql`
  mutation EditLeagueName($id: String, $leagueName: String) {
    update_leagues(id: $id, name: $leagueName) {
      id
    }
  }
`;
