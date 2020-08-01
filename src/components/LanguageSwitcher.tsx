/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-dynamic-require */
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { isNil } from 'ramda';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import languages from '../constants/languages';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation('translations');
  const [menu, setMenu] = useState(null);
  let currentLng: any = languages.find((lng) => i18n.language === lng.id);
  if(isNil(currentLng))[currentLng] = languages;
  const userMenuClick = (event) => {
    setMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setMenu(null);
  };

  function handleLanguageChange(lng) {
    /*
        Change Language
         */
    i18n.changeLanguage(lng.id);
  }
  return (
    <>
      <Button className='h-64 w-64' onClick={userMenuClick}>
        <img
          className='mx-4 min-w-20'
          src={require(`../assets/images/flags/${currentLng.flag}.png`)}
          alt={currentLng.title}
        />

        <Typography className='mx-4 font-semibold text-lg tracking-tight'>{currentLng.id}</Typography>
      </Button>

      <Popover
        open={Boolean(menu)}
        anchorEl={menu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical  : 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical  : 'top',
          horizontal: 'center'
        }}
        classes={{
          paper: 'py-8'
        }}
      >
        {languages.map((lng) => (
          <MenuItem key={lng.id} onClick={() => handleLanguageChange(lng)}>
            <ListItemIcon className='min-w-40'>
              <img
                className='min-w-20'
                src={require(`../assets/images/flags/${lng.flag}.png`)}
                alt={lng.title}
              />
            </ListItemIcon>
            <ListItemText primary={lng.title} />
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}
