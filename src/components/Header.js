import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faRssSquare, faUser } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faInstagram, faLinkedin, faTelegram, faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons'


export default function Header(props) {

    const headerRef = useRef()
    const nickRef = useRef()
    const siameseRef = useRef()
    const handleScroll = () => {
        headerRef.current.style.backgroundSize = 100 + window.scrollY * 1.4 + '%';
        nickRef.current.style.fontSize = 400 - (document.documentElement.scrollTop * 4) + 'px';
        siameseRef.current.style.bottom = -2 * window.scrollY + 'px';
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header ref={headerRef} >
            <div class="mobile bg-light-blue pa3">
            <FontAwesomeIcon icon={faInfoCircle} /> This page is cooler on desktop or iPad.
            </div>
            <nav class="cf">
                <a href="/" class="fl w-50 w-10-ns tc pa3 bg-red">Home</a>
                <a href="/about" class="fl w-25 w-10-ns tc pa3 bg-black-20"> Me <FontAwesomeIcon icon={faUser} /></a>
                <a href="/blog" class="fl w-25 w-10-ns tc pa3 bg-black-30"> Blog <FontAwesomeIcon icon={faRssSquare} /></a>
                <a href="https://twitter.com/Suzamax" class="fl w-25 w-10-ns tc pa3 bg-black-40"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="https://twitch.tv/suzamax" class="fl w-25 w-10-ns tc pa3 bg-black-50"><FontAwesomeIcon icon={faTwitch} /></a>
                <a href="https://github.com/Suzamax" class="fl w-25 w-10-ns tc pa3 bg-black-60"><FontAwesomeIcon icon={faGithub} /></a>
                <a href="https://linkedin.com/in/suzamax" class="fl w-25 w-10-ns tc pa3 bg-black-70"><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="https://instagram.com/cct.suzamax" class="fl w-25 w-10-ns tc pa3 bg-black-80"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="https://t.me/suzamax" class="fl w-25 w-10-ns tc pa3 bg-black-90"><FontAwesomeIcon icon={faTelegram} /></a>
                <a href="#" class="fl w-50 w-10-ns tc pa3 bg-light-blue black">Curriculum</a>
            </nav>
            <section>
                <h1 class="f-headline lh-solid nicktitle" ref={nickRef}>Welcome!</h1>
                <div id="siamese" ref={siameseRef}>
                <div class="bubble bubble-bottom-left">Meow, scroll down!</div>
                </div>
            </section>
        </header>
    )
}