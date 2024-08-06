/* eslint-disable react/display-name */
import FingerprintJS from "fingerprintjs2";
import React, {useEffect} from "react";

const withUserDetails = (WrappedComponent) => {
  return (props) => {
    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          // Fetch geolocation
          const getLocation = () =>
            new Promise((resolve, reject) => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const {latitude, longitude} = position.coords;
                    resolve({latitude, longitude});
                  },
                  (error) => reject(error)
                );
              } else {
                reject(new Error("Geolocation not supported"));
              }
            });

          const location = await getLocation();

          // Fetch IP address
          const getIP = async () => {
            const response = await fetch("https://api.ipify.org?format=json");
            const data = await response.json();
            return data.ip;
          };

          const ip = await getIP();

          // Get device fingerprint
          const getFingerprint = () =>
            new Promise((resolve) => {
              FingerprintJS.get((components) => {
                const values = components.map((component) => component.value);
                const fingerprint = FingerprintJS.x64hash128(
                  values.join(""),
                  31
                );
                resolve(fingerprint);
              });
            });

          const fingerprint = await getFingerprint();

          // Store details in sessionStorage latitude, longitude

          sessionStorage.setItem("latitude", location?.latitude?.toFixed(6));
          sessionStorage.setItem("longitude", location?.longitude?.toFixed(6));
          sessionStorage.setItem("ip", ip);
          sessionStorage.setItem("fingerprint", fingerprint);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserDetails();
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withUserDetails;
