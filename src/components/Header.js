import React from 'react';
import Link from "next/link";
import styled from "styled-components";
import tw from 'twin.macro';

export default function Header(props) {
  return (
    <header className="bg-navy header">
      <nav className="flex justify-between bb b--white-10 mw9 center">
          <a className="link white-70 hover-white no-underline flex items-center pa3" href="/">
            <svg
              className="dib h1 w1"
              data-icon="grid"
              viewBox="0 0 32 32"
              style={{
                fill: "currentcolor"
              }}>
              <title>Super Normal Icon Mark</title>
              <path d="M2 2 L10 2 L10 10 L2 10z M12 2 L20 2 L20 10 L12 10z M22 2 L30 2 L30 10 L22 10z M2 12 L10 12 L10 20 L2 20z M12 12 L20 12 L20 20 L12 20z M22 12 L30 12 L30 20 L22 20z M2 22 L10 22 L10 30 L2 30z M12 22 L20 22 L20 30 L12 30z M22 22 L30 22 L30 30 L22 30z">
              </path>
            </svg>
            <span className="pl3">Carlos Cañellas</span>

          </a>
          <div className="flex-grow pa3 flex items-center">
              <a className="f6 link dib white dim mr3 mr4-ns" href="/about">About</a>
              <a className="f6 link dib white dim mr3 mr4-ns" href="/blog">Blog</a>
          </div>
        </nav>
  </header>
  )
  /*
    <HeaderStyled className="header">
      <nav
        className="nav"
        role="navigation"
        aria-label="main navigation"
      >
        <Link href="/">
          <a><h1>{props.siteTitle || "Carlos Cañellas"}</h1></a>
        </Link>
          <Link href={`${typeof window !== "undefined" &&
          window.location.pathname !== "/" ?
          "/" : "/about"}`}>
            <LinkButton>
            {`${typeof window !== "undefined" &&
          window.location.pathname !== "/" ?
          "Inicio" : "Sobre mí"}`}
            </LinkButton>
          </Link>
      </nav>
    </HeaderStyled>
  ); */
}

const HeaderStyled = styled.header`
  ${tw`bg-gray-800 w-2/3 m-3 mx-auto text-white text-center p-5 rounded-md shadow-md`}
`

const LinkButton = styled.a`
  ${tw`bg-blue-700 hover:bg-blue-900 cursor-pointer text-white font-bold py-2 px-4 border-0 rounded`}
`