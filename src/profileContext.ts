import React from 'react';
import { ProfileResource } from '@medplum/core';

const profileContext = React.createContext<ProfileResource | null>(null) as React.Context<ProfileResource>;

export { profileContext };
