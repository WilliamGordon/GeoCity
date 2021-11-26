import Discover from '../pages/discover';
import ItinaryForm from '../pages/itinary-form';
import ItinaryDesigner from '../pages/itinary-designer';

const Routes = [
  {
    path: '/discover',
    sidebarName: 'Discover',
    component: Discover
  },
  {
    path: '/itinary-form',
    sidebarName: 'itinary-form',
    component: ItinaryForm
  },
  {
    path: '/itinary-designer',
    sidebarName: 'itinary-designer',
    component: ItinaryDesigner
  },
];

export default Routes;