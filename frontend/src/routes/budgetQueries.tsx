import React from 'react'
import {useQuery} from 'react-query'
import axios from "axios";
import {endpoints} from './backendEndpoints'
type Props = {

}

function getEndpoint(endpoint: string){
  return `${endpoints.backend}/${endpoint}`
}

export type Response = {
  data: any, 
  status: string, 
  error: any
  isFetching: boolean, 
  refetch: any
}


export async function AsyncPost(data: any, endpoint: string, onSuccess: any, onError: any = (error: any) => console.log(error)){
  const url = getEndpoint(endpoint)
  await axios.post(url, data).then((response: any)=> onSuccess(response.data)).catch((error) => onError(error.response.data));
  
}

function post(data: any, endpoint: string){
  const getResults = async () => {
    const url = getEndpoint(endpoint)
    const result = await axios.post(url, data)
    return result.data
  }
  return getResults;
}


export function Post(params: any, endpoint: string, enabled = false, onSuccess = () => {}, onError = () => {}, retry = 1): Response {
  const { data, status, error, isFetching, refetch } = useQuery([endpoint, params], post(params, endpoint), {
      refetchInterval: false, 
      refetchOnWindowFocus: false,
      retry: retry, 
      enabled: enabled, 
      onSuccess: onSuccess, 
      onError: onError
    }
  )
  return {data, status, error, isFetching, refetch}
}

export default function budgetQueries() {
  return (
    <div>budgetQueries</div>
  )
}
