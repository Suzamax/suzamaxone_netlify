import React from 'react';
import Link from "next/link";
import styled from "styled-components";
import tw from 'twin.macro';
import LastFm from './lastfm';

export default function Header(props) {
  return (
    <HeaderStyled className="header">
      <LastFm/>
      <nav
        className="nav"
        role="navigation"
        aria-label="main navigation"
      >
        <Link href="/">
          <h1>{props.siteTitle || "Volver al inicio"}</h1>
        </Link>
        <div>
          <Link href={`${typeof window !== "undefined" &&
          window.location.pathname == "/about" ?
          "/" : "/about"}`}>
            <h2>{`${typeof window !== "undefined" &&
          window.location.pathname == "/about" ?
          "Inicio" : "Sobre mí"}`}</h2>
          </Link>
        </div>
      </nav>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.header`
  ${tw`bg-gray-800 text-gray-100 p-1 text-center p-2`}
`;