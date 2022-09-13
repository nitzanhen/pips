
/**
 * Can be called with a function that transforms the current value `x`, or with no arguments
 * to return the current value.
 */
export interface Pipe<T> {
  <S>(fn: (x: T) => S): Pipe<S>
  (): T;
}

/**
 * Can be called with a value to initiate the pipeline with,
 * or with no value to initiate a pipeline with no value. 
 */
export interface PipeFactory {
  <T>(value: T): Pipe<T>;
  (): Pipe<never>;
}


/**
 * Pipes a value through a chain of functions in succession.
 * 
 * To end the pipeline and get the final result, call the pipeline with no arguments
 * 
 * @example
 * const v1 = pipe(1)
 *   (x => x + 1)
 *   (x => x * 2)
 *   ();
 * 
 * console.log(v1) // 4
 */
export const pipe = (<T>(x: T) => (
    <S>(fn?: (x: T) => S) => fn ? pipe(fn(x)) : x
  )) as PipeFactory;


  