// @flow

import type {
  User,
  AdapterState,
  AdapterArgs,
  Flags,
  OnStatusStateChangeCallback,
  OnFlagsStateChangeCallback,
} from '@flopflip/types';

const adapterState: AdapterState = {
  flags: {},
  user: {},
};

const configure = ({
  user,
  onFlagsStateChange,
  onStatusStateChange,
}: AdapterArgs): Promise<any> => {
  adapterState.user = user;

  return Promise.resolve().then(() => {
    adapterState.isConfigured = true;
    adapterState.isReady = true;

    adapterState.onFlagsStateChange = onFlagsStateChange;
    adapterState.onStatusStateChange = onStatusStateChange;

    onStatusStateChange({ isReady: adapterState.isReady });
    onFlagsStateChange(adapterState.flags);
  });
};

const reconfigure = ({ user }: { user: User }): Promise<any> => {
  updateUser(user);

  adapterState.flags = {};
  adapterState.onFlagsStateChange({});

  return Promise.resolve();
};

const updateUser = (user: User): User => {
  adapterState.user = user;
};

export const updateFlags = (flags: Flags): void => {
  adapterState.flags = {
    ...adapterState.flags,
    ...flags,
  };

  adapterState.onFlagsStateChange(adapterState.flags);
};

export const getUser = (): User => adapterState.user;

export default {
  configure,
  reconfigure,
};
