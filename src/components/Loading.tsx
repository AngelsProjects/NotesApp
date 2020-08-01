/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import useTimeout from '../utils/hooks/useTimeout';

export default function Loading(props: any) {
  const [showLoading, setShowLoading] = useState(!props.delay);

  useTimeout(() => {
    setShowLoading(true);
  }, props.delay);

  if (!showLoading) {
    return null;
  }

  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <Typography className='text-20 mb-16' color='textSecondary'>
        {props.t('loading')}...
      </Typography>
      <LinearProgress className='w-xs' color='secondary' />
    </div>
  );
}
