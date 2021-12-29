import HookedToADoor from './hooked-to-a-door';
import {alphabeticalSort} from "../../util";

export default [
    {
        name: 'Hooked to a Door',
        path: 'hooked-to-a-door',
        Component: HookedToADoor,
        participantCount: 2,
        description: 'Your Slave is yours for whatever you want, this could be a punishment for bad behaviour or just to show your control/power over them.',
        location: 'Any room with a door that can hold a fixture when closed.',
        participants: ['Male Slave', 'Female Slave', 'Master', 'Mistress'],
        requiredEquipment: [
            'Ass Hook',
            'Ratchet winch',
            'Wrist restraints',
            'Over the door fixture',
            'Collar with an O-ring',
        ],
        optionalEquipment: [
            'Blindfold',
            'Open mouth Gag',
            'Dominant Outfit',
            'Nipple clamps',
            'Ankle restraints',
            'Spreader Bar',
            'Equipment to punish/pleasure the Slave’s genitals',

        ]
    },
].sort(alphabeticalSort(scene => scene.name));