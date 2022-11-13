
import { doMap, defaultParams } from './terrain.js';

import { data_exports as d3 } from './dependencies/d3.v4.js';

function init() {

  var finalDiv = d3.select("div#final");
  var finalSVG = finalDiv.insert("svg", ":first-child")
    .attr("id", "finalSVG")
    .attr("height", 500)
    .attr("width", 500)
    .attr("viewBox", "0 0 500 500");

  doMap(finalSVG, defaultParams);
}


console.log('got here');

init();