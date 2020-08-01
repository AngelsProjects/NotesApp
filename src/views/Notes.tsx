/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import logo from '@assets/images/logo.svg';
// import '@styles/App.scss';
import INote from '@interfaces/Note';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getNotes, openNewNoteDialog } from '../actions/notes';
import { PlusIcon } from '../components/Icons';
import Loading from '../components/Loading';
import Note from '../components/Notes/Note';
import NoteDialog from '../components/Notes/NoteDialog';
import Scrollbars from '../components/Scrollbars';
import SearchBar from '../components/SearchBar';
import { useDebounce } from '../utils/hooks';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(1)
  },
  content: {
    position                    : 'relative',
    display                     : 'flex',
    overflow                    : 'auto',
    flex                        : '1 1 auto',
    flexDirection               : 'column',
    width                       : '100%',
    '-webkit-overflow-scrolling': 'touch',
    zIndex                      : 3,
    height                      : '75%'
  }
}));

export default withRouter(function App(props: any): ReactElement {
  const dispatch: any                 = useDispatch();
  const classes                       = useStyles(props);
  const { t }                         = useTranslation('translations');
  const notes                         = useSelector(({ notesView }: any): INote[] => notesView.notes);
  const [searchText, setSearchText]   = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchText           = useDebounce(searchText, 500);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  // Here's where the API call happens
  // We use useEffect since this is an asynchronous action
  useEffect(
    () => {
      // Make sure we have a value (user has entered something in input)
      if (debouncedSearchText || debouncedSearchText === '') {
        // Set isSearching state
        setIsSearching(true);
        // Fire off our API call
        dispatch(getNotes(debouncedSearchText))
          .then(() => {
            // Set back to false since request finished
            setIsSearching(false);
          })
          .catch((e: any) => {
            console.log('error in:', e);
            setIsSearching(false);
          });
      }
    },
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (searchTerm) hasn't changed for more than 500ms.
    [debouncedSearchText]
  );

  return (
    <>
      <div className = 'flex flex-wrap h-full w-full px-64'>
        <div
          className = 'w-full mb-4 flex items-center mt-20'
          style     = {{ height: '15%' }}
        >
          <div className = 'w-3/4 items-center'>
            <SearchBar
              placeholder = {t('searchBar')}
              onChange    = {(e: any) => setSearchText(e.target.value)}
            />
          </div>
          <div className = 'w-1/4 flex justify-center items-center'>
            <Button
              variant   = 'contained'
              color     = 'primary'
              size      = 'large'
              className = {clsx(classes.button, 'w-1/2')}
              startIcon = {<PlusIcon />}
              onClick   = {() => dispatch(openNewNoteDialog())}
            >
              {t('newNote')}
            </Button>
          </div>
        </div>
        <Scrollbars
          className = {clsx('w-full rounded shadow-lg mb-20', classes.content)}
          scrollToTopOnRouteChange
        >
          {(isSearching && <Loading t={t}/>) || (
            <div className = 'w-full h-full flex flex-wrap justify-between items-center px-40'>
              {notes.map((note: INote, key: number) => (
                <Note note = {note} key = {key} />
              ))}
            </div>
          )}
        </Scrollbars>
      </div>
      <NoteDialog />
    </>
  );
});
