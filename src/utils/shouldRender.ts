/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ShouldRender(props: any) {
  return props.if ? props.children : null;
}
