import { RenderContext } from "../render-context";

export const extendWithUseSyncExternalStore = (context: RenderContext) => {
  const name = 'useSyncExternalStore';

  const hook = <T>(rc: RenderContext, hook: string, subscribe: (callback: () => void) => () => void, getSnapshot: () => T): T => {
    const id = rc.hookId(hook);
    const componentContext = rc.getCurrentContext();

    if (!componentContext) {
      throw new Error(
        'hook should always be used from the render cycle'
      );
    }
    
    if (componentContext[id]) {
      return componentContext[id].current as T;
    }

    if (!componentContext[id]) {
      componentContext[id] = { current: getSnapshot() };
    }

    const callback = () => {
      const snapshot = getSnapshot();
      if (snapshot === componentContext[id].current) return;
      componentContext[id].current = snapshot;
      rc.rerender(componentContext);
    };

    subscribe(callback);

    return componentContext[id].current as T;
  };

  return hook.bind({}, context, name);
};