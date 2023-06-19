import React, {ReactNode, useEffect, useState} from "react";

const matchPath = (path: string, target: string) => {
  return path === target
}

export const Router = ({children}: {
  children?: React.ReactElement<RouteProps> | React.ReactElement<RouteProps>[]
}) => {
  const childElements = children ? (Array.isArray(children) ? children : [children]) : []
  const [path, setPath] = useState(window.HistoryLibrary.location.pathname)
  useEffect(() => {
    const unListen = window.HistoryLibrary.listen(({location}) => setPath(location.pathname))
    return () => unListen()
  })
  return childElements.find(c => matchPath(path, c.props.path)) || childElements.find(d => d.props.default)
}

type RouteProps = { children: ReactNode, path: string, default?: boolean }
export const Route = ({children}: RouteProps) => {
  return <>{children}</>
}