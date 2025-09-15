import { store } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import axiosServices from 'utils/axios';

class BiltyServices {
  // Get All Bilty
  async getAllbilties(page: Number, limit: Number, query?: string) {
    try {
      const response = await axiosServices.get(`api/v1/getAllBilties?page=${page}&limit${limit}&filter=${query}`);
      if (response.status) {
        return response.data;
      }
    } catch (error) {
      store.dispatch(
        openSnackbar({
          open: true,
          message: 'Something went wrong bilty services!',
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
  // Make Bilty
  async createBilty(data: any) {
    try {
      const response: any = await axiosServices.post(`api/v1/bilty`, data);
      console.log('service', response);
      if (response.data.success) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Bilty created successfully.',
            variant: 'alert',
            alert: {
              color: 'info'
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
          message: error,
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

const biltyServiceInstance = new BiltyServices();
export default biltyServiceInstance;
