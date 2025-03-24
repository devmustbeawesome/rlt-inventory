/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DirectiveBinding } from 'vue'
type DragBind = {
  onDrop: (dragableElement: HTMLElement, dropableElement: HTMLElement) => void
  dropable: string
  dropableActiveClass: string
  dragableActiveClass: string
}

type HTMLElementModifiered = HTMLElement & { __onMouseDownHandler__: (event: MouseEvent) => void }

const name = 'drag-n-drop'

let currentDroppable: HTMLElement | null = null

const mounted = (el: HTMLElementModifiered, binding: DirectiveBinding<DragBind>) => {
  el.__onMouseDownHandler__ = (event) => {
    const BoundingClientRect = el.getBoundingClientRect()
    const shiftX = event.clientX - BoundingClientRect.left
    const shiftY = event.clientY - BoundingClientRect.top

    const elСopied = el.cloneNode(true) as HTMLElement
    //fixing the size
    elСopied.style.width = el.clientWidth + 'px'
    elСopied.style.height = el.clientHeight + 'px'
    elСopied.style.position = 'absolute'
    elСopied.style.zIndex = '1000'
    document.body.append(elСopied)
    elСopied.hidden = true
    elСopied.classList.add(binding.value.dragableActiveClass)
    moveAt(event.pageX, event.pageY)

    function moveAt(pageX: number, pageY: number) {
      elСopied.style.left = pageX - shiftX + 'px'
      elСopied.style.top = pageY - shiftY + 'px'
    }
    function onMouseMove(event: MouseEvent) {
      moveAt(event.pageX, event.pageY)

      elСopied.hidden = true
      const elemBelow = document.elementFromPoint(event.clientX, event.clientY)
      elСopied.hidden = false

      if (!elemBelow) return

      const droppableBelow = elemBelow.closest(binding.value.dropable) as HTMLElement
      if (currentDroppable != droppableBelow) {
        if (currentDroppable) {
          // null если мы были не над droppable до этого события
          // (например, над пустым пространством)
          leaveDroppable(currentDroppable)
        }
        currentDroppable = droppableBelow
        if (currentDroppable) {
          // null если мы не над droppable сейчас, во время этого события
          // (например, только что покинули droppable)
          enterDroppable(currentDroppable)
        }
      }
    }
    document.addEventListener('mousemove', onMouseMove)

    el.onmouseup = elСopied.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove)
      el.onmouseup = elСopied.onmouseup = null
      elСopied.remove()
      if (currentDroppable) {
        binding.value.onDrop(el, currentDroppable)
        leaveDroppable(currentDroppable)
        currentDroppable = null
      }
    }
  }

  function enterDroppable(elem: HTMLElement) {
    elem.classList.add(binding.value.dropableActiveClass)
  }

  function leaveDroppable(elem: HTMLElement) {
    elem.classList.remove(binding.value.dropableActiveClass)
  }

  el.ondragstart = function () {
    return false
  }
  el.addEventListener('mousedown', el.__onMouseDownHandler__)
}

const unmounted = (el: HTMLElementModifiered, binding: DirectiveBinding<DragBind>) => {
  document.body.removeEventListener('mousedown', el.__onMouseDownHandler__)
}
const directive = {
  name,
  mounted,
  unmounted,
}

export default directive
