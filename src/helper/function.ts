// Get Coordinates for current location and live tracking for continuously monitors
export const getUserCoordinates = async () => {
  try {
    const position: any = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    return { latitude, longitude };
  } catch (error) {
    throw error;
  }
};

export const getUserContinues = (onLocationUpdate: any) => {
  try {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported by this browser.');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        onLocationUpdate({ latitude: latitude, longitude: longitude });
      },
      (error) => {
        console.error('Error watching location:', error.message);
      },
      {
        enableHighAccuracy: true, // Keep true for better accuracy
        maximumAge: 10000, // Allow cached position (10 sec)
        timeout: 30000 // Wait up to 20 sec before timeout
      }
    );

    return watchId;
  } catch (error) {
    console.error('Error in getUserContinues:', error);
  }
};
