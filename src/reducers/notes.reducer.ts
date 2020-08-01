/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  FETCH_NOTES_FAILURE,
  FETCH_NOTES_SUCCESS,
  OPEN_NEW_NOTE_DIALOG,
  CLOSE_EDIT_NOTE_DIALOG,
  CLOSE_NEW_NOTE_DIALOG,
  OPEN_EDIT_NOTE_DIALOG
} from '@constants/actions/notes';
import Note from '@interfaces/Note';

// The initial application state
const initialState: any = {
  entities       : null,
  searchText     : '',
  selectedNoteIds: [],
  routeParams    : {},
  noteDialog     : {
    type : 'new',
    props: {
      open: false
    },
    note: null
  },
  notes: []
};

// Takes care of changing the application state
export default (
  state = initialState,
  { type, note, notes }: { type: string; notes?: Note[]; note?: Note }
) => {
  switch (type) {
  case FETCH_NOTES_SUCCESS: 
    return { ...state, notes };
  case FETCH_NOTES_FAILURE: 
    return { ...state, notes: [] };
  case OPEN_NEW_NOTE_DIALOG: {
    return {
      ...state,
      noteDialog: {
        type : 'new',
        props: {
          open: true
        },
        note: null
      }
    };
  }
  case CLOSE_EDIT_NOTE_DIALOG: {
    return {
      ...state,
      noteDialog: {
        type : 'edit',
        props: {
          open: false
        },
        note: null
      }
    };
  }
  case CLOSE_NEW_NOTE_DIALOG: {
    return {
      ...state,
      noteDialog: {
        type : 'new',
        props: {
          open: false
        },
        note: null
      }
    };
  }

  case OPEN_EDIT_NOTE_DIALOG: 
    return {
      ...state,
      noteDialog: {
        type : 'edit',
        props: {
          open: true
        },
        note
      }
    };
  default: 
    return state;
  }
};
