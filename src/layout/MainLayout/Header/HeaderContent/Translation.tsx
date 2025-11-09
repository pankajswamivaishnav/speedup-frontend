// import { Badge } from '@mui/material';
import { Box, ClickAwayListener } from '@mui/material';
import { useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import IconButton from 'components/@extended/IconButton';
import { TranslationOutlined } from '@ant-design/icons';
// types
import { ThemeMode } from 'types/config';
const Translation = () => {
  const theme = useTheme();

  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = theme.palette.mode === ThemeMode.DARK ? 'grey.200' : 'grey.300';
  const iconBackColor = theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.100';
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={{ flexShrink: 0, ml: 0.75 }}>
        <IconButton
          color="secondary"
          variant="light"
          sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
          aria-label="open profile"
          ref={anchorRef}
          aria-controls={open ? 'profile-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {/* <Badge badgeContent="" color="primary"> */}
          <TranslationOutlined />
          {/* </Badge> */}
        </IconButton>
      </Box>
    </ClickAwayListener>
  );
};

export default Translation;
