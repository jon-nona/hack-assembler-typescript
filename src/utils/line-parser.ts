import R from 'ramda'
import stripComments from 'strip-comments'

export const removeEmpty: (lines: string[]) => string[] = R.reject(R.isEmpty)
export const removeWhiteSpace: (lines: string[]) => string[] = R.map(R.trim)
export const toLines: (input: string) => string[] = R.split('\n')
export const fromLines: (values: string[]) => string = R.join('\n')

export const cleanCommentsAndRemoveBlankLines: (
  input: string,
) => string = R.pipe(
  stripComments,
  toLines,
  removeEmpty,
  removeWhiteSpace,
  fromLines,
)
