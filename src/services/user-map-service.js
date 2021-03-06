import { map, tileLayer, marker, icon, divIcon } from 'leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';
import markerIcon2x from '../../node_modules/leaflet/dist/images/marker-icon-2x.png';
import markerIcon from '../../node_modules/leaflet/dist/images/marker-icon.png';

let userMap;

// without this the default icon won't show
// https://github.com/PaulLeCam/react-leaflet/issues/255
const defaultIcon = icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  popupAnchor: [0, -38],
  iconSize: [24, 36],
  iconAnchor: [12, 36],
});
const defaultView = {
  coords: [55.942, -3.21],
  zoom: 3
}
const userIcon = username =>
  divIcon({
    popupAnchor: [0, -20],
    iconSize: [28, 36],
    iconAnchor: [14, 28],
    className: 'marker-user-icon',
    html: `<img class="marker-user-icon__image" src="https://cdn-standard6.discourse.org/user_avatar/www.funfunforum.com/${username}/90/149_1.png" />`,
  });

export const initMap = (hostId) => {
  userMap = map(hostId, { worldCopyJump: true });

  const tiles = tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 3,
    maxZoom: 18,
  });
  //gets query params for lat & lng
  const searchParams = new URLSearchParams(window.location.search)
  // is Number check
  const lat = !isNaN(searchParams.get('lat')) ? searchParams.get('lat') : undefined
  const lng = !isNaN(searchParams.get('lng')) ? searchParams.get('lng') : undefined
  const paramCoords = [lat, lng]
  // if not undefined, set as view, else, use default
  lat && lng ? userMap.setView(paramCoords, 11) :
    userMap.setView(defaultView.coords, defaultView.zoom);
  userMap.addLayer(tiles);
};

export const addMapMarker = ({ username, lat, lng, caption }) => {
  const mark = marker([lat, lng], {
    icon: username ? userIcon(username) : defaultIcon,
  }).addTo(userMap);
  mark.bindPopup(caption);
};
