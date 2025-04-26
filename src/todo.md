# TODO

- move shape
  - add movement cursor
  - add axes
- create/delete shapes
- scale shape
- undo/redo
- prevent camera pan from deselecting object
- view modes (wireframe, solid, textures)
- refine movement to work with camera angles
  - (e.g. if you're looking at it from the other side, movement should be reversed)


move shape
  - ✅ create keyboard listeners
  - ✅ create state for editingMode
  - ✅ on "g" key:
    - ✅ set editingMode to "move"
    - ✅ store original position of active object
    - ✅ store original mouse position
    - ✅ on mouse move:
      - ✅ calculate how far the mouse is from its starting point
      - ✅ change the position of the active object proportionally to how far the mouse is from the starting point
    - ✅ on click or enter, save new position (regardless of where click happens)
    - ✅ on esc, revert to original position
