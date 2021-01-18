import Link from 'next/link';
import React from 'react';
import styled from "styled-components";

export default function Footer() {
    return(
        <footer className="mb5 pv4 ph3 ph5--m ph6-l mid-gray tc">
            <small className="f6 db tc">Made in 2021 with my <b className="ttu">🐱</b>, Tachyons and Next.js</small>
        </footer>
    )
}