
/**
 * 
 * @param min 
 * @param max 
 * @param luck 
 * @param luckApplyChance - 0.0-1.0, % chance to apply luck
 */
export function randomInRange(min: number, max: number, luck: number, luckApplyChance: number){
  if(Math.random() < 1-luckApplyChance){
    if(luck > 0) {
      return lowestOf((-1 * luck) + 1, max - min) + min;
    } else {
      return highestOf(luck+1, max - min) + min;
    }
  } else {
    return Math.ceil((Math.random() * (max - (min - 1))) + (min - 1));
  }
}

function lowestOf(amt: number, dieSize: number){
  let nums = [];
  for(let i = 0; i < amt; i++){
    nums.push(Math.ceil(Math.random()*dieSize));
  }
  return Math.min(...nums)
}

function highestOf(amt: number, dieSize: number){
  let nums = [];
  for(let i = 0; i < amt; i++){
    nums.push(Math.ceil(Math.random()*dieSize));
  }
  return Math.max(...nums)
}


