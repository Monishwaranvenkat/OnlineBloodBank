import { createMuiTheme }  from '@material-ui/core/styles'
import {shadows} from './shadows';
import {typo} from './typography';
const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
  shadows,
  typo

});
export default theme

/* #ce1212
#810000
#1b1717 */