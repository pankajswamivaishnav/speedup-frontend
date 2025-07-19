import { store } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import axiosServices from 'utils/axios';

class TransporterServices {
  // Create Transport
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
  // Get All Transport
  async getAllTransporter(page: Number, limit: Number) {
    try {
      const response = await axiosServices.get(`api/v1/admin/totalTransporter?page=${page}&limit=${limit}`);
      if (response.status) {
        return response.data;
      }
    } catch (error) {
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

  // Delete Transporter
  async deleteTransporter(id: string) {
    try {
      const response = await axiosServices.put(`api/v1/admin/deleteTransporter/${id}`);
      if (response.status) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Transporter deleted successfully',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: true
          })
        );
        return response.data.data;
      }
    } catch (error) {
      store.dispatch(
        openSnackbar({
          open: true,
          message: 'Transporter not deleted',
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
