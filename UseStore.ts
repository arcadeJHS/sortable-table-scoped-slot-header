import { ref } from 'vue';

const items = ref([
  { id: 1, jobFamily: 'Engineering', level: 'L100 (R1)', skillsLevel: 2 },
  { id: 2, jobFamily: 'Architecture', level: 'S500 (R2)', skillsLevel: 1 },
  { id: 3, jobFamily: 'Data Science', level: 'S200 (R1)', skillsLevel: 3 }
]);

export const UseStore = () => {
  return items;
}