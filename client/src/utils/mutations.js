import { gql } from "@apollo/client";

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_AMMO = gql`
  mutation addAmmo($profileId: ID!, $ammo: String!) {
    addAmmo(profileId: $profileId, ammo: $ammo) {
      _id
      name
      ammos
    }
  }
`;

export const REMOVE_PROFILE = gql`
  mutation removeAmmo {
    removeAmmo(ammo: $ammo) {
      _id
      name
      ammos
    }
  }
`;
