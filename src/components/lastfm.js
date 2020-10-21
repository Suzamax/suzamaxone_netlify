import React from "react"
import styled from "styled-components"
import ColorThief from 'colorthief/dist/color-thief.mjs'
import LazyLoad from 'react-lazy-load';
import tw from "twin.macro";

const googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';

export default class LastFm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            artist: "",
            title: "",
            cover: "",
            bgcolor: ""
        };
    }

    async componentDidMount() {
        const res = await fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=suzamax&api_key=9d17e8b3542e80484a9ec31253f75f7e&limit=1&format=json");
        const json = await res.json()
        const track = await json.recenttracks.track[0];
        const np = () => track["@attr"] !== undefined;
        const isplaying = np();

        this.setState({
            artist: track.artist['#text'],
            title: track.name,
            isPlaying: isplaying,
            cover: track.image[1]["#text"]
        });

        this.getColorFromCover(track.image[1]["#text"])
    }

    getColorFromCover(url) {
        const img = new Image();
        img.onload = () => { 
            this.setState({
                bgcolor: new ColorThief().getColor(img)
            });
        }
        img.crossOrigin = 'Anonymous';
        img.src = googleProxyURL + encodeURIComponent(url);
        img.style
    }
    
    componentWillUnmount() {
        clearInterval(this.getLastFM);
    }


    render() {
        return (
            <div className="justify-items-center">
                <LastFmComponent id="lastfm" style={{opacity: this.state.isPlaying ? "1" : "0.33", backgroundColor: 'rgba('+this.state.bgcolor[0]+','+this.state.bgcolor[1]+','+this.state.bgcolor[2]+',1)'}}>
                    <LazyLoad
                        debounce={false}
                        offsetVertical={450}
                    >
                        <img style={{
                            margin: '0 .5rem',
                            boxShadow: '0 0 1px black',
                            borderRadius: 2
                        }} alt="cover" src={this.state.cover} />
                    </LazyLoad>
                    <TextComponent style={{color: 'rgba('+(this.state.bgcolor[0] > 128 ? 0 : 255)+','+(this.state.bgcolor[1] > 128 ? 0 : 255)+','+(this.state.bgcolor[2] > 128 ? 0 : 255)+',1)'}}>
                        <Bolder> {this.state.artist}</Bolder> - <span> {this.state.title}</span> 
                    </TextComponent>
                </LastFmComponent>
            </div>
        )
    } 
}

const LastFmComponent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    ${tw`shadow text-xs`}
    border-radius: 2px;
    max-width: fit-content;
    margin: 3rem auto;
`;

const TextComponent = styled.div`
    padding-right: 1rem;
`;

const Bolder = styled.span`
    font-weight: 700;
`