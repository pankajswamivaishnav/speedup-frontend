import { store } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import axiosServices from 'utils/axios';

class TransporterServices {
  async createTransporter(data: any) {
    try {
      const response = await axiosServices.post(`api/v1/register/transporter`, data);
      if (response.status) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Transporter created successfully.',
            variant: 'alert',
            alert: {
              color: 'info'
            },
            close: true
          })
        );
        return response.data.data;
      }
    } catch (error) {
      console.log('error-->', error);
      store.dispatch(
        openSnackbar({
          open: true,
          message: 'Something went wrong!',
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: true
        })
      );
      throw error;
    }
  }
}

const TransporterServiceInstance = new TransporterServices();
export default TransporterServiceInstance;
