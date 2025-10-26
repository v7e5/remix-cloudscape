# AWS Cloudscape UI Components for Remix (React Router v7)
 
A customization of [AWS Cloudscape Design System React
Components](https://cloudscape.design) adapted for Remix. This repository is a
Remix app containing the component library (in `src/components`) and demo pages
for each component.

<video autoplay muted controls loop
  style='max-width: 100%; object-fit: contain;'
  src='https://github.com/user-attachments/assets/a1d20377-cc06-4bba-9e17-a578fc88c2f0'>
</video>

## Usage
```shell
cd remix-cloudscape
pnpm/npm install
pnpm/npm run dev #listening on localhost:8000
```

## Background
Integrating the [@cloudscape-design/components npm
package](https://www.npmjs.com/package/@cloudscape-design/components) with
Remix is challenging and error prone, with many integration issues such as
broken SSR from useLayoutEffect, component name collisions (e.g. Link, Form),
and other elusive edge cases. What started as a few quick bandaid fixes grew
into a complex mod toolkit ([cloudscape
modtools](https://github.com/v7e5/cloudscape-modtools)) that sources the
[Cloudscape components repo](https://github.com/cloudscape-design/components)
and converts them into simple JSX components usable with Remix.
Some of the changes include:
- Rewriting components to fix SSR breakage (for e.g replacing useLayoutEffect).
- Memoizing all the components.
- Removing telemetry, tracking and metrics code intended for internal AWS use.
- Updated components from being purely controlled to controllable mode. 
- Remove Event object overrides and revert back to using SyntheticBaseEvent.

There are many more modifications, scripts and intermediate steps involved in
this process, check out my [cloudscape modtools
repo](https://github.com/v7e5/cloudscape-modtools) to learn more, especially if
you're interested in automated bulk code transformation using
[ast-grep](https://ast-grep.github.io/) and shell/node based scripts. At any
rate, the end result is a set of JSX components and a single global css file.

## Notes
- Components are located in `src/components` directory of this project, css and
fonts are in `src/css`.

- Unlike the original controlled Cloudscape components, the components here are
controllable, i.e. they don't need explicit state management, and their state
management logic is hidden behind internal abstractions. In practice, this
means that most components can be used without wiring in state for simple use
cases.

  - Example of Input component used in uncontrolled mode (uses defaultValue
internally).
    ```jsx
    import Input from '~/components/input'
    ...
    // behaves like uncontrolled (or controllable) <input/>
      <Input name='text' type='text'/>

    ```

   - Example usage of Tiles component, with state handling managed internally.
    ```jsx
    import Tiles from '~/components/tiles'
    ...
    // works like a regular controllable/uncontrolled radio-button for the end user
    // state logic is handled intenally
      <Tiles
        name='radio_tiles'
        items={[
          {label: 'ON',  value: 'on'},
          {label: 'OFF', value: 'off'}
        ]}
      />
    ```

  The original event handlers will still work as documented.

- The components here are pinned to [commit a4448f5 of
cloudscape-design/components](https://github.com/cloudscape-design/components/tree/a4448f5cc2b25fdaee4e9d2d3c4d5bee40767345),
dated: Jun 5, 2024. Also, not all the components have been carried over, stuff
like Board and Chart components are among the ones missing for now.

- There is no documentation at the moment, however I have included the original
api spec `interface.ts` files from the pinned commit tree. These can be found
in `/doc` as `[component].ts` files.
