import { useState } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl'
import {Room} from '@mui/icons-material';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 46,
    longitude: 17,
    zoom: 4
  });

  return (
    <div className="App">
      <ReactMapGL
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
      >
     
     <Marker 
     longitude={2.294694} 
     latitude={48.858093} 
     offsetLeft={-20}
     offsetTop={-10}
     >
     <Room style={{
      fontSize: viewport.zoom *7,
      color: "slateblue"
     }}/>
    </Marker>
 
    </ReactMapGL>

    </div>
  );
}

export default App;
