const flanges = [
  {
    type: 'flange',
    endConnections: [
      {
        type: 'tube',
        length: 50,
        endConnections: [
          {
            type: 'flange',
          },
        ],
      },
    ],
    surface: {
      type: 'floor',
      coords: [20, 20],
    },
  },
  {
    type: 'flange',
    endConnections: [
      {
        type: 'tube',
        length: 20,
        endConnections: [
          {
            type: 'flange',
          },
        ],
      },
    ],
    surface: {
      type: 'back-wall',
      coords: [20, 60],
    },
  },
];

const tees = [
  {
    type: 'flange',
    endConnections: [
      {
        type: 'tube',
        length: 50,
        middleConnections: [
          {
            type: 'tee',
            position: 40,
          },
        ],
        endConnections: [
          {
            type: 'tee',
          },
        ],
      },
    ],
    surface: {
      type: 'floor',
      coords: [40, 20],
    },
  },
  {
    type: 'flange',
    endConnections: [
      {
        type: 'tube',
        length: 20,
        middleConnections: [
          {
            type: 'tee',
            position: 10,
            marker: 1,
          },
        ],
        endConnections: [
          {
            type: 'tee',
          },
        ],
      },
    ],
    surface: {
      type: 'back-wall',
      coords: [40, 60],
    },
  },
];

const crossovers = [
  {
    type: 'flange',
    endConnections: [
      {
        type: 'tube',
        length: 50,
        middleConnections: [
          {
            type: 'crossover',
            position: 40,
          },
        ],
      },
    ],
    surface: {
      type: 'floor',
      coords: [60, 20],
    },
  },
  {
    type: 'flange',
    endConnections: [
      {
        type: 'tube',
        length: 20,
        middleConnections: [
          {
            type: 'crossover',
            position: 10,
          },
        ],
      },
    ],
    surface: {
      type: 'back-wall',
      coords: [60, 60],
    },
  },
];

const corners = [
  {
    type: 'flange',
    endConnections: [
      {
        type: 'tube',
        length: 50,
        endConnections: [
          {
            type: 'corner',
          },
        ],
      },
    ],
    surface: {
      type: 'floor',
      coords: [80, 20],
    },
  },
  {
    type: 'flange',
    endConnections: [
      {
        type: 'tube',
        length: 20,
        endConnections: [
          {
            type: 'corner',
          },
        ],
      },
    ],
    surface: {
      type: 'back-wall',
      coords: [80, 60],
    },
  },
];

export default {
  id: '__dev__',
  version: 1,
  title: 'Dev Scene',
  length: 300,
  width: 400,
  height: 240,
  brightness: 0.75,
  chains: [flanges, tees, crossovers, corners].flat(),
};
