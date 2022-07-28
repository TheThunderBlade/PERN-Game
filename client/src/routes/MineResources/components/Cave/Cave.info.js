export const CaveInfo = new Map([
  [1, {
    currentDescription: 'You can mine only Stone(2-5)',
    upgradeDescription: 'You can mine only Stone(2-10)',
    upgrade: {
      Stone: 25,
    },
  }],
  [2, {
    currentDescription: 'You can mine only Stone(2-10)',
    upgradeDescription: 'You can mine only Stone(2-10) and Iron(2-5)',
    upgrade: {
      Stone: 50,
    },
  }],
  [3, {
    currentDescription: 'You can mine only Stone(2-10) and Iron(2-5)',
    upgradeDescription: 'You can mine only Stone(2-10) and Iron(2-10)',
    upgrade: {
      Stone: 60,
      Iron: 25,
    },
  }],
  [4, {
    currentDescription: 'You can mine only Stone(2-10) and Iron(2-10)',
    upgradeDescription: 'You can mine only Stone(2-10), Iron(2-10) and Gold(2-5)',
    upgrade: {
      Stone: 70,
      Iron: 50,
    },
  }],
  [5, {
    currentDescription: 'You can mine only Stone(2-10), Iron(2-10) and Gold(2-5)',
    upgradeDescription: 'You can mine only Stone(2-10), Iron(2-10) and Gold(2-10)',
    upgrade: {
      Stone: 80,
      Iron: 60,
      Gold: 20,
    },
  }],
  [6, {
    currentDescription: 'You can mine only Stone(2-10), Iron(2-10) and Gold(2-10)',
    upgradeDescription: 'You can mine only Stone(2-10), Iron(2-10) and Gold(2-10) and Diamond(2-5)',
    upgrade: {
      Stone: 90,
      Iron: 60,
      Gold: 45,
    },
  }],
  [7, {
    currentDescription: 'You can mine only Stone(2-10), Iron(2-10) and Gold(2-10) and Diamond(2-5)',
    upgradeDescription: 'You can mine only Stone(2-10), Iron(2-10) and Gold(2-10) and Diamond(2-10)',
    upgrade: {
      Stone: 90,
      Iron: 80,
      Gold: 65,
      Diamond: 20,
    },
  }],
  [8, {
    currentDescription: 'You can mine only Stone(2-10), Iron(2-10) and Gold(2-10) and Diamond(2-10)',
    upgradeDescription: 'You can mine only Stone(2-12), Iron(2-12) and Gold(2-12) and Diamond(2-12)',
    upgrade: {
      Stone: 90,
      Iron: 80,
      Gold: 65,
      Diamond: 45,
    },
  }],
  [9, {
    currentDescription: 'You can mine only Stone(2-12), Iron(2-12) and Gold(2-12) and Diamond(2-12)',
    upgradeDescription: 'You can mine only Stone(2-15), Iron(2-15) and Gold(2-15) and Diamond(2-15)',
    upgrade: {
      Stone: 90,
      Iron: 80,
      Gold: 75,
      Diamond: 55,
    },
  }],
  [10, {
    currentDescription: 'You can mine only Stone(2-15), Iron(2-15) and Gold(2-15) and Diamond(2-15)',
    upgradeDescription: 'It`s max level for Cave',
    upgrade: null,
  }],
]);