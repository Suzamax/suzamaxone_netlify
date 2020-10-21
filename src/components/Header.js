import React from 'react';
import Link from "next/link";
import styled from "styled-components";
import tw from 'twin.macro';

export default function Header(props) {
  return (
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
          window.location.pathname == "/about" ?
          "/" : "/about"}`}>
            <LinkButton>
            {`${typeof window !== "undefined" &&
          window.location.pathname == "/about" ?
          "Inicio" : "Sobre mí"}`}
            </LinkButton>
          </Link>
      </nav>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.header`
  ${tw`bg-gray-800 w-2/3 m-3 mx-auto text-gray-100 text-center p-5 rounded-md shadow-md`}
`

const LinkButton = styled.a`
  ${tw`bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 border-0 rounded`}
`