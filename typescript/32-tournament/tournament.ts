type TeamStats = {
  MP: number;
  W: number;
  D: number;
  L: number;
  P: number;
};

export class Tournament {
  public tally(input: string): string {
    const matches: string[] = input.split('\n').filter(line => line.trim());
    const stats = new Map<string, TeamStats>();

    for (const match of matches) {
      const [team1, team2, result] = match.split(';');

      if (!stats.has(team1)) {
        stats.set(team1, { MP: 0, W: 0, D: 0, L: 0, P: 0 });
      }
      if (!stats.has(team2)) {
        stats.set(team2, { MP: 0, W: 0, D: 0, L: 0, P: 0 });
      }

      const stats1 = stats.get(team1)!;
      const stats2 = stats.get(team2)!;

      stats1.MP++;
      stats2.MP++;

      switch (result) {
        case 'win':
          stats1.W++;
          stats1.P += 3;
          stats2.L++;
          break;
        case 'loss':
          stats1.L++;
          stats2.W++;
          stats2.P += 3;
          break;
        case 'draw':
          stats1.D++;
          stats1.P += 1;
          stats2.D++;
          stats2.P += 1;
          break;
      }
    }

    const teams = Array.from(stats.entries());

    teams.sort((a, b) => {
      if (a[1].P !== b[1].P) {
        return b[1].P - a[1].P;
      }

      return a[0].localeCompare(b[0]);
    });

    const maxTeamNameLength = Math.max(
      30,
      ...teams.map(([team]) => team.length)
    );

    const header = `${'Team'.padEnd(maxTeamNameLength)} | MP |  W |  D |  L |  P`;

    const result: string[] = [header];

    for (const [team, stat] of teams) {
      const teamName = team.padEnd(maxTeamNameLength);
      const mp = stat.MP.toString().padStart(2);
      const w = stat.W.toString().padStart(2);
      const d = stat.D.toString().padStart(2);
      const l = stat.L.toString().padStart(2);
      const p = stat.P.toString().padStart(2);
      const row = `${teamName} | ${mp} | ${w} | ${d} | ${l} | ${p}`;
      result.push(row);
    }

    return result.join('\n');
  }
}
