import React, { useEffect, useRef } from "react";
import { Counter } from "svelte-counter/dist/index.js";

function SvelteCounterComponent(props) {
  let component = useRef(null);
  let countHandler = useRef(null);

  const onRef = (ref) => {
    if (ref && !component.current) {
      component.current = new Counter({
        target: ref,
        props,
      });
      countHandler.current = component.current.$on("onChangeCount", (event) => {
        console.log("count changed from within svelte", event.detail);
        props.onChangeCount(event.detail);
      });
    }
  };

  useEffect(() => {
    return () => {
      if (component.current) {
        component.current.$destroy();
        component.current = null;
        countHandler.current?.();
      }
    };
  }, []);

  component.current?.$set(props);

  return <div ref={onRef}>useSvelte()</div>;
}

export default SvelteCounterComponent;
