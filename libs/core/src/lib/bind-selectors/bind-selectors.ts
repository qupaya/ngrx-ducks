import { MemoizedSelector } from '@ngrx/store';
import { throwError } from 'rxjs';
import { NgRxDucksNotConnectedError } from '../create-duck/create-duck-not-connected.error';
import { MemoizedSelectorFactory } from './types/memoized-selector-factory';
import { Selectors } from './types/selectors';

/**
 * @deprecated since version 13. Use useSelectors instead.
 */
export const bindSelectors = useSelectors;

export function useSelectors<
  T extends {
    [key: string]:
      | MemoizedSelector<any, any>
      | MemoizedSelectorFactory<any, any>;
  }
>(selectors: T): Selectors<T> {
  const selectorFunctions = Object.keys(selectors).reduce(
    (functions, selector) => ({
      ...functions,
      [selector]: throwError(new NgRxDucksNotConnectedError())
    }),
    {}
  );

  return {
    ...selectorFunctions,
    __ngrx_ducks__selectors_original: selectors
  } as any;
}
