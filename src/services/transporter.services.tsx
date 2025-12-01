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
              color: 'primary'
            },
            close: true
          })
        );
        return response.data.data;
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
  // Get All Transport
  async getAllTransporter(page: Number, limit: Number, query?: string) {
    try {
      const response = await axiosServices.get(`api/v1/admin/totalTransporter?page=${page}&limit=${limit}&filter=${query}`);
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
              color: 'info'
            },
            close: true
          })
        );
        return response.data.data;
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

  // Get User
  async getUser() {
    try {
      const response = await axiosServices.get(`api/v1/getUser`);
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

  // Update User
  async updateUser(data: any) {
    try {
      const response = await axiosServices.put(`api/v1/update/user`, data);
      if (response.status) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Profile updated successfully.',
            variant: 'alert',
            alert: {
              color: 'primary'
            },
            close: true
          })
        );
        return response;
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

  // -------------- Transport Cards Services ----------------
  // Create Transport Card
  async createTransportCard(data: any) {
    try {
      const response = await axiosServices.post(`api/v1/createTransportCard`, data);
      if (response.status === 201) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Transporter Card created successfully.',
            variant: 'alert',
            alert: {
              color: 'info'
            },
            close: true
          })
        );
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

  // get all transport cards
  async getAllTransportCards(query?: string) {
    try {
      const response = await axiosServices.get(`api/v1/getAllTransportCards?filter=${query}`);
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
}

const TransporterServiceInstance = new TransporterServices();
export default TransporterServiceInstance;
