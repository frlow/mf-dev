import React from "react";

export const NavLink = ({text, url}: { text: string, url: string }) => {
  return <li><a href={url} onClick={e => {
    e.preventDefault()
    window.HistoryLibrary.push(url)
  }}>{text}</a></li>
}