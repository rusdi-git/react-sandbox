export interface FetchStateType<T> {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  data: T | null;
  currentDataId: string;
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
  total: number;
}

export interface UseFetchListReturnType<T> {
  state: FetchStateListType<T> & { page: number };
  reloadData: () => void;
  changeLimit: (val: number) => void;
  changePage: (val: number) => void;
}
