import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutineMachineLayer = (props) => {
  const instance = L.Routing.control({
    createMarker: function () {
      return null;
    },
    show: false,
    fitSelectedRoutes: false,
    showAlternatives: false,
    draggableWaypoints: false,
    routeWhileDragging: false,
    waypointMode: "connect",
    collapsible: true,
    position: "topright",
    router: L.Routing.mapbox(
      "pk.eyJ1Ijoid2lsbGlhbWdvcmRvbiIsImEiOiJja3VvOXhua28wZ3BjMnBxcmM1YzcxbTlxIn0.mPwGIRCh7qohRAfTnuzbRQ",
      { profile: "mapbox/walking" }
    ),
    lineOptions: {
      styles: [
        {
          color: "#757de8",
        },
      ],
    },
  });
  instance.on("routeselected", function (e) {
    var summary = e.route.summary;
    var distance = summary.totalDistance / 1000;
    var duration = Math.round((summary.totalTime % 3600) / 60);
    props.getInfoRoute({
      distance: distance,
      duration: duration,
    });
  });
  return instance;
};

// Pass our createRoutingMachineLayer to the createControlHook:
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

// Export
export default RoutingMachine;
