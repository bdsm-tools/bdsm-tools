export const dList = ['Dominant', 'Master', 'Mistress', 'Owner'];
export const sList = ['Submissive', 'Slave', 'Toy', 'Pet'];
export const isDominant = (role) => dList.includes(role);
export const isSubmissive = (role) => sList.includes(role);
export const byRole = (u1, u2) => {
  if (u1.role === u2.role || (isDominant(u1.role) && isDominant(u2.role)) || (isSubmissive(u1.role) && isSubmissive(u2.role))) {
    return 0;
  } else if (isDominant(u1.role)) {
    return -1
  } else if (isDominant(u2.role)) {
    return 1;
  } else if (isSubmissive(u1.role)) {
    return -1;
  } else if (isSubmissive(u2.role)) {
    return 1;
  } else {
    return 0;
  }
};
export const extractPlanData = (sceneId) => Buffer.from(sceneId, 'base64')
  .toString('utf8')
  .split(":");