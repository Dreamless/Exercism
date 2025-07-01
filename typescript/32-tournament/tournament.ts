type TeamStats = {
  MP: number;
  W: number;
  D: number;
  L: number;
  P: number;
};

export class Tournament {
  public tally(input: string): string {
    const header = 'Team                           | MP |  W |  D |  L |  P';

    const stats: {
      [teamName: string]: TeamStats;
    } = {};

    const initializeTeam = (teamName: string): void => {
      if (!stats[teamName]) {
        stats[teamName] = { MP: 0, W: 0, D: 0, L: 0, P: 0 };
      }
    };

    const matches: string[] = input.split('\n').filter(line => line.trim() !== '');

    for (const match of matches) {
      const [team1, team2, result] = match.split(';');

      initializeTeam(team1);
      initializeTeam(team2);

      stats[team1].MP++;
      stats[team2].MP++;

      switch (result) {
        case 'win':
          stats[team1].W++;
          stats[team1].P += 3;
          stats[team2].L++;
          break;
        case 'loss':
          stats[team1].L++;
          stats[team2].W++;
          stats[team2].P += 3;
          break;
        case 'draw':
          stats[team1].D++;
          stats[team1].P += 1;
          stats[team2].D++;
          stats[team2].P += 1;
          break;
      }
    }

    const sortedTeams: string[] = Object.keys(stats).sort((a: string, b: string): number => {
      const pointsDiff = stats[b].P - stats[a].P;
      if (pointsDiff !== 0) {
        return pointsDiff;
      }
      return a.localeCompare(b);
    });

    const rows: string[] = sortedTeams.map(teamName => {
      const teamStats: TeamStats = stats[teamName];
      const namePadded = teamName.padEnd(31);
      const mpPadded = String(teamStats.MP).padStart(2);
      const wPadded = String(teamStats.W).padStart(2);
      const dPadded = String(teamStats.D).padStart(2);
      const lPadded = String(teamStats.L).padStart(2);
      const pPadded = String(teamStats.P).padStart(2);

      return `${namePadded}| ${mpPadded} | ${wPadded} | ${dPadded} | ${lPadded} | ${pPadded}`;
    });

    return [header, ...rows].join('\n');
  }
}
