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
  ${tw`bg-gray-800 w-2/3 m-3 mx-auto text-gray-100 text-center p-5 rounded-md shadow-md`}
`;