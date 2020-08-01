import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React, { memo } from 'react';

export default memo(function Footer() {
  return (
    <AppBar id='footer' className='relative z-10' color='default' style={{ backgroundColor: '#718096' }}>
      <Toolbar className='px-16 py-0 flex items-center'>
        <div className='flex flex-1'>
          <span>&copy; {new Date().getFullYear()} Angel Arciniega</span>
        </div>
      </Toolbar>
    </AppBar>
  );
});
