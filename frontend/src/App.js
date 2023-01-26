import { useState } from "react";
import Map, {Marker} from 'react-map-gl'

function App() {

  // const [viewport, setViewport] = useState({
  //   width: "100vw",
  //   height: "100vh",
  //   latitude: 47.040182,
  //   longitude: 17.071727,
  //   zoom: 4,
  // });

  return (
    <div className="App">
      <Map
    initialViewState={{
      longitude: -122.4,
      latitude: 37.8,
      zoom: 14
    }}
    style={{width: "100vw", height: "100vh"}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken= {process.env.REACT_APP_MAPBOX} >
     
     <Marker longitude={-100} latitude={40} anchor="bottom" >
      
    </Marker>
 
    </Map>

    </div>
  );
}

export default App;
