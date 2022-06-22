import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "./Map.css";

function GetIcon(type) {
  return L.icon({
    iconUrl: require("../../../assets/icons/pin-" + type + ".svg").default,
    iconSize: new L.Point(40, 40),
    iconAnchor: [19, 41],
    popupAnchor: [0, -40],
    tooltipAnchor: [15, -30],
  });
}

export const Points = (props) => {
  return (
    <>
      {Object.keys(props.data).length !== 0 &&
        props.data.map((p) => {
          // Only show point for the currently selected itinary
          return (
            <Marker
              key={p.id}
              id={p.id}
              position={[p.latitude, p.longitude]}
              icon={GetIcon(p.isSuggestion ? "suggestion" : "poi")}
              eventHandlers={{
                click: (e) => {
                  props.handleUpdate(p);
                },
              }}
            >
              {p.osmId && <Tooltip>{p.name}</Tooltip>}
              {!p.osmId && <Tooltip>Step #{p.id.slice(0, 5)}</Tooltip>}
            </Marker>
          );
        })}
    </>
  );
};
export default Points;
