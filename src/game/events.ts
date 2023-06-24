import { directionToStr, getLocation } from "./location-manager";
import FlatQueue from 'flatqueue';

export type Event = {
  id: string,
  story: { text: string }[],
  options: EventOption[],
}

type EventOption = {
  text: string,
  gotoEventID: string,
  moveLocation?: number
}

export function getEvent(eventID: string, location: {current: number, prev: number}) {
  if (eventID && eventID !== '' && !eventID.startsWith('location-')) {
    let event = events.get(eventID);
    if(event) {
      return event;
    } else {
      console.warn(`Event "${eventID}" is missing!`);
      return events.get('missing-event') as Event;
    }
  } else {
    return getEventFromLocation(location);
  }
}

const events: Map<string, Event> = new Map()
  .set('missing-event', {
    id: 'missing-event',
    story: [
      { text: '404 - This event is missing, sorry :/' },
    ],
    options: [],
  })
  .set('sand-wurm', {
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
  })
  .set('sand-wurm: jump-on-back', {
    id: 'sand-wurm: jump-on-back',
    story: [
      { text: 'You jump back from the sand wurm and fall onto the ground.' },
    ],
    options: [
      {
        text: 'Stand back up.',
        gotoEventID: 'sand-wurm',
      },
      {
        text: '__Flee__ \n -2 {health}.',
        gotoEventID: 'sand-wurm: flee',
      }
    ],
  })
  .set('sand-wurm: flee', {
    id: 'sand-wurm: flee',
    story: [
      { text: 'You flee but get stabbed while running away!' },
    ],
    options: [
      {
        text: 'Continue.',
        gotoEventID: 'continue',
      },
    ],
  });

function convertLocationIDToEventID(locationID: number) {
  return `location-${locationID}`;
}

function getEventFromLocation(location: {current: number, prev: number}): Event {

  let locationData = getLocation(location.current);

  let queue = new FlatQueue<EventOption>();
  for (let path of locationData.paths) {

    let order = 0;
    let text = ``;

    if(path.nt_i === location.prev && locationData.location.type === 'Road'){
      text = `Turn around`;
      order += -100;
    } else {
      text = `Head ${directionToStr(path.direction)}`;
    }

    if(path.best_attraction){

      // Use direction to city (not next path) to make direction more consistent
      if(text.startsWith(`Head `)){
        text = `Head ${directionToStr(path.best_attraction.direction)}`;
      }

      text += ` towards ${path.best_attraction.name}`;

    }

    // TODO - into the Unknown.
    // Discover towns.

    queue.push({
      text: text,
      gotoEventID: convertLocationIDToEventID(path.nt_i),
      moveLocation: path.nt_i,
    }, -1*order);
  }

  let options = [];
  while(queue.peek()){
    options.push(queue.pop());
  }

  return {
    id: convertLocationIDToEventID(locationData.location.t_i),
    story: [{ text: `You find yourself on the road, where are you headed?` }],
    options: options as EventOption[],
  }

}

