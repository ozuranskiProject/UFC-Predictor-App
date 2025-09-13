// calculateFight.js (ultra simple, diff-based)

const LOWER_IS_BETTER = new Set(['SApM', 'losses']); //for stats that lower is better

const METRIC_PATHS = {
  SLpM:   ['fight_stats.SLpM'],
  SApM:   ['fight_stats.SApM'],
  StrAcc: ['fight_stats.Str. Acc.'],
  StrDef: ['fight_stats.Str. Def.', 'fight_stats.Str.Def'],
  TDAvg:  ['fight_stats.TDAvg'],
  TDAcc:  ['fight_stats.TD Acc.'],
  TDDef:  ['fight_stats.TDDef'],
  SubAvg: ['fight_stats.Sub.Avg'],
  reach:  ['bio.reach'],
  height: ['bio.height'],
  wins:   ['record.wins'],
  losses: ['record.losses'],
  koPct:  ['win_methods.KO'],
  decPct: ['win_methods.DEC'],
  subPct: ['win_methods.SUB'],
};

//.split turns path into array of keys, obj and path, .reduce combs through to find the correct o and k, return undef if doesnt exist
const getVal = (obj, path) => path.split('.').reduce((o, k) => (o && k in o ? o[k] : undefined), obj);

const firstVal = (obj, paths) => { // go through each path string in the array
  for (const p of paths) {
    const v = getVal(obj, p); // try to get obj[p]
    if (v !== undefined && v !== null) { //if v exists
      const s = String(v).trim(); //turn into useable string
      if (s && s.toUpperCase() !== 'N/A') return s; //only return if value isnt N/A
    }
  }
  return null;
};

const num = (v) => { //all the json data, even 'numbers' are strings, so they need to be converted to numbers
  if (v == null) return null;
  const n = parseFloat(String(v).replace(/[^0-9.+-]/g, '')); //ensure stat is cleaned up of anything that would keep it from being a number
  return Number.isFinite(n) ? n : null; //only return number if it is real and finite
};

export const DEFAULT_WEIGHTS = { //these are manual weights, I wanted/want to have these be determined off history, but that would
// require insanely complex scraping. for now I am using my best judgement
  SLpM: 3,
  SApM: 3,
  StrAcc: 2,
  StrDef: 2,
  TDAvg: 2,
  TDAcc: 2,
  TDDef: 2,
  SubAvg: 1,
  reach: 1,
  height: 1,
  wins: 1,
  losses: 1,
  koPct: 1,
  subPct: 1,
  decPct: 0.5,
};

export default function calculateFight(f1, f2, weights = DEFAULT_WEIGHTS) {
  let score1 = 0;
  let score2 = 0;

  for (const [key, weight] of Object.entries(weights)) { //stat name and appropriate weight
    const paths = METRIC_PATHS[key]; //find path for stat
    if (!paths || !Number.isFinite(weight) || weight === 0) continue; //skip it if it doesnt exist, is unusuable or weight is zero

    const v1 = num(firstVal(f1, paths)); //take value for f1 turn it to a number
    const v2 = num(firstVal(f2, paths)); //take value for f2 turn it to a number
    if (v1 == null || v2 == null) continue; //skip if either stat is null

    const lower = LOWER_IS_BETTER.has(key); //for stats that advatnage if lower
    const diff = lower ? (v2 - v1) : (v1 - v2); // positive means f1 better

    if (diff > 0) score1 += weight * diff; //add score to fighter 1 if they have advantage
    else if (diff < 0) score2 += weight * (-diff); //add score to fighter 2 if they have advantage
  }

  const total = score1 + score2;
  const percent1 = total > 0 ? Math.round((score1 / total) * 100) : 50;
  const percent2 = 100 - percent1;

  return { score1, score2, percent1, percent2 };
}
