import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// MUI Components
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Paper,
  Popper,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';

// Icons
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';

// Appwrite
import { account } from 'utils/appwrite';

// Custom Components
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import IconButton from 'components/@extended/IconButton';

// Assets
import avatar1 from 'assets/images/users/avatar-1.png';
import { useAuth } from '../../../../../contexts/AuthContext';

export default function Profile() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();
console.log("--------->",user.name)
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      console.log('Logged out');
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      alert('Logout failed. Try again.');
    }
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        ref={anchorRef}
        onClick={handleToggle}
        sx={{
          p: 0.25,
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' }
        }}
      >
        <Stack direction="row" spacing={1.25} alignItems="center" p={0.5}>
          <Avatar alt="profile user" src={avatar1} sx={{ width: 32, height: 32 }} />
          <Typography variant="subtitle1">{user?.name}</Typography>
        </Stack>
      </ButtonBase>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        disablePortal
        popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [0, 9] } }] }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
            <Paper sx={{ width: 250 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={0} border={false} content={false}>
                  <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Stack direction="row" spacing={1.25} alignItems="center">
                        <Avatar alt="profile user" src={avatar1} sx={{ width: 32, height: 32 }} />
                        <Stack>
                          <Typography variant="h6">{user?.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user?.labels[0]}                          </Typography>
                        </Stack>
                      </Stack>
                      <Tooltip title="Logout">
                        <IconButton size="large" onClick={handleLogout}>
                          <LogoutOutlined />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </CardContent>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}
