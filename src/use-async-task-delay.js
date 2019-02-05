import { useRef } from 'react';

import { useAsyncTaskTimeout } from './use-async-task-timeout';
import { shallowArrayEqual } from './utils';

export const useAsyncTaskDelay = (milliSeconds, inputs) => {
  const func = useRef();
  const prevInputs = useRef();
  if (!prevInputs.current || !shallowArrayEqual(prevInputs.current, inputs)) {
    prevInputs.current = inputs;
    func.current = () => true;
  }
  return useAsyncTaskTimeout(func.current, milliSeconds);
};

export default useAsyncTaskDelay;
