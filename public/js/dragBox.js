const position = { x: 0, y: 0 }

interact('.drag')
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 200, height: 100 }
      })
    ]
    })
    .draggable({
        onmove: window.dragMoveListener,
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
              restriction: 'parent',
              endOnly: true
            })
          ]
    })
    .on('resizemove', function (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)
    
        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'
    
        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top
    
        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)'
    
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
      })
      .on('tap', function (event) {
        modal.style.display = "block"
        event.preventDefault()
      })
      

function dragMoveListener (event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

window.dragMoveListener = dragMoveListener

let modal = document.querySelector(".modal")
let closeBtn = document.querySelector(".close-btn")

closeBtn.onclick = function(){
  modal.style.display = "none"
}
window.onclick = function(e){
  if(e.target == modal){
    modal.style.display = "none"
  }
}