import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Stack, Typography } from '@mui/material';

// third-party
import OtpInput from 'react18-input-otp';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// types
import { ThemeMode } from 'types/config';
import useAuth from 'hooks/useAuth';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import moment from 'moment';
// ============================|| STATIC - CODE VERIFICATION ||============================ //

const AuthCodeVerification = (data: any) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { verifyOtp, resendOtp } = useAuth();
  const [otp, setOtp] = useState<string>();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [canResend, setCanResend] = useState(false);
  const [expiresAt, setExpiresAt] = useState(data?.data?.expiresAt);

  const borderColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[200] : theme.palette.grey[300];

  // ------------ Handlers -----------------
  const handleVerifyOtp = async () => {
    try {
      const response = await verifyOtp(data.data.email, otp);
      if (response.status === 200 && response.data.success) {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Your verification has been successfully completed.',
            variant: 'alert',
            alert: {
              color: 'primary'
            },
            close: false
          })
        );
        navigate('/login');
      }
    } catch (error) {
      console.log('Error Occured while verify otp', error);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await resendOtp(data.data.email);
      setExpiresAt(response.data.expiresAt);
      setCanResend(false);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Resend OTP successfully.',
          variant: 'alert',
          alert: {
            color: 'primary'
          },
          close: false
        })
      );
    } catch (error: any) {
      dispatch(
        openSnackbar({
          open: true,
          message: error.error,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    }
  };

  // 🔽 TIMER CONVERSION SHOULD BE HERE
  const duration = moment.duration(timeLeft);
  const minutes = String(duration.minutes()).padStart(2, '0');
  const seconds = String(duration.seconds()).padStart(2, '0');

  // ----------- Use Effects -----------------
  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const now = moment();
      const expiry = moment(expiresAt);

      const diff = expiry.diff(now); // milliseconds

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        setCanResend(true);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <OtpInput
          value={otp}
          onChange={(otp: string) => setOtp(otp)}
          numInputs={4}
          containerStyle={{ justifyContent: 'space-between' }}
          inputStyle={{
            width: '100%',
            margin: '8px',
            padding: '10px',
            border: `1px solid ${borderColor}`,
            borderRadius: 4,
            ':hover': {
              borderColor: theme.palette.primary.main
            }
          }}
          focusStyle={{
            outline: 'none',
            boxShadow: theme.customShadows.primary,
            border: `1px solid ${theme.palette.primary.main}`
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <AnimateButton>
          <Button disableElevation fullWidth size="large" variant="contained" onClick={handleVerifyOtp}>
            Continue
          </Button>
        </AnimateButton>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline">
          <Typography>Did not receive the email? Check your spam filter, or all inbox section</Typography>
          {!canResend ? (
            <Typography color="text.secondary">
              Resend in {minutes}:{seconds}
            </Typography>
          ) : (
            <Typography variant="body1" sx={{ cursor: 'pointer' }} color="primary" onClick={handleResendOtp}>
              Resend
            </Typography>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AuthCodeVerification;
