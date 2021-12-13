import {
  bindSelectors,
  createMutableDuck,
  dispatch,
  useActions,
  StoreChunk,
  usePick
} from '@ngrx-ducks/core';
import { counterFeatureName, State } from '../counter.feature';
import * as selectors from './counter-mutable.selectors';
import { CounterState } from './counter.state';

const initialState = {
  count: 0,
  isLoading: true
};

@StoreChunk<State>({
  feature: counterFeatureName,
  slice: 'counterMutable',
  defaults: initialState
})
export class CounterMutableFacade {
  static actions = useActions(CounterMutableFacade);

  pick = usePick();
  select = bindSelectors(selectors);

  /**
   *
   * You can also create aliases or build selector groups
   *
   * progress = bindSelectors({ isLoading: selectors.isLoading });
   * counter = bindSelectors({ count: selectors.currentCount });
   *
   */

  readonly loadCount = createMutableDuck(
    '[Counter] Load Count',
    dispatch<number>()
  );

  increment = createMutableDuck(
    '[Counter] Increment value',
    (state: CounterState, payload: number) => (state.count += payload)
  );

  decrement = createMutableDuck(
    '[Counter] Decrement value',
    (state: CounterState, payload: number) => (state.count -= payload)
  );

  override = createMutableDuck(
    '[Counter] Set value',
    (state: CounterState, payload: number) => {
      state.count = payload;
      state.isLoading = false;
    }
  );

  math = {
    square: createMutableDuck('[Counter] Square', () => {
      console.log('adasdsa');
    })
  };
}
