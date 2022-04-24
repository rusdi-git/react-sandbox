export interface PaginatedTableBasicData {
  id: string;
}

export interface PaginatedTableCell<T extends PaginatedTableBasicData, K extends keyof T> {
  value: T[K];
  field: string;
  idValue: string;
  type?: string;
}

export interface PaginatedTableRow<T extends PaginatedTableBasicData, K extends keyof T> {
  columns: PaginatedTableColumnType<K>[];
  data: T;
}

export interface PaginatedTableColumnType<K> {
  field: K;
  label: string;
  type?: string;
}

export interface PaginatedTableType<T extends PaginatedTableBasicData, K extends keyof T> {
  columns: PaginatedTableColumnType<K>[];
  data: T[];
  page: number;
  total: number;
  changePage?: (val: number) => void;
  linkField?: string;
  urlFunc?: (val: string) => string;
  isLoading?: boolean;
}
