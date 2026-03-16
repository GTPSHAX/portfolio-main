
declare module '*.svg' {
  import type {ComponentType, SVGProps} from 'react';

  const ReactComponent: ComponentType<
    SVGProps<SVGSVGElement> & {title?: string}
  >;

  export default ReactComponent;
}

declare module '*.module.css' {
  const classes: {readonly [key: string]: string};
  export default classes;
}

declare module '*.css' {
  const src: string;
  export default src;
}

declare module "*.mdx" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export type Frontmatter = Record<string, any>

  import { MDXProps } from 'mdx/types'
  export default function MDXContent(props: MDXProps): JSX.Element

  export const frontmatter: Frontmatter
}