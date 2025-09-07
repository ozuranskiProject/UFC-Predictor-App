import fighters from './fighters-index.json';

export function getAllFighters() {
  return fighters;
}

export function searchFighters(query, weightClassLabel, limit = 5) {
  const q = query.trim().toLowerCase();                     //take typed name and interpret it as lowercase
  if (!q) return [];                                        //if nothing is typed, then appropriately return nothing
  //return fighters                                           //('else' kinda) return fighters that include that searched string 
  //  .filter(f => (f.name || '').toLowerCase().includes(q))  //'.filter(variable => rules on filtering)' in this case .includes q is whats actually doing the work as it says to return stuff with the query string in it
  //  .filter(f => f.weight_class === weightClassLabel)       // weight class filter
  //  .slice(0, limit);                                       //take the best 5 matches to show
  let arr = fighters.filter(f => (f.name || '').toLowerCase().includes(q));
  if (weightClassLabel) arr = arr.filter(f => f.weight_class === weightClassLabel); // optional but recommended
  return arr.slice(0, limit);
}

export function getFighterByName(name) {
  return fighters.find(f => f.name.toLowerCase() === name.toLowerCase()) || null;
}
