import { RenderContext } from "../render-context";

export const extendWithUseStateHook = (context: RenderContext) => {
  const name = 'useState';

  const useState = <T>(rc: RenderContext, hook: string, initial: T) => {
    const id = rc.hookId(hook);
    const componentContext = rc.getCurrentContext();

    if (!componentContext) {
      throw new Error(
        'hook should always be used from the render cycle'
      );
    }

    if (componentContext[id]) {
      return componentContext[id];
    }

    const newContext = [];

    const setValue = (v: T) => {
      newContext[0] = v;
      rc.rerender(componentContext);
    };

    newContext[0] = initial;
    newContext[1] = setValue;

    return (componentContext[id] = newContext);
  };

  return useState.bind({}, context, name);
};