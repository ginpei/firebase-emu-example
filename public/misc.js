/**
 * Short hand of `querySelector()`.
 * @param {string} selector
 * @param {Element | Document | DocumentFragment} start
 * @returns {HTMLElement}
 */
export function $(selector, start = document) {
  const el = start.querySelector(selector);
  if (!el) {
    throw new Error(`Element "${selector}" not found`);
  }

  if (!(el instanceof HTMLElement)) {
    // sorry svg!
    throw new Error(`Element "${selector}" must be an HTMLElement`);
  }

  return el;
}
