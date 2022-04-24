import { useEffect, useState } from 'react';
import {
  FetchListType,
  FetchStateListType,
  FetchStateType,
  UseFetchListReturnType,
  UseFetchReturnType,
} from './type';

export function useFetch<T>(func: () => Promise<T>, loadEarly = true): UseFetchReturnType<T> {
  const [fetchState, setFetchState] = useState<FetchStateType<T>>({
    isLoading: loadEarly,
    isError: false,
    errorMessage: '',
    data: null,
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await func();
        setFetchState({ isLoading: false, isError: false, errorMessage: '', data });
      } catch (error: unknown) {
        setFetchState({
          isLoading: false,
          isError: true,
          errorMessage: (error as Error).message,
          data: null,
        });
      }
    };
    if (fetchState.isLoading) getData();
  }, [fetchState.isLoading]);
  const toggleLoading = () => {
    setFetchState({ ...fetchState, isLoading: !fetchState.isLoading });
  };
  return { state: fetchState, toggleLoading };
}

export function useFetchList<T>(
  func: (limit: number, offset: number) => Promise<FetchListType<T>>,
  limit: number,
  offset: number
): UseFetchListReturnType<T> {
  const [fetchState, setFetchState] = useState<FetchStateListType<T>>({
    isLoading: true,
    isError: false,
    errorMessage: '',
    data: null,
    limit,
    offset,
    total: 0,
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await func(fetchState.limit, fetchState.offset);
        setFetchState({
          ...fetchState,
          ...{
            isLoading: false,
            isError: false,
            errorMessage: '',
            data: response.data,
            total: response.total,
          },
        });
      } catch (error: unknown) {
        setFetchState({
          ...fetchState,
          ...{
            isLoading: false,
            isError: true,
            errorMessage: (error as Error).message,
            data: null,
          },
        });
      }
    };
    if (fetchState.isLoading) getData();
  }, [fetchState.isLoading]);
  const reloadData = () => {
    setFetchState({ ...fetchState, isLoading: false });
  };
  const changeLimit = (val: number) => {
    setFetchState({ ...fetchState, ...{ isLoading: !fetchState.isLoading, limit: val } });
  };
  const changeOffset = (val: number) => {
    setFetchState({ ...fetchState, ...{ isLoading: !fetchState.isLoading, offset: val } });
  };
  return { state: fetchState, reloadData, changeLimit, changeOffset };
}
