import fighters from './fighters-index.json';

export function getAllFighters() {
  return fighters;
}

export function searchFighters(query, limit = 5) {
  const q = query.trim().toLowerCase();                     //take typed name and interpret it as lowercase
  if (!q) return [];                                        //if nothing is typed, then appropriately return nothing
  return fighters                                           //('else' kinda) return fighters that include that searched string 
    .filter(f => (f.name || '').toLowerCase().includes(q))  //'.filter(variable => rules on filtering)'
    .slice(0, limit);                                       //take the best 5 matches to show
}

export function getFighterByName(name) {
  return fighters.find(f => f.name.toLowerCase() === name.toLowerCase()) || null;
}
