export {
  injectFeatureToggle,
  injectFeatureToggles,
  branchOnFeatureToggle,
  ToggleFeature,
  SwitchFeature,
  FlagsSubscription,
} from './components';

export { default as isFeatureEnabled } from './helpers/is-feature-enabled';
export {
  DEFAULT_FLAG_PROP_KEY,
  DEFAULT_FLAGS_PROP_KEY,
  ALL_FLAGS_PROP_KEY,
} from './constants';

export { version } from '../package.json';
