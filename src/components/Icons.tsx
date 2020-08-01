/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  fab,
  faAcquisitionsIncorporated
} from '@fortawesome/free-brands-svg-icons';
import {
  faBacteria,
  faBiohazard,
  faBug,
  faPlus,
  faStickyNote
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

library.add(
  fab,
  faPlus,
  faStickyNote,
  faAcquisitionsIncorporated,
  faBacteria,
  faBiohazard,
  faBug
);

export const NoteIcon = (props: any) => (
  <FontAwesomeIcon icon='sticky-note' {...props} />
);
export const PlusIcon = (props: any) => (
  <FontAwesomeIcon icon='plus' {...props} />
);

export const CustomIcon = (props: any) => <FontAwesomeIcon {...props} />;
