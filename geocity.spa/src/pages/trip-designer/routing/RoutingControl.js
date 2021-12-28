import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

const createRoutineMachineLayer = (props) => {
  const { waypoints } = props;
  const instance = L.Routing.control({
    show: false,
    fitSelectedRoutes: false,
    showAlternatives: false,
    draggableWaypoints: false,
    collapsible: true,
    position: 'topright',
    lineOptions: {
      styles: [
        {
          color: '#757de8',
        },
      ],
    },
  });
  return instance;
};

// Pass our createRoutingMachineLayer to the createControlHook:
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

// Export
export default RoutingMachine;