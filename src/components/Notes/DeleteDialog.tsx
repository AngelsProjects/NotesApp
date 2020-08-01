/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DeleteDialog({ handleDelete, open, handleClose, t, note: { title } }: any) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          <h2>{`${t('deleteNoteQuestion')}"${title}"?`}</h2>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h3>{t('wontAbleToDelete')}</h3>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDelete} color='secondary' variant  = 'contained'>
            {t('yesDeleteIt')}
          </Button>
          <Button onClick={handleClose} color='primary' variant  = 'contained'>
            {t('close')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
