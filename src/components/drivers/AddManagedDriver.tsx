import { Button, FormHelperText, TextField } from '@mui/material';
import { Box, Grid, InputLabel, Stack } from '@mui/material';
import { Formik } from 'formik';
import { RefObject, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import DriverServiceInstance from 'services/driver.services';
import { managedDriverValidationSchema } from 'pages/validation/validation';
import useAuth from 'hooks/useAuth';

function useInputRef() {
  return useOutletContext<RefObject<HTMLInputElement>>();
}

const AddManagedDriver = ({
  onClose,
  isEditMode,
  existingData,
  isDisable,
  refetchManagedDriverAllData
}: {
  onClose: (refetchData?: boolean) => void;
  isEditMode: Boolean;
  existingData: any;
  isDisable?: boolean;
  refetchManagedDriverAllData?: () => void;
}) => {
  const inputRef = useInputRef();
  const { user } = useAuth();
  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
    mobileNumber: '',
    truckNumber: '',
    address: 'INDIA',
    creator: {
      userId: user._id,
      role: user.role === 'transporter' ? 'Transporter' : user.role === 'driver' ? 'Driver' : 'Vendors'
    }
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (isEditMode && existingData && existingData.managedDriverData) {
      setInitialValues({
        first_name: existingData.managedDriverData.first_name || '',
        last_name: existingData.managedDriverData.last_name || '',
        mobileNumber: existingData.managedDriverData.mobileNumber || '',
        truckNumber: existingData.managedDriverData.truckNumber || '',
        address: existingData.managedDriverData.address || 'INDIA',
        creator: existingData.managedDriverData.creator || {
          userId: user._id,
          role: user.role === 'transporter' ? 'Transporter' : user.role === 'driver' ? 'Driver' : 'Vendors'
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, existingData]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={managedDriverValidationSchema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setSubmitting(true);
          let response;
          if (isEditMode) {
            response = await DriverServiceInstance.updateManagedDriver(existingData.managedDriverData._id, values);
          } else {
            response = await DriverServiceInstance.createManagedDriver(values);
          }
          if (response) {
            onClose(true);
            refetchManagedDriverAllData && refetchManagedDriverAllData();
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, submitCount }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="managed-driver-first-name">
                      First Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="managed-driver-first-name"
                      value={values.first_name}
                      name="first_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="First Name"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {(touched.first_name || submitCount > 0) && errors.first_name && (
                      <FormHelperText error id="managed-driver-first-name-helper">
                        {errors.first_name}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="managed-driver-last-name">
                      Last Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="managed-driver-last-name"
                      value={values.last_name}
                      name="last_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Last Name"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {(touched.last_name || submitCount > 0) && errors.last_name && (
                      <FormHelperText error id="managed-driver-last-name-helper">
                        {errors.last_name}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="managed-driver-mobile-number">
                      Mobile Number <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      type="number"
                      fullWidth
                      value={values.mobileNumber}
                      name="mobileNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="managed-driver-mobile-number"
                      placeholder="Mobile Number"
                      disabled={isDisable}
                      inputProps={{ maxLength: 10 }}
                    />
                    {(touched.mobileNumber || submitCount > 0) && errors.mobileNumber && (
                      <FormHelperText error id="managed-driver-mobile-number-helper">
                        {errors.mobileNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="managed-driver-truck-number">Truck Number</InputLabel>
                    <TextField
                      type="text"
                      fullWidth
                      value={values.truckNumber}
                      name="truckNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="managed-driver-truck-number"
                      placeholder="Truck Number"
                      disabled={isDisable}
                    />
                    {(touched.truckNumber || submitCount > 0) && errors.truckNumber && (
                      <FormHelperText error id="managed-driver-truck-number-helper">
                        {errors.truckNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="managed-driver-address">Address</InputLabel>
                    <TextField
                      fullWidth
                      id="managed-driver-address"
                      value={values.address}
                      name="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Address"
                      disabled={isDisable}
                      multiline
                      rows={3}
                    />
                    {(touched.address || submitCount > 0) && errors.address && (
                      <FormHelperText error id="managed-driver-address-helper">
                        {errors.address}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {isDisable ? (
                  ''
                ) : (
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                      <Button variant="outlined" type="button" color="secondary" onClick={() => onClose()}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="outlined" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : isEditMode ? 'Update' : 'Save'}
                      </Button>
                    </Stack>
                  </Grid>
                )}
              </Grid>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddManagedDriver;
