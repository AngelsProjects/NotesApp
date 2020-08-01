/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CustomIcon } from '@components/Icons';
import icons from '@constants/icons';
import Note from '@interfaces/Note';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { equals } from 'ramda';
import React, { useCallback, useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNote,
  closeEditNoteDialog,
  closeNewNoteDialog,
  updateNote
} from '../../actions/notes';
import useForm from '../../utils/hooks/useForm';

const defaultFormState: Note = {
  id          : '',
  title       : '',
  description : '',
  icon        : '',
  color       : '',
  creationDate: new Date(),
  updatedDate : new Date()
};

const useStyles = makeStyles(() => ({
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh'
  }
}));

export default function NoteDialog(props: any) {
  const dispatch                                   = useDispatch();
  const { t }                                      = useTranslation('translations');
  const classes                                    = useStyles(props);
  const [color, setColor]                          = useState('#319ABD');
  const [displayColorPicker, isDisplayColorPicker] = useState(false);

  const noteDialog                      = useSelector(({ notesView }: any) => notesView.noteDialog);
  const { form, handleChange, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (equals(noteDialog.type, 'edit') && noteDialog.note) {
      setColor(noteDialog.note.color);
      setForm({ ...noteDialog.note });
    }

    /**
     * Dialog type: 'new'
     */
    if (equals(noteDialog.type, 'new')) {
      setForm({
        ...defaultFormState,
        ...noteDialog.note
      });
    }
  }, [noteDialog.note, noteDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (noteDialog.props.open) {
      initDialog();
    }
  }, [noteDialog.props.open, initDialog]);

  function closeComposeDialog() {
    return equals(noteDialog.type, 'edit')
      ? dispatch(closeEditNoteDialog())
      :  dispatch(closeNewNoteDialog());
  }

  function canBeSubmitted() {
    return (
      form.title.length > 3 &&
      form.description.length > 3 &&
      form.color.length > 4 &&
      form.icon.length > 0
    );
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    if (equals(noteDialog.type, 'new')) {
      dispatch(addNote(form));
    } else {
      dispatch(updateNote(form));
    }
    closeComposeDialog();
  }

  function handleClosePicker() {
    isDisplayColorPicker(false);
  }

  function handleClickPicker() {
    isDisplayColorPicker(!displayColorPicker);
  }

  function handleChangePicker(color: any) {
    setColor(color.hex);
    setForm({ ...form, color: color.hex });
  }

  function handleChangeIcon(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, icon: event.target.value });
  }

  return (
    <Dialog
      classes={{
        paper: clsx('m-24', classes.dialogPaper)
      }}
      {...noteDialog.props}
      onClose = {closeComposeDialog}
      fullWidth
      maxWidth = 'xs'
    >
      <AppBar
        position  = 'static'
        elevation = {1}
        style     = {{ backgroundColor: color }}
      >
        <Toolbar    className = 'flex w-full'>
          <Typography variant   = 'h4' color = 'inherit'>
            {equals(noteDialog.type, 'new') ? t('newNote') : t('editNote')}
          </Typography>
        </Toolbar>
      </AppBar>
      <form
        noValidate
        onSubmit  = {handleSubmit}
        className = 'flex flex-col md:overflow-hidden h-full'
      >
        <DialogContent classes   = {{ root: 'p-24' }}>
          <div           className = 'flex'>
            <div           className = 'min-w-48 pt-20'>
              <Icon          color     = 'action'>account_circle</Icon>
            </div>

            <TextField
              className = 'mb-24'
              label     = {t('title')}
              autoFocus
              id       = 'title'
              name     = 'title'
              value    = {form.title}
              onChange = {handleChange}
              variant  = 'outlined'
              required
              fullWidth
            />
          </div>

          <div  className = 'flex'>
            <div  className = 'min-w-48 pt-20'>
              <Icon color     = 'action'>note</Icon>
            </div>
            <TextField
              className = 'mb-24'
              label     = {t('description')}
              id        = 'description'
              name      = 'description'
              value     = {form.description}
              onChange  = {handleChange}
              variant   = 'outlined'
              required
              multiline
              rows = {5}
              fullWidth
            />
          </div>

          <div className = 'flex'>
            <div className = 'min-w-48 pt-20' />
            <TextField
              className = 'mb-24 w-full'
              label     = {t('selectIcon')}
              select
              value    = {form.icon}
              onChange = {handleChangeIcon}
              variant  = 'outlined'
              required
              fullWidth
            >
              {icons.map((option, key) => (
                <MenuItem   key  = {key} value   = {option}>
                  <CustomIcon icon = {option} size = '2x' />
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className = 'flex'>
            <Button
              style   = {{ backgroundColor: color }}
              onClick = {handleClickPicker}
            >
              {t('chooseColor')}
            </Button>
            {displayColorPicker ? (
              <div
                style={{
                  position: 'absolute',
                  zIndex  : 2
                }}
              >
                <div
                  style={{
                    position: 'fixed',
                    top     : 0,
                    right   : 0,
                    bottom  : 0,
                    left    : 0
                  }}
                  onClick = {handleClosePicker}
                />
                <ChromePicker
                  color            = {color}
                  onChangeComplete = {handleChangePicker}
                />
              </div>
            ) : null}
          </div>
        </DialogContent>
        <div className = 'w-full bottom-0 absolute'>
          {equals(noteDialog.type, 'new') ? (
            <DialogActions className = 'justify-between p-8'>
              <div           className = 'px-16'>
                <Button
                  variant  = 'contained'
                  color    = 'primary'
                  onClick  = {handleSubmit}
                  type     = 'submit'
                  disabled = {!canBeSubmitted()}
                >
                  {t('add')}
                </Button>
              </div>
              <div className = 'px-16'>
                <Button
                  variant = 'contained'
                  color   = 'primary'
                  onClick = {closeComposeDialog}
                >
                  {t('close')}
                </Button>
              </div>
            </DialogActions>
          ) : (
            <DialogActions className = 'justify-between p-8'>
              <div           className = 'px-16'>
                <Button
                  variant  = 'contained'
                  type     = 'submit'
                  onClick  = {handleSubmit}
                  disabled = {!canBeSubmitted()}
                  style    = {{ backgroundColor: '#0693E3' }}
                >
                  {t('save')}
                </Button>
              </div>

              <div className = 'px-16'>
                <Button
                  variant = 'contained'
                  color   = 'primary'
                  onClick = {closeComposeDialog}
                >
                  {t('close')}
                </Button>
              </div>
            </DialogActions>
          )}
        </div>
      </form>
    </Dialog>
  );
}
