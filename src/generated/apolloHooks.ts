/* tslint:disable */
// This file was automatically generated and should not be edited.
import gql from 'graphql-tag';
import { useQuery, QueryHookOptions, useMutation, MutationHookOptions } from 'react-apollo-hooks';

import { createElection, createElectionVariables } from './createElection';
import { GetElection, GetElectionVariables } from './GetElection';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type GeneratedQueryHookOptions<TVars = {}> = Omit<
  QueryHookOptions<TVars>,
  'variables'
>;    
    
type GeneratedMutationHookOptions<TData, TVars = {}> = MutationHookOptions<TData, TVars>


export const usecreateElection = (options: GeneratedMutationHookOptions<createElection, createElectionVariables> = {}) => {
  
  return useMutation<createElection, createElectionVariables>(createElectionMutation, {
    
    ...options,
  });
}
export const useGetElection = (variables: GetElectionVariables, options: GeneratedQueryHookOptions<GetElectionVariables> = {}) => {
  if (options.suspend === undefined) options.suspend = false;
  return useQuery<GetElection, GetElectionVariables>(GetElectionQuery, {
    variables,
    ...options,
  });
}


export const createElectionMutation = gql`mutation createElection($input:CreateElectionRequest!){createElection(input:$input){__typename election{__typename id}}}`
  
export const GetElectionQuery = gql`query GetElection($id:ID!){getElections(input:{ids:[$id]}){__typename elections{__typename candidates{__typename description id name}description id name status}}}`