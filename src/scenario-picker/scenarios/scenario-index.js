import {alphabeticalSort} from "../../util";
import HookedToADoor from './hooked-to-a-door';
import AutomatedDenial from './automated-denial';
import DailyServicing from './daily-servicing';
import FollowYourMistress from './follow-your-mistress';
import ShowMeHowMuch from './show-me-how-much';

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
        ],
        author: 'keepsafemaster',
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
            'Belts or straps',
            'Wrist restraints',
            'Ankle restraints',
        ],
        optionalEquipment: [
            'Gag',
            'Blindfold',
            'Extra restraints',
        ],
        author: 'keepsafemaster',
    }, {
        name: 'Daily Servicing',
        path: 'daily-servicing',
        Component: DailyServicing,
        participantCount: 2,
        description: 'Your Slave is required to service his Mistress every day. Today, for some reason he has not (forgotten maybe, doesn’t want to). This is unacceptable and must be rectified. You will tie your Slave down and make him service you like a good Slave does, make him learn his lesson.',
        location: 'Any room with a large enough surface area for the Slave to lay completely straight, still leaving some surrounding space for the Mistress to position herself. Avoid a bed because the uneven surface could be tricky.\n',
        participants: [
            'Male Slave',
            'Mistress',
        ],
        requiredEquipment: [
            'Belts or straps',
        ],
        optionalEquipment: [
            'Blindfold',
            'Butt plug',
            'Cock Sling',
            'Dominant Outfit',
            'Impact Toys',
            'Nipple clamps',
            'Milking Machine',
        ],
        author: 'keepsafemaster',
    }, {
        name: 'Follow your Mistress',
        path: 'follow-your-mistress',
        Component: FollowYourMistress,
        participantCount: 2,
        description: 'This scene you will walk your Slave around the house, he must pleasure you in every room.',
        location: 'A house with several rooms: Living room - a room with a sofa; Kitchen - a room with worktops; Bedroom - a room with a bed; Bathroom - a room with a bathtub or toilet',
        participants: [
            'Male Slave',
            'Mistress',
        ],
        requiredEquipment: [
            'Collar with leash',
        ],
        optionalEquipment: [
            'Blindfold',
            'Butt plug',
            'Cock cage',
            'Dominant Outfit',
            'Vibrator',
            'Wrist restraints',
            'Double sided penis gag',
        ],
        author: 'keepsafemaster',
    }, {
        name: 'Show me how much you want it',
        path: 'show-me-how-much',
        Component: ShowMeHowMuch,
        participantCount: 2,
        description: 'This scene will show how badly your Slave wants to lick his Mistress’s pussy.',
        location: 'A bed with a way to tie a limb to each bed post.',
        participants: [
            'Male Slave',
            'Mistress',
        ],
        requiredEquipment: [
            'Rope',
            'Wrist restraints',
            'Ankle restraints',
            'Open mouth harness gag',
            'Ass Hook',
            'Ratchet winch',
        ],
        optionalEquipment: [
            'Blindfold',
            'Dominant Outfit',
            'Impact Toys',
        ],
        author: 'keepsafemaster',
    }
].sort(alphabeticalSort(scene => scene.name));