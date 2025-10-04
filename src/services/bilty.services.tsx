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
    } catch (error: any) {
      store.dispatch(
        openSnackbar({
          open: true,
          message: error.message,
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
    } catch (error: any) {
      store.dispatch(
        openSnackbar({
          open: true,
          message: error.message,
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
  // Delete Bilty
  async deleteBilty(id: string) {
    try {
      const response = await axiosServices.delete(`api/v1/deleteBilty/${id}`);
      if (response.data.success) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Deleted bilty successfully.',
            variant: 'alert',
            alert: {
              color: 'info'
            },
            close: true
          })
        );
        return true;
      }
    } catch (error: any) {
      store.dispatch(
        openSnackbar({
          open: true,
          message: error.message,
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
