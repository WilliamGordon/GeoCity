import Discover from '../pages/discover';
import Design from '../pages/design';

const Routes = [
  {
    path: '/discover',
    sidebarName: 'Discover',
    component: Discover
  },
  {
    path: '/design',
    sidebarName: 'create',
    component: Design
  },
];

export default Routes;