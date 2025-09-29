import { useDispatch } from 'store';

// material-ui
import { Button, Grid, InputLabel, Stack, TextField } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'store/reducers/snackbar';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import LandingServiceInstance from 'services/landing.services';
import { useState } from 'react';

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  mobileNumber: yup
    .string()
    .matches(/^\d{10}$/, 'Enter a valid 10-digit phone number')
    .required('Phone number is required'),
  dateTime: yup.string().required('Date & Time is required'),
  name: yup.string().required('Full name is required')
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

interface ContactProps {
  handleTogglePopup: () => void;
}

const Contact: React.FC<ContactProps> = ({ handleTogglePopup }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      mobileNumber: '',
      dateTime: '',
      name: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const response = await LandingServiceInstance.scheduleDemo(values);
      if (response) {
        setLoading(false);
        formik.resetForm();
        handleTogglePopup();
      }
      dispatch(
        openSnackbar({
          open: true,
          message: 'Submit demo request Success',
          variant: 'alert',
          alert: {
            color: 'primary'
          },
          close: false
        })
      );
    }
  });

  return (
    <MainCard title="Please share your details so our team can schedule a demo for you.">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="name">
                Full Name <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <TextField
                fullWidth
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email">
                Email Address <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <TextField
                fullWidth
                id="email"
                name="email"
                placeholder="Enter email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="mobileNumber">
                Phone Number <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <TextField
                fullWidth
                id="mobileNumber"
                name="mobileNumber"
                placeholder="Enter your phone number"
                type="text"
                value={formik.values.mobileNumber}
                onChange={formik.handleChange}
                inputProps={{ maxLength: 10 }}
                error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="dateTime">
                Choose date & time <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <TextField
                type="datetime-local"
                name="dateTime"
                value={formik.values.dateTime}
                onChange={formik.handleChange}
                error={formik.touched.dateTime && Boolean(formik.errors.dateTime)}
                helperText={formik.touched.dateTime && formik.errors.dateTime}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button variant="contained" type="submit" disabled={isLoading}>
                  {isLoading ? 'Scheduling Demo' : 'Scheduled Demo'}
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
};

export default Contact;
