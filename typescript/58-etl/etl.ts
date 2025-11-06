type OldScoreFormat = {
  [score: string]: string[];
};

type NewScoreFormat = {
  [letter: string]: number;
};

export function transform(oldData: OldScoreFormat): NewScoreFormat {
  const newData: NewScoreFormat = {};

  for (const scoreKey of Object.keys(oldData)) {
    const scoreValue = Number(scoreKey);
    const letters = oldData[scoreKey];
    for (const letter of letters) {
      const lowerCaseLetter = letter.toLowerCase();
      newData[lowerCaseLetter] = scoreValue;
    }
  }

  return newData;
}
