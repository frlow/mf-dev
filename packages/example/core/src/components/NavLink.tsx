import React from 'react'

export const NavLink = ({ text, url }: { text: string; url: string }) => {
  return (
    <li>
      <a
        href={url}
        onClick={(e) => {
          e.preventDefault()
          // @ts-ignore
          window.routeTo(url)
        }}
      >
        {text}
      </a>
    </li>
  )
}
