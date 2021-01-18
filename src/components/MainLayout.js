import React from 'react'
import Header from "./Header"
import Meta from './Meta'
import Footer from './Footer'

export default function Layout(props) {
  return (
    <div
      className={`layout sans-serif ${
        props.pathname == "info" &&
        "info_page"}`
      }
    >
      <Meta
        siteTitle={props.siteTitle}
        siteDescription={props.siteDescription}
      />
      <main className="content">{props.children}</main>
      <Footer />
    </div>
  );
}
