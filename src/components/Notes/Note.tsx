/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteDialog from '@components/Notes/DeleteDialog';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import 'moment/locale/es';
import { isNil, propOr } from 'ramda';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { openEditNoteDialog, removeNote } from '../../actions/notes';
import languages from '../../constants/languages';
import { CustomIcon } from '../Icons';

export default function Note(props: any) {
  const dispatch = useDispatch();
  const { i18n, t }: any = useTranslation('translations');
  let currentLng: any = languages.find((lng) => i18n.language === lng.id);

  if (isNil(currentLng)) [currentLng] = languages;

  const { note } = props;

  // ;

  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    setOpen(true);
  };

  const handleCloseDelete = () => {
    setOpen(false);
  };
  return (
    <>
      <DeleteDialog
        note={note}
        handleClose={handleCloseDelete}
        open={open}
        t={t}
        handleDelete={() => {
          setOpen(false);
          dispatch(removeNote(note.id));
        }}
      />
      <div
        className='rounded-r-lg my-10 overflow-hidden shadow-lg'
        style={{
          width          : '30%',
          height         : '45%',
          backgroundColor: propOr('rgb(237, 137, 54)', 'color')(note),
          position       : 'relative'
        }}
      >
        <div
          className='px-8 py-0 flex flex-wrap items-center'
          style={{ marginTop: '1rem' }}
        >
          <CustomIcon icon={note.icon} size='2x' />
          <Typography variant='h5' style={{ width: '50%', marginLeft: 15 }}>
            {note.title}
          </Typography>
          <Tooltip title={t('edit')}>
            <IconButton
              aria-label='edit'
              size='small'
              style={{
                color  : 'white',
                padding: '14px 20px',
                margin : '8px 0',
                border : 'none',
                cursor : 'pointer',
                width  : 40,
                height : 40,
                opacity: 0.9
              }}
              onClick={() => dispatch(openEditNoteDialog(note))}
            >
              <EditIcon style={{ color: '#FFFF' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('delete')}>
            <IconButton
              aria-label='delete'
              size='small'
              style={{
                color  : 'white',
                padding: '14px 20px',
                margin : '8px 0',
                border : 'none',
                cursor : 'pointer',
                width  : 40,
                height : 40,
                opacity: 0.9
              }}
              onClick={() => handleDelete()}
            >
              <DeleteIcon style={{ color: '#E53E3E' }} />
            </IconButton>
          </Tooltip>
        </div>
        <Typography variant='h6' className='px-8'>
          {note.description.length > 250
            ? `${note.description.substring(0, 250)}...`
            : note.description}
        </Typography>
        <Typography
          variant='h6'
          className='px-8'
          style={{ position: 'absolute', bottom: 0, right: 0 }}
        >
          {t('lastUpdate')}{' '}
          <Moment toNow locale={currentLng.id}>
            {note.updatedDate}
          </Moment>
        </Typography>
      </div>
    </>
  );
}
