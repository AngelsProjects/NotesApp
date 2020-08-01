/* eslint-disable no-console */
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import AppContext from '../AppContext';
import Footer from '../components/Footer';
import Scrollbars from '../components/Scrollbars';
import Suspense from '../components/Suspense';
import Toolbar from '../components/Toolbar';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position       : 'relative',
    display        : 'flex',
    flexDirection  : 'row',
    width          : '100%',
    height         : '100%',
    overflow       : 'hidden',
    backgroundColor: theme.palette.background.default,
    color          : theme.palette.text.primary,
    '&.boxed'      : {
      maxWidth : 1280,
      margin   : '0 auto',
      boxShadow: theme.shadows[3]
    },
    '&.scroll-body': {
      '& $wrapper': {
        height  : 'auto',
        flex    : '0 0 auto',
        overflow: 'auto'
      },
      '& $contentWrapper': {},
      '& $content'       : {}
    },
    '&.scroll-content': {
      '& $wrapper'       : {},
      '& $contentWrapper': {},
      '& $content'       : {}
    },
    '& .navigation': {
      '& .list-subheader-text, & .list-item-text, & .item-badge, & .arrow-icon': {
        transition: theme.transitions.create('opacity', {
          duration: theme.transitions.duration.shortest,
          easing  : theme.transitions.easing.easeInOut
        })
      }
    }
  },
  wrapper: {
    display : 'flex',
    position: 'relative',
    width   : '100%',
    height  : '100%',
    flex    : '1 1 auto'
  },
  contentWrapper: {
    display      : 'flex',
    flexDirection: 'column',
    position     : 'relative',
    zIndex       : 3,
    overflow     : 'hidden',
    flex         : '1 1 auto'
  },
  content: {
    position                    : 'relative',
    display                     : 'flex',
    overflow                    : 'auto',
    flex                        : '1 1 auto',
    flexDirection               : 'column',
    width                       : '100%',
    '-webkit-overflow-scrolling': 'touch',
    zIndex                      : 2
  }
}));

export default withRouter(function MainLayout(props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appContext: any = useContext(AppContext);
  const classes = useStyles(props);
  const { routes } = appContext;
  const { t } = useTranslation('translations');
  return (
    <div
      id='layout'
      className={clsx(classes.root, 'fullwidth', 'scroll-content')}
    >
      <div className='flex flex-1 flex-col overflow-hidden relative'>
        <div className={classes.wrapper}>
          <div className={classes.contentWrapper}>
            <Toolbar />
            
            <Scrollbars className={classes.content} scrollToTopOnRouteChange>

              <Suspense t={t}>{renderRoutes(routes)}</Suspense>

              {props.children}
            </Scrollbars>
            <Footer />
          </div>
        </div>
      </div>

    </div>
  );
});
