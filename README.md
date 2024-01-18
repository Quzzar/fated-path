# Faded Path: A Roguelike Text-Based RPG App

## Overview
Faded Path is an immersive text-based RPG that combines the thrill of roguelike elements with an expansive open world. Set in a dynamically generated realm, this game invites players to explore an ever-changing landscape filled with hidden treasures, formidable monsters, and mysterious dungeons.

## Key Features

- **Dynamic World:** Every journey in Faded Path offers a unique experience, thanks to a procedurally generated world map and storyline. Your path is never the same twice!

- **Epic Quests and Storyline:** Follow intriguing storylines and undertake epic quests. Your choices shape the narrative and your journey in this unpredictable world.

- **Diverse Item Collection:** Discover a wide array of items, from common tools to rare and powerful artifacts. Use them to enhance your abilities and aid in your survival.

- **Character Progression:** Strengthen your character through finding rare items and unlocking the hidden secrets of magic. Choose your path to power, be it through might, magic, or cunning.

- **Challenging Combat:** Engage in strategic combat against a variety of monsters and bosses. Test your skills in different environments, from dark dungeons to haunted forests.

- **The Quest for the Rare Relic:** Work-in-progress: At the heart of your journey is the search for a rare and ancient relic. Its discovery promises immense power, but also attracts dangerous foes.

## Map Generation
The map lives in a separate repo ([Fated Path - Map Gen](https://github.com/Quzzar/fated-path-map)). The reason for this is because, since the game is actually being built as a challenge in React Native, it runs into a significant problem when dealing with map generation - JavaScript is only single threaded and multithreading options in React Native aren't up to date/realistically viable at the time of writing. My solution to this is to put the map generation and display as a separate website that's injected into the React Native app and displayed as a website in the app's internal browser. That way the phone's multithreading capabilities can allow running the React Native under one thread and the website (in-game map) as a separate thread!

This allows the game to generate a map and do a ton of heavy lifting without freezing up the app and causing it to crash.

## Development Status
Faded Path is currently a work in progress. It's a long term project that I continue to come back to in my free time :)

## Images

![Zoomed Out Map](https://i.imgur.com/5wfB2O4.png "Zoomed Out Map")
![Zoomed In Map](https://i.imgur.com/wsrdZAm.png "Zoomed In Map")
![Story](https://i.imgur.com/CiaWZwT.png "Story")
