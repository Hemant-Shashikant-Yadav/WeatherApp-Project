import React, { useEffect } from "react";

const WindyMap = ({ lon, lat }) => {
  useEffect(() => {
    const options = {
        
      key: import.meta.env.REACT_APP_WINDY_API_KEY,
      verbose: true,
      lon: lon || 0, 
      lat: lat || 0, 
      zoom: 10,
    };

    const windyInit = window.windyInit;
    if (windyInit) {
      windyInit(options, (windyAPI) => {
        const { store, broadcast } = windyAPI;

        const overlays = ["rain", "wind", "temp", "clouds"];
        let i = 0;

        setInterval(() => {
          i = i === 3 ? 0 : i + 1;
          store.set("overlay", overlays[i]);
        }, 3000);

        broadcast.on("paramsChanged", (params) => {
          console.log("Params changed:", params);
        });

        broadcast.on("redrawFinished", (params) => {
          console.log("Map was rendered:", params);
        });
      });
    }
  }, [lon, lat]);

  return <div id="windy" style={{ width: "50vw", height: "50vh" }}></div>;
};

export default WindyMap;