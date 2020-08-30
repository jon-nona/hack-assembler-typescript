import R from 'ramda'

const getAmountOfLeftPad: (
  wantedLength: number,
  value: string,
) => string = R.compose(R.max(0), (wantedLength: string, value: number) =>
  R.subtract(wantedLength, R.length(value)),
)

const getLeftPad: (wantedLength: number, value: string) => string = R.compose(
  R.join(''),
  R.repeat('0'),
  getAmountOfLeftPad,
)

export const leftPad = R.curry((wantedLength: number, value: string) =>
  R.compose(R.apply(R.concat), R.juxt([getLeftPad, R.nthArg(1)]))(
    wantedLength,
    value,
  ),
)
