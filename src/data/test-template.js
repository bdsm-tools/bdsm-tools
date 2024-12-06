export default {
  title: 'Simple Negotiation',
  description:
    'This is an example negotiation with some basic questions on a few areas of interest.',
  active: true,
  schema: {
    type: 'object',
    required: ['name', 'experience'],
    intro: {
      type: 'object',
      name: {
        type: 'string',
      },
      verifyAge: {
        type: 'boolean',
      },
      verifyAge2: {
        type: 'boolean',
      },
      experience: {
        type: 'enum',
        options: ['None', 'A Little', 'A Lot', 'Very Experienced'],
      },
    },
    pussy: {
      type: 'object',
      verifyPussy: {
        type: 'boolean',
      },
      pussyActs: {
        type: 'lookuplist',
      },
    },
    bondage: {
      type: 'object',
      verifyBondage: {
        type: 'boolean',
      },
      bondageActs: {
        type: 'lookuplist',
      },
    },
    roleplay: {
      type: 'object',
      verifyRoleplay: {
        type: 'boolean',
      },
      roleplayActs: {
        type: 'lookuplist',
      },
    },
    dick: {
      type: 'object',
      verifyDick: {
        type: 'boolean',
      },
      dickActs: {
        type: 'lookuplist',
      },
    },
    ass: {
      type: 'object',
      verifyAss: {
        type: 'boolean',
      },
      assActs: {
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
            type: 'VerticalLayout',
            width: '400px',
            elements: [
              {
                type: 'Control',
                scope: '#/intro/name',
                label: 'Your Name:',
              },
              {
                type: 'Control',
                scope: '#/intro/verifyAge',
                label: 'Verify I am over the age of 18',
              },
              {
                type: 'Control',
                scope: '#/intro/verifyAge2',
                label: 'Verify I am over the age of 21',
                rule: {
                  effect: 'SHOW',
                  condition: {
                    scope: '#/intro/verifyAge',
                    schema: { const: true },
                  },
                },
              },
              {
                type: 'Control',
                scope: '#/intro/experience',
                label: 'BDSM Experience Level',
              },
            ],
          },
        ],
      },
      {
        type: 'Category',
        label: 'Bondage',
        elements: [
          {
            type: 'VerticalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/bondage/verifyBondage',
                label: 'Verify I want to be in Bondage',
              },
              {
                type: 'Control',
                scope: '#/bondage/bondageActs',
                label: 'Select an answer for each act',
                questions: [
                  'Light Bondage (wrist/leg restraints but nothing too complex or restricting',
                  'Medium Bondage (whole body restraining, average restrictions)',
                  'Hard Bondage (whole body restraints with complex binds making it very difficult to move if at all)',
                  'Rope Bondage',
                  'Metal Cuffs (Police issue handcuffs)',
                  'Metal Chains',
                  'Metal Contraptions (stocks, fiddle, etc.)',
                  'Predicament Bondage (bondage that puts you in a situation where it is uncomfortable for you to move or where you have to choose one pain over another',
                  'Suspension Bondage (bondage that involves you being bound so you are not touching the floor)',
                ],
                answers: ['Accept', 'Soft Limit', 'Hard Limit'],
                rule: {
                  effect: 'SHOW',
                  condition: {
                    scope: '#/bondage/verifyBondage',
                    schema: { const: true },
                  },
                },
              },
            ],
          },
        ],
      },
      {
        type: 'Category',
        label: 'Role Play',
        elements: [
          {
            type: 'VerticalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/roleplay/verifyRoleplay',
                label: 'Verify I want to partake in Role Play',
              },
              {
                type: 'Control',
                scope: '#/roleplay/roleplayActs',
                label: 'Select an answer for each act',
                questions: [
                  'Master/Slave',
                  'Daddy/Daughter',
                  'Owner/Pet',
                  'Teacher/Student',
                  'Nurse/Patient',
                  'Police Officer/Suspect',
                ],
                answers: [
                  'Very Interested',
                  'Interested',
                  'Not Interested',
                  'Definitely Not Interested',
                ],
                rule: {
                  effect: 'SHOW',
                  condition: {
                    scope: '#/roleplay/verifyRoleplay',
                    schema: { const: true },
                  },
                },
              },
            ],
          },
        ],
      },
      {
        type: 'Category',
        label: 'Pussy',
        elements: [
          {
            type: 'VerticalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/pussy/verifyPussy',
                label: 'Verify I have a pussy',
              },
              {
                type: 'Control',
                scope: '#/pussy/pussyActs',
                label: 'Select an answer for each act',
                questions: ['Penetration', 'Vibrator', 'Clamps'],
                answers: ['Accept', 'Soft Limit', 'Hard Limit'],
                rule: {
                  effect: 'SHOW',
                  condition: {
                    scope: '#/pussy/verifyPussy',
                    schema: { const: true },
                  },
                },
              },
            ],
          },
        ],
      },
      {
        type: 'Category',
        label: 'Dick',
        elements: [
          {
            type: 'VerticalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/dick/verifyDick',
                label: 'Verify I have a Dick',
              },
              {
                type: 'Control',
                scope: '#/dick/dickActs',
                label: '',
                questions: ['Penetration'],
                answers: ['Accept', 'Soft Limit', 'Hard Limit'],
                rule: {
                  effect: 'SHOW',
                  condition: {
                    scope: '#/dick/verifyDick',
                    schema: { const: true },
                  },
                },
              },
            ],
          },
        ],
      },
      {
        type: 'Category',
        label: 'Ass',
        elements: [
          {
            type: 'VerticalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/ass/verifyAss',
                label: 'Verify I have an Ass',
              },
              {
                type: 'Control',
                scope: '#/ass/assActs',
                label: '',
                questions: ['Penetration'],
                answers: ['Accept', 'Soft Limit', 'Hard Limit'],
                rule: {
                  effect: 'SHOW',
                  condition: {
                    scope: '#/ass/verifyAss',
                    schema: { const: true },
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};
