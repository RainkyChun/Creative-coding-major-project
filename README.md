# Creative-coding-major-project
Student: Yuqian Chun

1.  How to Interact with the Work

This artwork supports mouse movement, mouse click, and keyboard input.

 Mouse Interaction

Move the mouse across the canvas
→ Mosaic blocks scale based on their distance from the cursor.

Click a mosaic block
→ The clicked block becomes the current background colour (white or dark grey).

 Keyboard Interaction
Key	Effect
1	Toggle background colour (white ↔ dark grey)
2	Apply light colour jitter ±10

All interactions happen instantly with no loading required.

2.  My Individual Approach to Animating the Group Code

For my individual extension, I chose User Interaction (mouse + keyboard) as my animation method.

My approach focuses on letting users directly control how the mosaic reacts.

My interactive features include:

Mouse distance scaling

Keyboard-triggered colour jitter (±10)

Background colour toggle

Mouse click recolouring

All techniques are strictly based on course content (e.g., dist(), constrain(), keyPressed(), mousePressed()).

3.  Animation Driver: Why I Chose Interaction

The assignment allows choosing one animation driver:

Audio

Time-Based

Perlin Noise + Randomness

User Input (my choice)

 I chose: Interaction

Reasons:

It makes the viewer an active participant

All changes are triggered intentionally by the user

Immediate feedback and clear control

Distinct visual style compared to automatic animations

4.  Animated Properties & Difference from Group Members
 My animated properties:

Block size — scales based on mouse distance

Block colour — small random jitter on key 2

Block fill — clicked block becomes background colour

Background colour — toggle with key 1

 Team Members' Animation Choices

To ensure distinct outputs, each group member used a different technique:

Me — Interaction

Mouse → scaling

Mouse click → recolour to background

Key 1 → toggle background

Key 2 → colour jitter

 Highly interactive; every change is user-driven.

Yuanlong Sun — Perlin Noise + Randomness

Used Perlin noise and seeded random values

Creates smooth continuous automated animation

Xin Liu — Time-Based Animation

Used timers / time events

Animation changes over time without user input

5.  Inspiration & Visual References

My inspiration comes from interactive digital artworks where the viewer’s motion reshapes the visuals.

Examples include:

Cursor-effect interactive graphics

Motion-reactive mosaic artworks

Interactive pixel distortion effects

These inspired my decisions for mouse-driven scaling and click-to-recolour mechanics.

6.  Technical Explanation

My animation uses only p5.js functions taught in class.

 Mouse-based Scaling

dist() → measure distance to mouse

divide by 100 → convert distance to scalable range

constrain() → limit scale safely

 Keyboard Colour Jitter

keyPressed() → detect key

random(-10,10) → apply small jitter

constrain() → avoid RGB overflow

 Background Toggle

key 1

darkMode = !darkMode;

 Mouse Click Recolouring

mousePressed()

check if mouse is inside a scaled rectangle

set fillColor to background colour

 Class Extensions

I  added:

this.scale = 1;


No structural changes were made.

All techniques are 100% course content—no external libraries or tools.

7.  Changes I Made to the Group Code
 Group code remains unchanged:

Image segmentation

Center pixel sampling

Segment storage

Class structure

 My additions:

Mouse scaling logic in draw()

Keyboard interaction logic

Mouse click recolouring

Added this.scale to the class

All changes are additions only, preserving the original structure and logic of the group code.