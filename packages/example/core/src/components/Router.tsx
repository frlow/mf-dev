import React, { ReactNode, useEffect, useState } from 'react'

const useRouter = () => {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const routeChanged = (e) => setPath(e.detail)
    window.addEventListener('route-changed', routeChanged)
    return () => window.removeEventListener('route-changed', routeChanged)
  })
  return path
}

export const Router = ({
  children,
}: {
  children?: React.ReactElement<RouteProps> | React.ReactElement<RouteProps>[]
}) => {
  const childElements = children
    ? Array.isArray(children)
      ? children
      : [children]
    : []
  const path = useRouter()
  return (
    childElements.find((c) => path.startsWith(c.props.path)) ||
    childElements.find((d) => d.props.default)
  )
}

type RouteProps = { children: ReactNode; path: string; default?: boolean }
export const Route = ({ children }: RouteProps) => {
  return <>{children}</>
}
