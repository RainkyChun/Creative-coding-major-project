/* Based on the Structure of Sample Code 1 from Week 7 “Color Block Redrawing (Center Pixel Sampling)” Version
 Render the image as a 64-grid color block mosaic (without outlines to avoid gaps)
 Boundaries are accumulated using rounding, while center pixels are sampled.
 */

//Need a variable to hold our image
let img;

//Divide the image into segments, this is the number of segments in each dimension
//The total number of segments will be 4096 (64 * 64)
let numSegments = 64;

//Store the segments in an array
let segments = [];

//Load the image from disk
function preload() {
  img = loadImage('Piet_Mondrian Broadway_Boogie_Woogie.jpeg');
}

function setup() {
  //Make the canvas the same size as the image using its properties
  createCanvas(img.width, img.height);

  //Use the width and height of the image to calculate the size of each segment
  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;

  /*
  Divide the original image into segments, we are going to use nested loops
  first we use a loop to move down the image, 
  we will use the height of the image as the limit of the loop
  then we use a loop to move across the image, 
  we will use the width of the image as the limit of the loop
  Let's look carefully at what happens, the outer loop runs once, so we start at the top of the image
  Then the inner loop runs to completion, moving from left to right across the image
  Then the outer loop runs again, moving down 1 row image, and the inner loop runs again,
  moving all the way from left to right
  */

  //this is looping over the height
  for (let segYPos=0; segYPos<img.height; segYPos+=segmentHeight) {

    //this loops over width
    for (let segXPos=0; segXPos<img.width; segXPos+=segmentWidth) {
      
      //This will create a segment for each x and y position

      // Using the “current floating boundary + rounding” method yields integer pixel boundaries,
      // ensuring the reproduced image remains complete and seamless without gaps
      const segXPos0 = Math.round(segXPos);
      const segYPos0 = Math.round(segYPos);
      const segXPos1 = Math.round(segXPos + segmentWidth);
      const segYPos1 = Math.round(segYPos + segmentHeight);

      //Actual integer size of this block
      const segWidth  = segXPos1 - segXPos0;
      const segHeight  = segYPos1 - segYPos0;

      //If rounding results in width or height being <= 0, skip it
      if (segWidth <= 0 || segHeight <= 0) continue;

      // Find the center pixel of this block
      //Constrain the results within the image boundaries.
      const colorX = Math.min(segXPos0 + Math.floor(segWidth / 2), img.width  - 1);
      const colorY = Math.min(segYPos0 + Math.floor(segHeight / 2), img.height - 1);
      
      //Sample the color at that center pixel. Returns [r, g, b, a].
      const sampledColor  = img.get(colorX, colorY);

      //Create and store a segment
      let segment = new ImageSegment(segXPos0, segYPos0, segWidth, segHeight, sampledColor);
      segments.push(segment);
    }
  }
}

/*
Personal Section
   1 Using the mouse to scale the distance between color blocks (by using the distance calculation taught in the tutorial and using constrain to limit the scaling range).
   2 Pressing the “2” key makes all color blocks slightly change their color at once (±10).
   3 Pressing the “1” key toggles the background between white and dark gray (using keyPressed as taught in the tutorial).
   4 Clicking the mouse changes the selected color block to the background color.
 */
let darkMode = true;//Control the background color and enable dark mode.
function draw() {
  if (darkMode) {
  background(80); // Dark gray background
} else {
  background(255); // White background
}

   for (const segment of segments) {

    // Using the in-class dist() function to calculate the distance between the mouse and the top-left corner of the color block.
    const d = dist(
      segment.srcImgSegXPos,
      segment.srcImgSegYPos,
      mouseX,
      mouseY
    )/100;

    // Use the distance to calculate the scaling ratio.
    //Use constrain to limit the intensity, preventing it from becoming too large or too small.
    segment.scale = constrain(d, 0.6, 1.8);
    //Draw the color blocks
    segment.draw();
  }
}

// Pressing the “2” key: all color blocks will slightly and randomly change their color (±10). A value of 10 is enough to make the color shift visible—if it’s too large, the image becomes hard to recognize; if it’s too small, the change is barely noticeable.
function keyPressed() {
  if (key === "2") {
    for (const segment of segments) {
      let r = red(segment.fillColor);
      let g = green(segment.fillColor);
      let b = blue(segment.fillColor);
      let a = alpha(segment.fillColor);

      //The random variation stays within ±10, and the values are constrained within the 0–255 range.
      r = constrain(r + random(-10, 10), 0, 255);
      g = constrain(g + random(-10, 10), 0, 255);
      b = constrain(b + random(-10, 10), 0, 255);

      segment.fillColor = color(r, g, b, a);
    }
  }
  
  //Pressing the “1” key toggles the background color.
  if (key === "1") {
  darkMode = !darkMode; // Boolean negation
  }
}

//Mosaic color block class
class ImageSegment {
  constructor(srcImgSegXPosInPrm,srcImgSegYPosInPrm,srcImgSegWidthInPrm,srcImgSegHeightInPrm, fillColorInPrm) {

    //Position and size
    this.srcImgSegXPos = srcImgSegXPosInPrm;  
    this.srcImgSegYPos = srcImgSegYPosInPrm;
    this.srcImgSegWidth = srcImgSegWidthInPrm;
    this.srcImgSegHeight = srcImgSegHeightInPrm;

    //Convert the array
   this.fillColor = fillColorInPrm;
    
   // The initial scaling ratio is 1.
    this.scale = 1;
  }

  //Draw the color blocks
  draw() {
   
    //No stroke to avoid gaps.
    noStroke();

    //Use color fill
    fill(this.fillColor);

    // Draw according to the scaling ratio
    rect(
      this.srcImgSegXPos,
      this.srcImgSegYPos,
      this.srcImgSegWidth * this.scale,
      this.srcImgSegHeight * this.scale
    );
  }
}

//Clicking the mouse changes the currently resized color block to the background color (the gaps created after shrinking the block are not affected).
function mousePressed() {
  for (const s of segments) {
    
    //Check whether the mouse position is within the rectangle’s X-range.
    if (mouseX > s.srcImgSegXPos) {
      if (mouseX < s.srcImgSegXPos + s.srcImgSegWidth * s.scale) {
       
        //Check whether the mouse position is within the rectangle’s Y-range.
        if (mouseY > s.srcImgSegYPos) {
          if (mouseY < s.srcImgSegYPos + s.srcImgSegHeight * s.scale) {
           
            //If the current background color is dark gray, the clicked color block will be filled with dark gray.
            if (darkMode) {
              s.fillColor = color(80);   // Dark gray background
            } else {
              
              //If the current background color is white, the clicked color block will be filled with white.
              s.fillColor = color(255);  // White background
            }
          }
        }
      }
    }
  }
}