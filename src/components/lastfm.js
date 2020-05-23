import React from "react"
import styled from "styled-components"
import ColorThief from "colorthief"
import { StaticQuery, graphql } from "gatsby"

const colorThief = new ColorThief();
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
        const res = await fetch("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=suzamax&api_key=9d17e8b3542e80484a9ec31253f75f7e&limit=1&format=json");
        const json = await res.json()
        const track = await json.recenttracks.track[0];

        this.setState({
            artist: track.artist['#text'],
            title: track.name,
            cover: track.image[1]["#text"],
        });

    }

    getColor = async img => {
        img.crossOrigin = 'Anonymous';
        img.src = googleProxyURL + encodeURIComponent(this.state.cover);
        if (img.complete) {
            return colorThief.getColor(img);
        } else {
            img.addEventListener('load', async function() {
                console.log(img);
                return colorThief.getColor(img);
            }, false);       
        }
    }
    
    componentWillUnmount() {
        clearInterval(this.getLastFM);
    }


    render() {
        return (
            <div>
            <StaticQuery
                query={defaultCover}
                render={data => 
                    <LastFM id="lastfm" bgcolor={this.state.bgcolor}>
                        <LastFMCover alt="cover" src={this.state.cover ?? data.default.childImageSharp.fixed} />
                        <LastFMText>Estoy escuchando
                            <LastFMTitle> {this.state.title}</LastFMTitle> de 
                            <LastFMArtist> {this.state.artist}</LastFMArtist>
                            <div className="bars"></div>
                        </LastFMText>
                    </LastFM>
                }
            />
            <PTop />
            </div>
        )
    } 
}

const PTop = styled.div`
    content: "";
    position: relative;
    height: 50px;
`;

const LastFM = styled.div`
    background-color: rgba(248,248,255,.8);
    position: fixed;
    top: 0;
    margin: .5em;
    left: 0;
    height: 64px;
    width: calc(100% - 1em);
    max-width: 20em;
    border-bottom: 1px solid rgba(0,0,0,.25);
    border-radius: 2px;
    box-shadow: 0 .1rem .5rem rgba(0,0,0,.66);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    z-index: 9;
`;

const LastFMCover = styled.img`
    float: left;
`;

const LastFMText = styled.div`
    padding: 1em;
    position: relative;
    margin-left: 70px;
    font-size: .66rem;
`;

const LastFMTitle = styled.p`
    display: inline;
    font-weight: bolder;
`;
const LastFMArtist = styled.p`
    display: inline;
    font-weight: bolder;
`;

const defaultCover = graphql`
  query DefaultCover {
    default: file(absolutePath: { regex: "/undefined.jpg/" }) {
      childImageSharp {
        fixed(width: 64, height: 64) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
