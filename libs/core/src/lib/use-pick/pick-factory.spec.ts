import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { pickFactory } from './pick-factory';

describe(pickFactory.name, () => {
  describe('When a plain selector is passed', () => {
    it('yields a stream containing the selected data', () => {
      const store: Store<any> = { pipe: () => of(null) } as any;
      const picker = pickFactory(store);
      const selectorFeature = createFeatureSelector<null>('nullish');
      const selectorNumber = createSelector(selectorFeature, _state => null);

      const selected = picker.pick(selectorNumber);
      expect(selected).toBeInstanceOf(Observable);
    });
  });

  describe('When a selector factory is passed', () => {
    it('yields a stream containing the selected data', () => {
      const store: Store<any> = { pipe: () => of(undefined) } as any;
      const picker = pickFactory(store);
      const selectorNumber = () =>
        createSelector(
          (state: any, props: any) => state.counter[props.id],
          (counter: any, props: any) => counter * props.multiply
        );

      const selected = picker.pick(selectorNumber(), {
        id: 'counter2',
        multiply: 2
      });

      expect(selected).toBeInstanceOf(Observable);
    });
  });
});
