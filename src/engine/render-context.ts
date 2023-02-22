import { FC } from "./contracts";

export class RenderContext {
  private contextMap = new Map();
  private renderContext?: { [key: string]: any };
  private componentContext?: { [key: string]: any };

  getCurrentContext() {
    return this.componentContext;
  }

  getContext<T>(component: FC<T>) {
    const componentKey = `${component.name}`;
    if (!this.contextMap.has(componentKey)) {
      this.contextMap.set(componentKey, {});
    }
    return this.contextMap.get(componentKey);
  };

  render<T>(container: Element, component: FC<T>, props: T | null = null) {
    this.withRenderContext(() => {
      const context = this.getContext(component);

      this.componentContext = context;
  
      const node = component(props);
  
      context.component = component;
      context.element = node;
  
      container.appendChild(node);
    });
  }

  rerender(context: any) {
    this.withRenderContext(() => {
      this.componentContext = context;
  
      const node = context.component();
      context.element.replaceWith(node);
      context.element = node;
    });
  }

  hookId(hook: string) {
    const rdc = this.renderContext;

    if (!rdc) {
      throw new Error(
        'hookId method should always be called from render cycle'
      );
    }

    if (typeof rdc[hook] === 'undefined') {
      rdc[hook] = 0;
    } else {
      rdc[hook]++;
    }

    return `${hook}-${rdc[hook]}`;
  }

  private withRenderContext(action: () => void) {
    this.renderContext = {};
    action.call(this);
    this.renderContext = undefined;
  }
}
