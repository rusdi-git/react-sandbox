import { useSearchParams } from 'react-router-dom';
import qs from 'qs';

export function useUrlParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const getParams = (key: string, defaultValue: string | number | object = '') => {
    switch (typeof defaultValue) {
      case 'string':
        return searchParams.get(key) || defaultValue;
      case 'number':
        return Number(searchParams.get(key)) || defaultValue;
      case 'object':
        return qs.parse(searchParams.get(key) || '') || defaultValue;
      default:
        return null;
    }
  };

  const setParams = (key: string, val: string | number | object) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    switch (typeof val) {
      case 'string':
        setSearchParams({ ...currentParams, [key]: val });
        break;
      case 'number':
        setSearchParams({ ...currentParams, [key]: String(val) });
        break;
      default:
        setSearchParams({ ...currentParams, [key]: qs.stringify(val) });
    }
  };
  return { getParams, setParams };
}
