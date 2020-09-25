import R from 'ramda'
import stripComments from 'strip-comments'

export const removeEmpty: (lines: string[]) => string[] = R.reject(R.isEmpty)
export const removeWhiteSpace: (lines: string[]) => string[] = R.map(
  R.replace(/\s+/g, ''),
)
export const linesToArray: (input: string) => string[] = R.split('\n')
export const arrayToLines: (values: string[]) => string = R.join('\n')

export const cleanCommentsAndRemoveBlankLines: (
  input: string,
) => string = R.pipe(
  stripComments,
  linesToArray,
  removeEmpty,
  removeWhiteSpace,
  arrayToLines,
)
