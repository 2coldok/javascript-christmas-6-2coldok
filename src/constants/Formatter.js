// U -> 1, D -> 0

export const spaceFilter = (spaceString) => {
  if (spaceString === 'U') return 1;
  if (spaceString === 'D') return 0;
};

// [ [ 'O', ' ', ' ' ], [ ' ', 'O', 'O' ] ]
export const traceFilter = ([upTrace, downTrace]) => {
  const up = upTrace.join(' | ');
  const down = downTrace.join(' | ');

  return [`[ ${up} ]`, `[ ${down} ]`];
}

export const successFilter = (boolean) => {
  if (boolean) return '성공';
  if (!boolean) return '실패';
}

/*
console.log(traceFilter([ [ 'O', ' ', ' ' ], [ ' ', 'O', 'O' ] ]));
*/