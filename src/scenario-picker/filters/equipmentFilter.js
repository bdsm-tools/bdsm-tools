import Cookies from 'js-cookie';

export default () => {
  const myEquipment = (Cookies.get('my-equipment') || '').split('|');
  return ({ requiredEquipment }) =>
    requiredEquipment.every((v) => myEquipment.includes(v));
};
