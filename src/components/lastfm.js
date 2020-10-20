import React from "react"
import styled from "styled-components"
import ColorThief from 'colorthief/dist/color-thief.mjs'

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

        this.setState({
            artist: track.artist['#text'],
            title: track.name,
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
                <LastFmComponent id="lastfm" style={{backgroundColor: 'rgba('+this.state.bgcolor[0]+','+this.state.bgcolor[1]+','+this.state.bgcolor[2]+',1)'}}>
                    <img style={{
                        margin: '0 1rem 0 0',
                        boxShadow: '0 0 1px black',
                        borderRadius: 2
                    }} alt="cover" src={this.state.cover} />
                    <TextComponent style={{color: 'rgba('+(255-this.state.bgcolor[0])+','+(255-this.state.bgcolor[1])+','+(255-this.state.bgcolor[2])+',1)'}}>#NowPlaying
                        <span> {this.state.artist}</span> - <span> {this.state.title}</span> 
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
    height: 72px;
    border-radius: 2px;
    max-width: fit-content;
    margin: 1rem auto;
`;

const TextComponent = styled.div`
    padding-right: 1rem;
`;