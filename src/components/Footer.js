import React from 'react';
import styled from "styled-components";
import tw from 'twin.macro';
import LastFm from './lastfm';
import Twitter from 'entypo-optimized/dist/icons/Twitter.svg'
import GitHub from 'entypo-optimized/dist/icons/GitHub.svg'


export default function Footer() {


    return(
        <FooterComponent>
            
            Lo que escucho ahora mismo
            <LastFm />

        </FooterComponent>
    )
}

const FooterComponent = styled.footer`
${tw`bg-gray-800 w-2/3 m-3 mx-auto text-gray-100 p-1 text-center p-2 rounded-md shadow-md`}
`;

const IconHandler = styled.div`
    ${tw`mr-2 w-10 h-10 fill-current`}

`

const Centered = styled.div`
    ${tw`flex w-1/6 items-center bg-blue-500 text-white text-sm font-bold px-4 py-3`}
`