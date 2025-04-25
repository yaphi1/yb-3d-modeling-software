# TODO

- move shape
- create/delete shapes
- scale shape
- undo/redo
- prevent camera pan from deselecting
- view modes (wireframe, solid, textures)


move shape
  - create keyboard listeners
  - create state for editingMode
  - on "m" key:
    - set editingMode to "move"
    - store original position of active object
    - store original mouse position
    - on mouse move:
      - calculate how far the mouse is from its starting point
      - change the position of the active object proportionally to how far the mouse is from the starting point
    - on click or enter, save new position
    - on esc, revert to original position
