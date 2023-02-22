
type EventHandler = () => void;
type EventsDefinition = {
  [key: string]: EventHandler;
};
type RenderOptions = {
  attributes?: Partial<HTMLElement>,
  events?: EventsDefinition,
  children?: HTMLElement[]
};

const setAttributes = (element: any, attributes?: any) => {
  if (!attributes) return;

  const keys = Object.keys(attributes);
  keys.forEach((k) => {
    element[k] = attributes[k]
  })
}

const subscribeToDefinedEvents = (element: HTMLElement, events?: EventsDefinition) => {
  if (!events) return;

  const keys = Object.keys(events);

  keys.forEach((k) => {
    element.addEventListener(k, events[k]);
  })
}

const appendChildren = (element: HTMLElement, children?: HTMLElement[]) => {
  if (!children) return;

  children.forEach(c => element.append(c));
}

export const $element = (element: string, options: RenderOptions): HTMLElement => {
  const e = document.createElement(element);

  setAttributes(e, options?.attributes);
  subscribeToDefinedEvents(e, options?.events);
  appendChildren(e, options?.children);

  return e;
}