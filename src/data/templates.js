export default [
    {
        title: 'Simple Contract',
        schema: {
            type: 'object',
            intro: {
                type: 'object',
                name: {
                    type: 'string',
                }
            }
        },
        uischema: {
            type: "VerticalLayout",
            elements: [
                {
                    type: "Control",
                    scope: "#/intro/name",
                    label: "Your Name:"
                }
            ]
        },
        questions: [
            {
                label: 'Question',
                description: '',
                imageUrl: null,
            }
        ],
        answerLabels: [
            '...',
            'Soft Limit',
            'Hard Limit',
        ]
    }
]

