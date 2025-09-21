const LOWER_IS_BETTER = new Set(['SApM', 'losses']); //for stats that lower is better, like losses

// paths to stats in the fighter JSON data, some stats have multiple possible paths due to inconsistencies in the data source
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

// get nested property from object using dot separated path string
const resolvePath = (obj, path) => path.split('.').reduce((o, k) => (o && k in o ? o[k] : undefined), obj);

// tries multiple possible paths to find the first valid value in an object.
// Useful because fighter data may have the same stat under different keys
// or sometimes contain empty or placeholder values like null, "" or "N/A"
const firstVal = (obj, paths) => { 
  for (const p of paths) {
    const v = resolvePath(obj, p); 
    if (v !== undefined && v !== null) { 
      const s = String(v).trim(); 
      if (s && s.toUpperCase() !== 'N/A') return s; 
    }
  }
  return null;
};

const num = (v) => { 
  if (v == null) return null;
  const n = parseFloat(String(v).replace(/[^0-9.+-]/g, '')); 
  return Number.isFinite(n) ? n : null; 
};

export const DEFAULT_WEIGHTS = { //these are manual weights, I wanted/want to have these be determined off history, but that would
// require insanely complex scraping. for now I am using my best judgement

  StrikeLandpM: 3,     // significant strikes landed per minute
  StrikeAbspM: 3,     // significant strikes absorbed per minute
  StrAcc: 2,   // significant strike accuracy
  StrDef: 2,   // significant strike defense
  StrDef: 2,   // significant strike defense
  TDAvg: 2,    // takedown average
  TDAcc: 2,    // takedown accuracy
  TDDef: 2,    // takedown defense
  SubAvg: 1,   // submission average
  reach: 1,    // reach in inches
  height: 1,   // height in inches
  wins: 1,     // total wins
  losses: 1,   // total losses
  koPct: 1,    // knockout win percentage
  subPct: 1,   // submission win percentage
  decPct: 0.5, // decision win percentage
};

export default function calculateFightResults(f1, f2, weights = DEFAULT_WEIGHTS) {
  let score1 = 0;
  let score2 = 0;

  for (const [key, weight] of Object.entries(weights)) { 
    const paths = METRIC_PATHS[key]; 
    if (!paths || !Number.isFinite(weight)) continue; 

    const v1 = num(firstVal(f1, paths)); 
    const v2 = num(firstVal(f2, paths)); 
    if (v1 == null || v2 == null) continue; 

    const lower = LOWER_IS_BETTER.has(key); //for stats that advatnage if lower
    const diff = lower ? (v2 - v1) : (v1 - v2); // positive means f1 better

    if (diff > 0) score1 += weight * diff; 
    else if (diff < 0) score2 += weight * (-diff); 
  }

  const total = score1 + score2;
  const percent1 = total > 0 ? Math.round((score1 / total) * 100) : 50;
  const percent2 = 100 - percent1;

  return { score1, score2, percent1, percent2 };
}
