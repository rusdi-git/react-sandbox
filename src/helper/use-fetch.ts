import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FetchListType,
  FetchStateListType,
  FetchStateType,
  UseFetchListReturnType,
  UseFetchReturnType,
} from './type';

export function useFetch<T, P = undefined>(
  func: (x?: P) => Promise<T>,
  loadEarly = true,
  initialParams?: P
): UseFetchReturnType<T> {
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
        setFetchState({
          isLoading: false,
          isError: false,
          errorMessage: '',
          data,
        });
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
  const reloadData = () => {
    setFetchState({ ...fetchState, isLoading: true });
  };
  return { state: fetchState, reloadData };
}

export function useFetchList<T>(
  func: (limit: number, offset: number) => Promise<FetchListType<T>>,
  loadEarly = true
): UseFetchListReturnType<T> {
  const limit = 10;
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParams = searchParams.get('page');
  const offset = pageParams ? (Number(pageParams) - 1) * 10 : 0;
  const [fetchState, setFetchState] = useState<FetchStateListType<T>>({
    isLoading: loadEarly,
    isError: false,
    errorMessage: '',
    data: [],
    limit,
    total: 0,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await func(fetchState.limit, offset);
        setFetchState({
          ...fetchState,
          ...{
            isFetch: false,
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
            isFetch: false,
            isLoading: false,
            isError: true,
            errorMessage: (error as Error).message,
            data: [],
          },
        });
      }
    };
    if (fetchState.isLoading) getData();
  }, [fetchState.isLoading]);

  useEffect(() => {
    if (!fetchState.isLoading) reloadData();
  }, [pageParams]);
  const reloadData = () => {
    setFetchState({ ...fetchState, isLoading: true });
  };
  const changeLimit = (val: number) => {
    setFetchState({ ...fetchState, ...{ isFetch: true, limit: val } });
  };
  const changePage = (val: number) => {
    setSearchParams({ page: String(val) });
  };
  return {
    state: { ...fetchState, page: Number(pageParams || 1) },
    reloadData,
    changeLimit,
    changePage,
  };
}
