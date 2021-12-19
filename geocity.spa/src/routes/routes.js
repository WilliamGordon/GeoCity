import Discover from '../pages/discover';
import TripForm from '../pages/trip-form';
import TripDesigner from '../pages/trip-designer';
import TripManager from '../pages/trips-manager';

const Routes = [
  {
    path: '/discover',
    sidebarName: 'Discover',
    component: Discover
  },
  {
    path: '/trip-form',
    sidebarName: 'trip-form',
    component: TripForm
  },
  {
    path: '/trip-designer/:tripId',
    sidebarName: 'trip-designer',
    component: TripDesigner
  },
  {
    path: '/trips-manager',
    sidebarName: 'trips-manager',
    component: TripManager
  },
];

export default Routes;