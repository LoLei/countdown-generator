export const callFuncOnKeyPress = (
  func: () => void,
  canSubmit: boolean,
  currentKey: string,
  triggerKey?: string
): void => {
  const trigKey = triggerKey != null ? triggerKey : 'Enter';
  if (canSubmit && currentKey === trigKey) {
    return func();
  }
};
