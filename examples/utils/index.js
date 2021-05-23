export function createDocPropItem(
  prop,
  explain,
  type,
  defaultValue = "—",
  optionalValue = "—"
) {
  return {
    prop,
    explain,
    type,
    defaultValue,
    optionalValue
  };
}

export function createDocSlotItem(name, explain) {
  return {
    name,
    explain
  };
}

export function createDocEventItem(name, explain, callbackArgs) {
  return {
    name,
    explain,
    callbackArgs
  };
}