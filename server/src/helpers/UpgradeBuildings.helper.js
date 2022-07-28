module.exports = {
  BuildingsLevelName: new Map([
    ['Cave', 'CaveLevel'],
    ['Sawmill', 'SawmillLevel'],
  ]),

  SawmillUpgrade: new Map([
    [1, {
      Wood: 25,
    }],
    [2, {
      Wood: 50,
    }],
    [3, {
      Wood: 65,
      WoodBeam: 50,
    }],
    [4, {
      Wood: 75,
      WoodBeam: 65,
    }],
    [5, {
      Wood: 90,
      WoodBeam: 90,
    }],
    [6, null],
  ]),

  CaveUpgrade: new Map([
    [1, {
      Stone: 25,
    }],
    [2, {
      Stone: 50,
    }],
    [3, {
      Stone: 60,
      Iron: 25,
    }],
    [4, {
      Stone: 70,
      Iron: 50,
    }],
    [5, {
      Stone: 80,
      Iron: 60,
      Gold: 20,
    }],
    [6, {
      Stone: 90,
      Iron: 60,
      Gold: 45,
    }],
    [7, {
      Stone: 90,
      Iron: 80,
      Gold: 65,
      Diamond: 20,
    }],
    [8, {
      Stone: 90,
      Iron: 80,
      Gold: 65,
      Diamond: 45,
    }],
    [9, {
      Stone: 90,
      Iron: 80,
      Gold: 75,
      Diamond: 55,
    }],
    [10, null],
  ])
}