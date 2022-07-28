import Cave from '../../assets/mineResources/Cave.png';
import Sawmill from '../../assets/mineResources/Sawmill.png';

export const MiningElementsList = [
  {
    MineName: 'Cave',
    MineDescription: 'You can mine ores in this place',
    visitDays: ['Monday', 'Wednesday', 'Sunday'],
    MineImage: Cave,
  },
  {
    MineName: 'Sawmill',
    MineDescription: 'You can mine wood in this place',
    visitDays: ['Tuesday', 'Thursday', 'Sunday'],
    MineImage: Sawmill,
  },
];