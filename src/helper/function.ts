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

// ------------ Get Distance + Duration -------------
export const getDistanceAndTime = async (pickup: any, drop: any) => {
  if (!pickup?.lat || !pickup?.lng || !drop?.lat || !drop?.lng) {
    return null;
  }

  try {
    const res = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${drop.lng},${drop.lat}?overview=false`
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    const route = data?.routes?.[0];

    if (!route) {
      return null;
    }

    const distanceKm = Number(route.distance || 0) / 1000;
    const durationSeconds = Number(route.duration || 0);

    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);

    const formattedTime = `${hours} hr ${minutes} min`;
    return {
      distanceKm: distanceKm.toFixed(2),
      durationHours: formattedTime
    };
  } catch (error) {
    console.error('Error while fetching distance and time:', error);
    return null;
  }
};
