import fighters from './fighters-index.json';

export function getAllFighters() {
  return fighters;
}

export function searchFighters(query, weightClassLabel, limit = 5) {
  const q = query.trim().toLowerCase();                     //take typed name and interpret it as lowercase
  if (!q) return [];                                        //if nothing is typed, then appropriately return nothing
  let arr = fighters.filter(f => (f.name || '').toLowerCase().includes(q));  //return array of names with search query contained
  if (weightClassLabel) { //there SHOULDNT be any way there is no weightclass but im told this is good practice
    arr = arr.filter(f => f.weight_class === weightClassLabel); //then only take the fighters with matching weightclasses
  }
  return arr.slice(0, limit);
}

export function getFighterByName(name) {
  return fighters.find(f => f.name.toLowerCase() === name.toLowerCase()) || null;
}
