export default [
  {
    title: 'Simple Negotiation',
    schema: {
      type: 'object',
      intro: {
        type: 'object',
        name: {
          type: 'string',
        },
        verifyAge: {
          type: 'boolean',
        },
      },
      pussy: {
        type: 'object',
        verifyPussy: {
          type: 'boolean',
        },
        acts: {
          type: 'lookuplist',
        },
      },
      dick: {
        type: 'object',
      },
      ass: {},
      equipment: {
        type: 'object',
      },
    },
    uischema: {
      type: 'Categorization',
      elements: [
        {
          type: 'Category',
          label: 'Intro',
          elements: [
            {
              type: "VerticalLayout",
              elements: [
                {
                  type: "Control",
                  scope: "#/intro/name",
                  label: "Your Name:",
                }, {
                  type: 'Control',
                  scope: '#/intro/verifyAge',
                  label: 'Verify I am over the age of 18',
                },
              ],
            },
          ],
        }, {
          type: 'Category',
          label: 'Pussy',
          elements: [
            {
              type: "VerticalLayout",
              elements: [
                {
                  type: 'Control',
                  scope: '#/pussy/verifyPussy',
                  label: 'Verify I have a pussy',
                }, {
                  type: 'Control',
                  scope: '#/pussy/acts',
                  label: '',
                  questions: [
                    'Penetration',
                  ],
                  answers: [
                    '',
                    'Soft Limit',
                    'Hard Limit',
                  ],
                },
              ],
            }
          ],
        },
      ],
    },
    questions: [
      {
        label: 'Question',
        description: '',
        imageUrl: null,
      },
    ],
    answerLabels: [
      '...',
      'Soft Limit',
      'Hard Limit',
    ],
  },
];
