import { RenderContext } from "../render-context";
import { extendWithUseStateHook } from "./useState";
import { extendWithUseSyncExternalStore } from "./useSyncExternalStore";

export const extendWithHooks = (context: RenderContext) => {
  const useState = extendWithUseStateHook(context);
  const useSyncExternalStore = extendWithUseSyncExternalStore(context);

  return {
    useState,
    useSyncExternalStore
  };
}