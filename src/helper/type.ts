export interface FetchStateType<T> {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  data: T | null;
}

export interface UseFetchReturnType<T> {
  state: FetchStateType<T>;
  reloadData: () => void;
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
  data: T[];
  limit: number;
  total: number;
}

export interface UseFetchListReturnType<T> {
  state: FetchStateListType<T> & { page: number };
  reloadData: () => void;
  changeLimit: (val: number) => void;
  changePage: (val: number) => void;
}
