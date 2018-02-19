## SF Muni React D3 Map

This is a basic map of San Francisco's Muni public transit system. The data comes from the NextBus public API and is rendered using React and D3. 

### Current Features:

* Rendering of the San Francisco street grid.
* Rendering of individual Muni routes, including route path and bus stops.
* Rending of active buses for selected routes.
* Bus location updated every 15 second.

### Rendering Methods

It is commonly considered best practice to use D3 for the calculations of where things should be rendered, and then creating and maintaining the SVG objects using React. This is due to React being more efficient at DOM updates. By allowing React to do the actual rendering, we take advantage of its virtual DOM.

### Short Comings And Todos

The current map lacks animations.

One disadvantage of using React for the rendering is that animations and transitions which D3 is so good at are no longer as easy to perform. There are three main ways to perform transitions when using our method of rendering:

1) Change control of the DOM from React to D3 during the transition and then return the control of the DOM to React once the transition animation is complete.

2) Use a faux dom such as [react-faux-dom](https://github.com/Olical/react-faux-dom).

3) Use a React animation library such as [react-move](https://github.com/react-tools/react-move).

The third option seems to make the most sense as it is in line with how the rendering currently takes place. We can again use D3 for the transition calculations and then use a React library for the actual altering of the DOM.

A few other Todos include:

* Improve bus icons from a simple rectangle to something showing which direction the bus is moving.
* Remove buses which are not in service, or show which buses have not changed their location in a long time.
* Add tool tips or a data field for hovering and clicking over buses/bus routes.
* Improve overall style by adding more CSS
* Add loading status
* Zoom in on selected routes
* Add legend
