

let textEvent = {
  id: 'sand-wurm',
  story: [
    { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { text: 'Reprehenderit in voluptate velit esse cillum.' },
    { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. You lose 4 {health} and -10 {coins}!!' },
  ],
  options: [
    {
      text: 'Jump on Back on top of it, like really cool this time',
      gotoEventID: 'sand-wurm: jump-on-back',
    },
    {
      text: '__Flee__ \n -2 {health}.',
      gotoEventID: 'sand-wurm: flee',
    }
  ],

}

export {
  textEvent,
}

