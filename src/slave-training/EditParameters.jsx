import React from 'react';
import MyEquipment from '../components/MyEquipment';
import MyBodyParts from '../components/MyBodyParts';

export default function EditParameters() {


  return (
    <div className='flex space-around' style={{ marginBottom: 20 }}>
      <MyEquipment/>
      <MyBodyParts/>
    </div>
  );
}