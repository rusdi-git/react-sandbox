import { LayoutProps } from '@chakra-ui/react';
import { Control, FieldError } from 'react-hook-form';

export interface BasicData {
  id: string;
}

export interface TableCell<T extends BasicData> {
  value: T[keyof T];
  field: string;
  idValue: string;
  type?: string;
}

export interface TableRow<T extends BasicData> {
  columns: ColumnType<keyof T>[];
  data: T;
}

export interface ColumnType<K> {
  field: K;
  label: string;
  type?: string;
}

export interface TableType<T extends BasicData> {
  columns: ColumnType<keyof T>[];
  data: T[];
  page: number;
  total: number;
  changePage?: (val: number) => void;
  linkField?: string;
  urlFunc?: (val: string) => string;
  isLoading?: boolean;
}

export interface ChakraFieldProps {
  error?: FieldError;
  field: string;
  label?: string | null;
  control: Control;
  type?: string;
}

export interface ChakraAutoCompleteFieldProps<T> {
  triggerEffectValue?: (data: T) => void;
  fetchData: (params: { filter: string }) => Promise<T[]>;
  labelKey: keyof T;
  label: string;
  field: string;
  currentInputSource?: string;
}

export interface ChakraRadioFieldProps extends ChakraFieldProps {
  valueMap: { value: string; label?: string }[];
}

export type CalendarMode = 'date' | 'month' | 'year';

export interface CalendarContext {
  state: { selected: Date | null; displayed: Date; mode: CalendarMode };
  changeSelected?: (val: Date) => void;
  changeDisplayed?: (val: Date, mode: CalendarMode) => void;
}

export interface ChakraRadioFieldProps extends ChakraFieldProps {
  valueMap: { value: string; label?: string }[];
}
