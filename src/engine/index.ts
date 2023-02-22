import { extendWithHooks } from "./hooks";
import { RenderContext } from "./render-context";

const context = new RenderContext();

const render = context.render.bind(context);

export const Renderize = {
  render: render
};

export const { useState, useSyncExternalStore } = extendWithHooks(context);