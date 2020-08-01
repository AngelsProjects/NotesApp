import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { NoteIcon } from './Icons';
import LanguageSwitcher from './LanguageSwitcher';

export default memo(function CustomToolbar() {
  const { t }   = useTranslation('translations');
  return (
    <AppBar id='toolbar' className='flex relative z-10' color='default' style={{ backgroundColor: '#718096' }}>
      <Toolbar className='px-20'>
        <div className='flex flex-1'>
          <div className='flex items-center flex-shrink-0 text-black mr-6'>
            <NoteIcon style={{ color: '#ED8936' }} size='2x'/>
            <span className='m-10 font-semibold text-xl tracking-tight'>
              {t('notesApp')}
            </span>
          </div>
        </div>
        <div className='flex'>
          <LanguageSwitcher />
        </div>
      </Toolbar>
    </AppBar>
  );
});
