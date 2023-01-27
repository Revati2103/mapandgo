import { useEffect, useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import { Room, Star} from '@mui/icons-material';
import 'mapbox-gl/dist/mapbox-gl.css';
import './app.css'
import axios from 'axios'

function App() {
  const [pins, setPins] = useState([])
  const [viewport, setViewport] = useState({
    width:"100vw",
    height: "100vh",
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 4,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactMapGL
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
      >
     
     {pins.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
     <Room style={{
      fontSize: viewport.zoom *7,
      color: "slateblue"
     }}/>
    </Marker>
     <Popup 
         longitude={p.long} 
        latitude={p.lat}
        closeButton={true}
        closeOnClick={false}
        anchor="left"
        >
        <div className='card'>
          <label>Place</label>
          <h4 className='place'>{p.title}</h4>
          <label>Review</label>
          <p className='desc'>{p.description}</p>
          <label>Rating</label>
          <div className='stars'>
            <Star className='stars'/>
            <Star className='stars'/>
            <Star className='stars'/>
            <Star className='stars'/>
            <Star className='stars'/>
         </div>
        <label>Information</label>
         <span className='username'>Created by <b> {p.username} </b></span>
          <span className='date'>1 hour ago</span>
        </div>
      </Popup>
    </>
     ))}
     
    </ReactMapGL>

    </div>
  );
}

export default App;
