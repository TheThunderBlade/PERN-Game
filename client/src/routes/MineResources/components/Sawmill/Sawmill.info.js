export const SawmillInfo = new Map([
  [1, {
    currentDescription: 'You can mine only Wood(2-5)',
    upgradeDescription: 'You can mine only Wood(2-10)',
    upgrade: {
      Wood: 25,
    },
  }],
  [2, {
    currentDescription: 'You can mine only Wood(2-10)',
    upgradeDescription: 'You can mine only Wood(2-10) and WoodBeam(2-5)',
    upgrade: {
      Wood: 50,
    },
  }],
  [3, {
    currentDescription: 'You can mine only Wood(2-10) and WoodBeam(2-5)',
    upgradeDescription: 'You can mine only Wood(2-10) and WoodBeam(2-10)',
    upgrade: {
      Wood: 65,
      WoodBeam: 50,
    },
  }],
  [4, {
    currentDescription: 'You can mine only Wood(2-10) and WoodBeam(2-10)',
    upgradeDescription: 'You can mine only Wood(2-12) and WoodBeam(2-12)',
    upgrade: {
      Wood: 75,
      WoodBeam: 65,
    },
  }],
  [5, {
    currentDescription: 'You can mine only Wood(2-12) and WoodBeam(2-12)',
    upgradeDescription: 'You can mine only Wood(2-15) and WoodBeam(2-15)',
    upgrade: {
      Wood: 90,
      WoodBeam: 90,
    },
  }],
  [6, {
    currentDescription: 'You can mine only Wood(2-12) and WoodBeam(2-12)',
    upgradeDescription: 'It`s max level for Sawmill',
    upgrade: null,
  }],
]);