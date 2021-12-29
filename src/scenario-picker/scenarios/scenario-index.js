import {alphabeticalSort} from "../../util";
import HookedToADoor from './hooked-to-a-door';
import AutomatedDenial from './automated-denial';

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
    }, {
        name: 'Automated Denial',
        path: 'automated-denial',
        Component: AutomatedDenial,
        participantCount: 1,
        description: 'The Slave is to be prepared for use by teasing and denying orgasm, over and over again. This is mainly a solo male scene but does require someone to help setup. The ending does require another person.',
        location: 'A room with anchor points for feet and hands above the head. A bed works well but is better if the Slave cannot easily move from side to side too.',
        participants: [
            'Male Slave'
        ],
        requiredEquipment: [
            'Edge-O-Matic (or equivalent), with associated equipment',
            'Belt or strap',
            'Wrist restraints',
            'Ankle restraints',
        ],
        optionalEquipment: [
            'Gag',
            'Blindfold',
            'Extra restraints',
        ],
    }
].sort(alphabeticalSort(scene => scene.name));