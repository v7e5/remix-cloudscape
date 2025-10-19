import '~/css/aws.css'
import '~/css/custom.css'
import {memo, useCallback, useMemo} from 'react'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  useLocation,
  useMatches,
  useRouteError
} from 'react-router'
import AppLayout from '~/components/app-layout'
import BreadcrumbGroup from '~/components/breadcrumb-group'
import {currentMode} from '~/components/internal/toolkit/internal/visual-mode'
import SideNavigation from '~/components/side-navigation'

import Flash from '~/shell/flash'
import TopNav from '~/shell/topnav'

import {GlobalProvider, useGlobal, useGlobalDispatch} from './context'

const Layout = memo(({children}) => {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover'
        />
        <Meta/>
        <Links/>
      </head>
      <body
        className={`awsui-visual-refresh${
          currentMode == 'dark' ? ' awsui-dark-mode' : ''
        } awsui-compact-mode`}>
        <GlobalProvider>{children}</GlobalProvider>
        <Scripts/>
      </body>
    </html>
  )
})

const Z = memo(() => {
  const {pathname} = useLocation()
  const matches = useMatches()

  const data = useGlobal()
  const dispatch = useGlobalDispatch()

  const [
    contentType,
    crumbs,
    sidenav,
    disableContentPaddings,
    headerVariant,
    panel,
    drawers
  ] = useMemo(() => {
    const handles = matches.map(e => e.handle).filter(e => !!e)

    const out = [
      handles.findLast(e => Object.hasOwn(e, 'contentType'))?.contentType ??
        'default',
      handles.map(e => e.crumb).filter(e => !!e),
      data.sidenav.items.length !== 0
        ? data.sidenav
        : handles.findLast(e => Object.hasOwn(e, 'sidenav'))?.sidenav,
      handles.findLast(e => Object.hasOwn(e, 'disableContentPaddings'))
        ?.disableContentPaddings ?? false,
      handles.findLast(e => Object.hasOwn(e, 'headerVariant'))
        ?.headerVariant ?? 'default',
      handles.findLast(e => Object.hasOwn(e, 'panel'))?.panel
    ]

    const activeDrawers = [
      ...handles.flatMap(e => e.activeDrawers).filter(e => !!e),
      ...data.activeDrawers
    ]

    const drawers = handles
      .flatMap(e => e.drawer)
      .filter(e => activeDrawers?.includes(e?.id) ?? !!e)

    if (drawers.length !== 0) {
      out.push(drawers)
    }

    return out
  }, [matches, data])

  const togglePanel = useCallback(({open}) => {
    dispatch({action: 'panel_toggle', open})
  }, [])

  const resizePanel = useCallback(({size}) => {
    dispatch({action: 'panel_size', size})
  }, [])

  const toggleSideNav = useCallback(({open}) => {
    dispatch({action: 'sidenav_toggle', open})
  }, [])

  return (
    <>
      <TopNav/>
      <AppLayout
        content={<Outlet/>}
        contentType={contentType}
        disableContentPaddings={disableContentPaddings}
        minContentWidth={void 0}
        maxContentWidth={void 0}
        activeDrawerId={void 0}
        drawers={drawers}
        onDrawerChange={(...a) => {
          console.log('drawer change', a)
        }}
        breadcrumbs={crumbs.length !== 0 && <BreadcrumbGroup items={crumbs} />}
        headerSelector='#topnav'
        headerVariant={headerVariant}
        navigation={
          sidenav?.items && (
            <SideNavigation
              activeHref={pathname}
              header={sidenav.header ?? {to: '/', text: '~/'}}
              items={sidenav.items}
            />
          )
        }
        navigationHide={!sidenav?.items}
        navigationOpen={data.sidenav.open}
        navigationWidth={void 0}
        onNavigationChange={toggleSideNav}
        notifications={<Flash/>}
        stickyNotifications={true}
        splitPanel={panel}
        splitPanelOpen={data.panel.open}
        splitPanelPreferences={{position: data.panel.position}}
        splitPanelSize={data.panel.size}
        onSplitPanelResize={resizePanel}
        onSplitPanelToggle={togglePanel}
        ariaLabels={void 0}
        footerSelector={void 0}
        tools={void 0}
        toolsHide={true}
        toolsOpen={void 0}
        toolsWidth={void 0}
        onToolsChange={void 0}
      />
    </>
  )
})

const ErrorBoundary = memo(() => {
  const error = useRouteError()

  return (
    <div
      style={{
        padding: '1em',
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'flex-start'
      }}>
      <h1
        style={{
          fontSize: '1em',
          margin: '0px 0px 0px 0px',
          paddingBottom: '0px',
          textDecoration: 'underline solid red',
          textUnderlineOffset: '3px'
        }}>
        {isRouteErrorResponse(error) ? (
          <>
            <span
              style={{
                color: 'red',
                padding: '0 3px',
                marginRight: '3px'
              }}>
              {error.status}
            </span>
            {error.statusText}
          </>
        ) : (
          <>Application Error</>
        )}
      </h1>
      <pre
        style={{
          margin: '0px',
          fontSize: '1em',
          padding: '3px'
        }}>
        {error?.data ?? error?.stack}
      </pre>
    </div>
  )
})

const shouldRevalidate = ({formAction, actionStatus}) =>
  (formAction?.split('?')[0] === '/login' || formAction === '/logout') &&
  actionStatus === undefined

export {
  Layout,
  shouldRevalidate,
  ErrorBoundary,
  Z as default
}
