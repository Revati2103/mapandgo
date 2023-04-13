import { useEffect, useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
//import { Room, Star} from '@mui/icons-material';
import { Room, Star} from '@material-ui/icons';
import 'mapbox-gl/dist/mapbox-gl.css';
import './app.css'
import axios from 'axios'
import { format } from "timeago.js";
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [showRegister, setShowRegister] =useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [viewport, setViewport] = useState({
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

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleLogout = () => {
    myStorage.removeItem("user")
    setCurrentUsername(null);
  }

  const handleAddClick = (e) => {
    const [long,lat] = e.lngLat;
    setNewPlace({
      lat,
      long
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUsername,
      title,
      description: desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactMapGL
      {...viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      width="100%"
      height="100%"
      transitionDuration="200"
      mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
      onDblClick={handleAddClick}
      >
    {pins.map((p) => (
          <>
            <Marker
              longitude={p.long}
              latitude={p.lat}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: p.username === currentUsername ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                key={p._id}
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className='stars'>
           
                {Array(p.rating).fill( <Star className='stars'/>)}
         </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
{newPlace && (
          <>
            <Marker
              latitude={newPlace.lat}
              longitude={newPlace.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: "tomato",
                  cursor: "pointer",
                }}
              />
            </Marker>
            <Popup
              latitude={newPlace.lat}
              longitude={newPlace.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor="left"
            >
              <div>
                <form onSubmit={handleSubmit}>
                  <label>Title</label>
                  <input placeholder='Enter a title' onChange={(e) => setTitle(e.target.value)}/>
                  <label>Review</label>
                  <textarea placeholder='Add something about this Place' onChange={(e) => setDesc(e.target.value)}></textarea>
                  <label>Rating</label>
                  <select onChange={(e) => setRating(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button className='submitButton' type='submit'>Add Pin</button>
                </form>
              </div>
        </Popup> 
        </>

)}

{currentUsername ? 
(<button className='button logout' onClick={handleLogout}>Log out</button> ) 
: 
( <div className='buttons'>
<button className='button login' onClick={() => setShowLogin(true)}>Log in</button>
<button className='button register'  onClick={() => setShowRegister(true)}>Register</button>
</div>) 
}
       
       
{ showRegister &&    <Register setShowRegister={setShowRegister}/> }
{ showLogin &&  <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUsername={setCurrentUsername}/>   }
     
    </ReactMapGL>

    </div>
  );
}

export default App;