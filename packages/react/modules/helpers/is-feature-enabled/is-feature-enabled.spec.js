import warning from 'warning';
import isFeatureEnabled from './is-feature-enabled';

jest.mock('warning');

describe('with existing flag', () => {
  describe('with flag variation', () => {
    const props = { fooFlag: 'foo-variation' };

    it('should indicate feature being enabled', () => {
      expect(isFeatureEnabled('fooFlag', 'foo-variation')(props)).toBe(true);
    });

    it('should indicate feature being disabled', () => {
      expect(isFeatureEnabled('fooFlag', 'foo-variation-1')(props)).toBe(false);
    });
  });

  describe('without flag variation', () => {
    it('should indicate feature being enabled', () => {
      const props = { fooFlag: true };
      expect(isFeatureEnabled('fooFlag')(props)).toBe(true);
    });

    it('should indicate feature being disabled', () => {
      const props = { fooFlag: false };
      expect(isFeatureEnabled('fooFlag')(props)).toBe(false);
    });
  });
});

describe('with non normalized flag', () => {
  it('should indicate feature being disabled', () => {
    const props = { fooFlag: true };
    expect(isFeatureEnabled('foo-flag')(props)).toBe(false);
  });

  it('should invoke `warning`', () => {
    const props = { fooFlag: false };
    isFeatureEnabled('fooFlag')(props);

    expect(warning).toHaveBeenCalled();
  });
});

describe('with non existing flag', () => {
  it('should indicate feature being disabled', () => {
    const props = { fooFlag: true };
    expect(isFeatureEnabled('fooFlag2')(props)).toBe(false);
  });
});
