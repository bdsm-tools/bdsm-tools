import Cookies from "js-cookie";

export default (myEquipment) => ({ requiredEquipment }) => requiredEquipment.every(v => myEquipment.includes(v));
