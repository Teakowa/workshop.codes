import { currentItem, items } from "../stores/editor"
import { get } from "svelte/store"

export function createNewItem(name, content, position = 9999, type = "item") {
  const item = {
    name: name,
    id: Math.random().toString(16).substring(2, 8),
    type: type,
    position,
    content: content
  }

  return item
}

export function destroyItem(id) {
  if (get(currentItem).id == id || get(currentItem).parent == id) currentItem.set({})
  items.set(get(items).filter(i => i.id != id && i.parent != id))
}

export function updateItemName(id, name) {
  get(items).filter(i => i.id == id)[0].name = name
}

export function getClosingBracket(content) {
  let closePos = 0
  let counter = 1
  let initial = true

  while (counter > 1 || initial) {
    const c = content[++closePos]

    if (c == "{") {
      counter++
      initial = false
    }
    else if (c == "}") counter--
    if (counter > 5 || closePos > 10000) counter = 0
  }

  return closePos
}

export function getSettings(value) {
  const regex = new RegExp(/settings/)
  const match = regex.exec(value)
  if (!match) return []

  const untilIndex = match.index + getClosingBracket(value.slice(match.index, value.length))
  if (!untilIndex) return []

  return [match.index, untilIndex + 1]
}