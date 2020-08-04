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
        verifyDick: {
          type: 'boolean',
        },
        acts: {
          type: 'lookuplist',
        },
      },
      ass: {
        type: 'object',
        verifyAss: {
          type: 'boolean',
        },
        acts: {
          type: 'lookuplist',
        },
      },
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
                    'Vibrator',
                    'Clamps',
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
        }, {
          type: 'Category',
          label: 'Dick',
          elements: [
            {
              type: "VerticalLayout",
              elements: [
                {
                  type: 'Control',
                  scope: '#/dick/verifyDick',
                  label: 'Verify I have a Dick',
                }, {
                  type: 'Control',
                  scope: '#/dick/acts',
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
        }, {
          type: 'Category',
          label: 'Ass',
          elements: [
            {
              type: "VerticalLayout",
              elements: [
                {
                  type: 'Control',
                  scope: '#/ass/verifyAss',
                  label: 'Verify I have an Ass',
                }, {
                  type: 'Control',
                  scope: '#/ass/acts',
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
  },
];
