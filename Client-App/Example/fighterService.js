export const getFighterStats = (name) => {
  const fakeStats = {
    'Charles Oliveira': { wins: 34, losses: 9, draws: 1 },
    'Ilia Topuria': { wins: 15, losses: 0, draws: 0 },
    'Amanda Nunes': { wins: 23, losses: 5, draws: 0 },
  };

  return fakeStats[name] || null;
};