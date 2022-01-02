export const callFuncOnKeyPress = <T>(
  func: () => T,
  canSubmit: boolean,
  currentKey: string,
  triggerKey?: string
): T | void => {
  const trigKey = triggerKey != null ? triggerKey : 'Enter';
  if (canSubmit && currentKey === trigKey) {
    return func();
  }
};
