
export const matchingForm = ([course, level, mission]) => {
  return course;
};

export const boardForm = ([course, level, mission], pairs) => {
  const obj = {
    mission : mission,
    levelPairs : [level, pairs],
  };

  return obj;
};

/*
console.log(boardForm(['프론트엔드', '레벨1', '자동자경주'], [['a', 'b'], ['c', 'd']]));
*/