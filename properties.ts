const FullKeys = {
  display: 'display',
}

const KeyShortcuts = {
  d: FullKeys.display,
}

const Keys = Object.assign(FullKeys, KeyShortcuts)

const FullValues = {
  flex: 'flex',
}

const ValueShortcuts = {
  f: FullValues.flex,
}

const Values = Object.assign(FullValues, ValueShortcuts)

const Properties = {
  flex: [Keys.display, Values.flex],
  f: [Keys.display, Values.flex],
}

const Shortcuts = {
  link: 'link',
  button: 'button',
  input: 'input',
}

export const t = Properties
export const s = Shortcuts

// TODO group hover, when group hover registered, check if any parents match the group and assign a listener to the hover.
// TODO epic-jsx, walk parent method on component. Requires ability to add properties to the fiber node.
