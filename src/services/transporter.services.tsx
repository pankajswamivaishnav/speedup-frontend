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

  // -------------- Managed Transporter Services ----------------
  // Create Managed Transporter
  async createManagedTransporter(data: any) {
    try {
      const response = await axiosServices.post(`api/v1/managed/create-transporter`, data);
      if (response.status) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Managed transporter created successfully.',
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

  // Get All Managed Transporters
  async getAllManagedTransporters(
    page: Number,
    limit: Number,
    query?: string,
    creatorId?: string,
    unique?: boolean,
    isSuperAdmin?: boolean
  ) {
    try {
      let url = '';
      if (isSuperAdmin) {
        url = `api/v1/admin/get-all-managed-transporters?page=${page}&limit=${limit}`;
        if (query) url += `&search=${query}`;
        if (creatorId) url += `&creatorId=${creatorId}`;
        if (unique) url += `&unique=true`;
      } else {
        url = `api/v1/managed/get-all-transporters?page=${page}&limit=${limit}&filter=${query}`;
      }
      const response = await axiosServices.get(url);
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

  // Get Managed Transporter By ID
  async getManagedTransporterById(id: string) {
    try {
      const response = await axiosServices.get(`api/v1/managed/get-transporter/${id}`);
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

  // Update Managed Transporter
  async updateManagedTransporter(id: string, data: any) {
    try {
      const response = await axiosServices.put(`api/v1/managed/update-transporter/${id}`, data);
      if (response.status) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Managed transporter updated successfully.',
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

  // Delete Managed Transporter
  async deleteManagedTransporter(id: string) {
    try {
      const response = await axiosServices.delete(`api/v1/managed/delete-transporter/${id}`);
      if (response.status) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Managed transporter deleted successfully',
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
}

const TransporterServiceInstance = new TransporterServices();
export default TransporterServiceInstance;
