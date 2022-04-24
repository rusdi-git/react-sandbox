export interface FetchStateType<T> {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  data: T | null;
}

export interface UseFetchReturnType<T> {
  state: FetchStateType<T>;
  toggleLoading: () => void;
}

export interface FetchListType<T> {
  limit: number;
  offset: number;
  total: number;
  data: T[];
}

export interface FetchStateListType<T> {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  data: T[] | null;
  limit: number;
  offset: number;
  total: number;
}

export interface UseFetchListReturnType<T> {
  state: FetchStateListType<T>;
  reloadData: () => void;
  changeLimit: (val: number) => void;
  changeOffset: (val: number) => void;
}
