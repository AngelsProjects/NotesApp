/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  ADD_NOTE_SUCCESS,
  CLOSE_EDIT_NOTE_DIALOG,
  CLOSE_NEW_NOTE_DIALOG,
  FETCH_NOTES_FAILURE,
  FETCH_NOTES_SUCCESS,
  OPEN_EDIT_NOTE_DIALOG,
  OPEN_NEW_NOTE_DIALOG,
  REMOVE_NOTE_SUCCESS,
  UPDATE_NOTE_SUCCESS
} from '@constants/actions/notes';
import Note from '@interfaces/Note';
import { equals, prop } from 'ramda';
import api from '@services/api';

export function getNotes(searchText?: string) {
  const request = api.searchNotes(searchText);
  return (dispatch: any) =>
    request.then((response: any) => {
      if (equals(prop('code')(response), 200)) {
        dispatch({
          type : FETCH_NOTES_SUCCESS,
          notes: response.data
        });
      } else {
        dispatch({
          type: FETCH_NOTES_FAILURE
        });
      }
    });
}

export function openNewNoteDialog() {
  return {
    type: OPEN_NEW_NOTE_DIALOG
  };
}

export function closeNewNoteDialog() {
  return {
    type: CLOSE_NEW_NOTE_DIALOG
  };
}

export function openEditNoteDialog(note: Note) {
  return {
    type: OPEN_EDIT_NOTE_DIALOG,
    note
  };
}

export function closeEditNoteDialog() {
  return {
    type: CLOSE_EDIT_NOTE_DIALOG
  };
}

export function addNote(newNote: Note) {
  return (dispatch: any, getState: any) => {
    const { searchText } = getState().notesView;

    const request = api.createNote(newNote);

    return request.then(() =>
      Promise.all([
        dispatch({
          type: ADD_NOTE_SUCCESS
        })
      ]).then(() => dispatch(getNotes(searchText)))
    );
  };
}

export function updateNote(note: Note) {
  return (dispatch: any, getState: any) => {
    const { searchText } = getState().notesView;

    const request = api.updateNote(note);

    return request.then(() =>
      Promise.all([
        dispatch({
          type: UPDATE_NOTE_SUCCESS
        })
      ]).then(() => dispatch(getNotes(searchText)))
    );
  };
}

export function removeNote(noteId: string) {
  return (dispatch: any, getState: any) => {
    const { searchText } = getState().notesView;
    console.log('ation:', noteId);
    const request = api.deleteNote(noteId);

    return request.then(() =>
      Promise.all([
        dispatch({
          type: REMOVE_NOTE_SUCCESS
        })
      ]).then(() => dispatch(getNotes(searchText)))
    );
  };
}
