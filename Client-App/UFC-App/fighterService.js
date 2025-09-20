import fighters from './fighters-index.json';

export function getAllFighters() {
  return fighters;
}

export function searchFighters(query, weightClassLabel, limit = 5) {
  const q = query.trim().toLowerCase();                     
  if (!q) return [];                                        
  let arr = fighters.filter(f => (f.name || '').toLowerCase().includes(q));  
  if (weightClassLabel) { 
    arr = arr.filter(f => f.weight_class === weightClassLabel); 
  }
  return arr.slice(0, limit);
}

export function getFighterByName(name) {
  return fighters.find(f => f.name.toLowerCase() === name.toLowerCase()) || null;
}
