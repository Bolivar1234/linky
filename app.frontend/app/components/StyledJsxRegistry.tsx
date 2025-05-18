'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import * as styledJsx from 'styled-jsx/style';

export default function StyledJsxRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [jsxStyleRegistry] = useState(() => new (styledJsx as any).StyleRegistry().create());

  useServerInsertedHTML(() => {
    const styles = jsxStyleRegistry.styles();
    jsxStyleRegistry.flush();
    return <>{styles}</>;
  });

  // The `StyleRegistry` component might be the default export or a named export
  // depending on the styled-jsx version and its typings.
  // We'll try to access it from the namespace, casting to `any` to bypass
  // potential incorrect type definitions.
  const StyleRegistryComponent = (styledJsx as any).StyleRegistry || styledJsx.default;

  if (!StyleRegistryComponent) {
    // Fallback or error handling if StyleRegistryComponent is still not found
    console.error("styled-jsx StyleRegistry component not found.");
    return <>{children}</>;
  }

  return (
    <StyleRegistryComponent registry={jsxStyleRegistry}>
      {children}
    </StyleRegistryComponent>
  );
}