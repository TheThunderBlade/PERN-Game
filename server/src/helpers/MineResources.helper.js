module.exports = {
  CaveResources: new Map([
    [1, { Stone: [2, 5] }],
    [2, { Stone: [2, 10] }],
    [3, { Stone: [2, 10], Iron: [2, 5] }],
    [4, { Stone: [2, 10], Iron: [2, 10] }],
    [5, { Stone: [2, 10], Iron: [2, 10], Gold: [2, 5] }],
    [6, { Stone: [2, 10], Iron: [2, 10], Gold: [2, 10] }],
    [7, {
      Stone: [2, 10],
      Iron: [2, 10],
      Gold: [2, 10],
      Diamond: [2, 5],
    }],
    [8, {
      Stone: [2, 10],
      Iron: [2, 10],
      Gold: [2, 10],
      Diamond: [2, 10],
    }],
    [9, {
      Stone: [2, 12],
      Iron: [2, 12],
      Gold: [2, 12],
      Diamond: [2, 12],
    }],
    [10, {
      Stone: [2, 15],
      Iron: [2, 15],
      Gold: [2, 15],
      Diamond: [2, 15],
    }],
  ]),

  SawmillResources: new Map([
    [1, { Wood: [2, 5] }],
    [2, { Wood: [2, 10] }],
    [3, { Wood: [2, 10], WoodBeam: [2, 5] }],
    [4, { Wood: [2, 10], WoodBeam: [2, 10] }],
    [5, { Wood: [2, 12], WoodBeam: [2, 12] }],
    [6, { Wood: [2, 15], WoodBeam: [2, 15] }],
  ])
}