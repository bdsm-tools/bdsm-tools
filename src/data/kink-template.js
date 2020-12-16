export default {
  title: 'Kink.com: BDSM Checklist for Submissive',
  active: true,
  schema: {
    type: 'object',
    required: [
      'performer',
    ],
    intro: {
      type: 'object',
      performer: {
        type: 'string',
      },
      director: {
        type: 'string',
      },
      company: {
        type: 'string',
      },
      brand: {
        type: 'string',
      },
      title: {
        type: 'string',
      },
      production: {
        type: 'string',
        format: 'date',
      },
    },
    bdsm: {
      type: 'object',
      receiving: {
        type: 'lookuplist',
      },
      performing: {
        type: 'lookuplist',
      },
    },
    sensitivity: {
      type: 'object',
      general: {
        type: 'lookuplist',
      },
      vagina: {
        type: 'lookuplist',
      },
      penis: {
        type: 'lookuplist',
      },
    },
    more: {
      type: 'object',
      comments: {
        type: 'string',
      },
      nomarks: {
        type: 'boolean',
        default: true,
      },
      marks: {
        type: 'string',
      },
      universalsafeword: {
        type: 'boolean',
        default: true,
      },
      mysafeword: {
        type: 'string',
      },
    },
  },
  uischema: {
    type: 'Categorization',
    elements: [
      {
        type: 'Category',
        label: 'Introduction',
        elements: [
          {
            type: "VerticalLayout",
            elements: [
              {
                type: "Control",
                scope: "#/intro/performer",
                label: "Performer Name",
              },{
                type: "Control",
                scope: "#/intro/director",
                label: "Director Name",
              },{
                type: "Control",
                scope: "#/intro/company",
                label: "Production Company Name",
              },{
                type: "Control",
                scope: "#/intro/brand",
                label: "Brand/Site",
              },{
                type: "Control",
                scope: "#/intro/title",
                label: "Production Title (subject to change)",
              },{
                type: "Control",
                scope: "#/intro/production",
                label: "Date of Production",
              },
            ],
          },
        ],
      }, {
        type: 'Category',
        label: 'BDSM Activities',
        elements: [
          {
            type: "VerticalLayout",
            elements: [
              {
                type: 'Typography',
                subtype: 'Title',
                props: { level: 3 },
                text: 'Introduction',
              },{
                type: 'Typography',
                subtype: 'Paragraph',
                text: 'The purpose of this checklist is to document the adult performer’s understanding of the activities below and serve as a\n' +
                  'starting point for a discussion regarding the adult scene they will participate in on the date(s) of production.',
              }, {
                type: 'Typography',
                subtype: 'Paragraph',
                text: 'All participants maintain the right to refuse any activity, re-negotiate terms or ask for clarification at any time, with no\n' +
                  'questions asked, regardless of what is contained in this or any other document.',
              }, {
                type: 'Typography',
                subtype: 'Paragraph',
                text: 'This checklist is not comprehensive and includes space for additions. It is also not an indication that every activity listed\n' +
                  'will be requested during the scene.',
              }, {
                type: 'Typography',
                subtype: 'Title',
                props: { level: 3 },
                text: 'Definitions',
              }, {
                type: 'Typography',
                subtype: 'Paragraph',
                text: 'Yes: You understand and are willing to participate in the activity indicated.',
              }, {
                type: 'Typography',
                subtype: 'Paragraph',
                text: 'No: You understand and are NOT willing to participate in this activity.',
              }, {
                type: 'Typography',
                subtype: 'Paragraph',
                text: 'Needs Discussion: You might participate in this activity, but some clarification is required in order to make an\n' +
                  'informed decision. The level of intensity or the circumstances under which the action occurs are two examples\n' +
                  'of negotiable points that may be defined on the set, at the relevant time, between the performer, the director,\n' +
                  'and any other participant. Feel free to use the space provided to include comments.',
              }, {
                type: 'Typography',
                subtype: 'Paragraph',
                text: 'If you are inexperienced or otherwise unsure about any activity on this list, please check "No" or "Needs\n' +
                  'Discussion"',
              }, {
                type: 'Control',
                scope: '#/bdsm/receiving',
                label: 'Receiving/Experiencing',
                questions: [
                  'Clamps',
                  'Clothespins',
                  'Flogging / Whipping',
                  'Spanking / Paddling',
                  'Slapping (face)',
                  'Slapping (body)',
                  'Caning',
                  'Fondling / Tickling',
                  'Gags / Oral Toys',
                  'Breath Control',
                  'Forced Orgasm / Masturbation',
                  'Electrical play (zapper/TENS/cattle prod)',
                  'Cock and ball torture (CBT)',
                  'Hot Wax',
                  'Mummification',
                  'Sounding (inserting objects in urethra)',
                  'Restraints (rope/cuffs/tape)',
                  'Water play (dunking/spraying/dripping)',
                  'Enema',
                  'Verbal humiliation',
                  'Feminization / Sissification',
                  'Pissing on the body',
                  'Pissing on the face and head',
                  'Pissing in the mouth',
                ],
                answers: [
                  'Yes',
                  'No',
                  'Needs Discussion',
                ],
              },{
                type: 'Control',
                scope: '#/bdsm/performing',
                label: 'Performing',
                questions: [
                  'Foot worship (sucking/licking toes & feet)',
                  'Animal role play (“bark like a dog”, etc.)',
                ],
                answers: [
                  'Yes',
                  'No',
                  'Needs Discussion',
                ],
              }, {
                type: 'Typography',
                subtype: 'Title',
                props: { level: 3 },
                text: 'Physical Sensitivity',
              }, {
                type: 'Typography',
                subtype: 'Paragraph',
                text: 'This section describes the level of sensitivity of your specific body parts. Intensity is widely variable and largely adjustable\n' +
                  'to individual comfort levels. Sensation may include but is not limited to: hitting, spanking, smacking, pinching, pulling,\n' +
                  'sucking, and fucking.',
              }, {
                type: 'Typography',
                subtype: 'Title',
                props: { level: 3 },
                text: 'Definitions for this Section',
              }, {
                type: 'Typography',
                subtype: 'Paragraph',
                text: 'Strong: I can handle or am fond of heavy/above-average levels of intensity/sensation in this area.',
              }, {
                type: 'Typography',
                subtype: 'Paragraph',
                text: 'Medium: My tolerance level is average in this area.',
              }, {
                type: 'Typography',
                subtype: 'Paragraph',
                text: 'Low: My tolerance to sensation or pain in this area is particularly low.',
              }, {
                type: 'Typography',
                subtype: 'Paragraph',
                text: 'No: This area of the body is off-limits.',
              }, {
                type: 'Control',
                scope: '#/sensitivity/general',
                label: 'General Sensitivity',
                questions: [
                  'Hair-pulling',
                  'Face-slapping',
                  'Pecs / Breasts',
                  'Nipples',
                  'Butt cheeks',
                  'Bottoms of feet',
                  'Neck / Choking',
                  'Upper back / Shoulders',
                ],
                answers: [
                  'Strong',
                  'Medium',
                  'Low',
                  'No',
                ],
              },{
                type: 'Control',
                scope: '#/sensitivity/vagina',
                label: 'Vagina',
                questions: [
                  'Pubic mound / Mons pubis',
                  'Outer labia',
                  'Inner labia',
                  'Clitoris / hood',
                ],
                answers: [
                  'Strong',
                  'Medium',
                  'Low',
                  'No',
                ],
              },{
                type: 'Control',
                scope: '#/sensitivity/penis',
                label: 'Penis',
                questions: [
                  'Head (glans)',
                  'Shaft',
                  'Balls (scrotum)',
                ],
                answers: [
                  'Strong',
                  'Medium',
                  'Low',
                  'No',
                ],
              },
            ],
          },
        ],
      }, {
        type: 'Category',
        label: 'Finally',
        elements: [
          {
            type: "VerticalLayout",
            elements: [
              {
                type: 'Control',
                scope: '#/more/comments',
                label: 'Additional Comments / Notes',
                area: true,
              }, {
                type: 'Control',
                scope: '#/more/nomarks',
                label: 'I cannot be marked',
              }, {
                type: 'Control',
                scope: '#/more/marks',
                label: 'I can be marked in the following areas',
                rule: {
                  effect: 'HIDE',
                  condition: {
                    scope: '#/more/nomarks',
                    schema: { const: true },
                  },
                },
              }, {
                type: 'Control',
                scope: '#/more/universalsafeword',
                label: 'I will use the universally recognized safeword “RED” during this shoot',
              }, {
                type: 'Control',
                scope: '#/more/mysafeword',
                label: 'I will use the safeword',
                rule: {
                  effect: 'HIDE',
                  condition: {
                    scope: '#/more/universalsafeword',
                    schema: { const: true },
                  },
                },
              }, {
                type: 'Typography',
                subtype: 'Paragraph',
                text: 'If a performer or crew member says the safeword, all activities stop and action ceases while the\n' +
                  'scene can be adjusted until the performer can consent to continue.',
              }, {
                type: 'Typography',
                subtype: 'Paragraph',
                text: 'If a performer cannot say their safeword (for instance, because of a gag), they can signal by shaking\n' +
                  'their head back and forth three times, or looking directly at the director or other crew member.',
              },
            ],
          },
        ],
      },
    ],
  },
};
