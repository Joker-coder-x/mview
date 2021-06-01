/**
 * The behavior that Selection.addRange() merges existing Range and the specified Range was removed.
 * See https://www.chromestatus.com/features/6680566019653632 for more details.
 * @param {Element} el
 */
export function selectNodeContents(el) {
  if (el instanceof HTMLInputElement) {
    el.select();
  } else {
    const selection = window.getSelection();
    const range = document.createRange();

    //移除所有选区
    selection.removeAllRanges();

    range.selectNodeContents(el);
    selection.addRange(range);
  }
}

export function getTreeChildNodeCount(node, count = 0) {
  const children = node.children || [];

  children.forEach(c => {
    ++count;
    count += getTreeChildNodeCount(c);
  });

  return count;
}