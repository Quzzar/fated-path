
let canvasMain: HTMLCanvasElement | null = null;
let canvasRiver: HTMLCanvasElement | null = null;
let canvasScreenshot: HTMLCanvasElement | null = null;

export function setCanvasMain(canvas: HTMLCanvasElement) {
  if(canvas == null) { return; }
  canvasMain = canvas;
  run();
}
export function getCanvasMain(){
  return canvasMain;
}

export function setCanvasRiver(canvas: HTMLCanvasElement) {
  if(canvas == null) { return; }
  canvasRiver = canvas;
  run();
}
export function getCanvasRiver(){
  return canvasRiver;
}

export function setCanvasScreenshot(canvas: HTMLCanvasElement) {
  if(canvas == null) { return; }
  canvasScreenshot = canvas;
  run();
}
export function getCanvasScreenshot(){
  return canvasScreenshot;
}


function run() {
  if(canvasMain == null || canvasRiver == null || canvasScreenshot == null){
    return;
  }

  console.log('going here');

}