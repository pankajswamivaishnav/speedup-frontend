import { store } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import axiosServices from 'utils/axios';
// import axiosServices from 'utils/axios';

class LandingServices {
  // schedule demo
  async scheduleDemo(data: any) {
    try {
      const response = await axiosServices.post(`api/v1/demoRequest`, data);
      if (response) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Send request successfully',
            variant: 'alert',
            alert: {
              color: 'primary'
            },
            close: true
          })
        );
        return true;
      }
    } catch (error) {
      store.dispatch(
        openSnackbar({
          open: true,
          message: 'error occured when send demo request!!',
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: true
        })
      );
    }
  }
}

const LandingServiceInstance = new LandingServices();
export default LandingServiceInstance;
