import React from "react"
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
            bgcolor: [[],[],[]]
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
            cover: track.image[3]["#text"]
        });

        this.getColorsFromCover(track.image[1]["#text"])
    }

    getColorsFromCover(url) {
        const img = new Image();
        img.onload = () => { 
            this.setState({
                bgcolor: new ColorThief().getPalette(img, 3)
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
        <div style={{
            color: 'rgba('+this.state.bgcolor[2][0]+','+this.state.bgcolor[2][1]+','+this.state.bgcolor[2][2]+',1)'
        }}>
            <section id="lastfm" style={{
                opacity: this.state.isPlaying ? "1" : "0.33", 
                backgroundColor: 'rgba('+this.state.bgcolor[0][0]+','+this.state.bgcolor[0][1]+','+this.state.bgcolor[0][2]+',1)',
            }}>
                <div className="mw9 center">
                    <h2 className="f3 fw4 pa3 mv0">What I'm listening</h2>
                    <div className="cf ph2-ns">

                        <div className="fl w-100 w-50-ns pa2" style={{color: 'rgba('+(this.state.bgcolor[1][0])+','+(this.state.bgcolor[1][1])+','+(this.state.bgcolor[1][2])+',1)'}}>
                            <p className="f5 lh-copy measure-narrow">I do listen too much music!</p>
                            <p className="f5 lh-copy measure-narrow">Check my Last.fm and see what I listen... and even listen to it too!</p>
                            <p className="f5 lh-copy measure-narrow">BTW most music I listen to is EDM and rock.</p>
                        </div>
                        <div className="fl w-100 w-30-ns pa2"></div>
                        <div className="fl w-100 w-20-ns pa2">
                            <div className="tc pa2">
                                <div className="w-100-ns pa2 tc">
                                    <img src={this.state.cover} alt={this.state.title + " - " + this.state.artist} className="w-100 db outline black-10"/>
                                    <dl className="mt2 f6 lh-copy">
                                    <dt className="clip">Title</dt>
                                    <dd className="ml0 truncate w-100">{this.state.title}</dd>
                                    <dt className="clip">Artist</dt>
                                    <dd className="ml0 truncate w-100" style={{color: 'rgba('+(this.state.bgcolor[1][0])+','+(this.state.bgcolor[1][1])+','+(this.state.bgcolor[1][2])+',1)'}}>{this.state.artist}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        )
        /*
            <div className="justify-items-center">
                <LastFmComponent id="lastfm" style={{
                    opacity: this.state.isPlaying ? "1" : "0.33", 
                    backgroundColor: 'rgba('+this.state.bgcolor[0][0]+','+this.state.bgcolor[0][1]+','+this.state.bgcolor[0][2]+',1)',
                    border: '1px solid rgba('+this.state.bgcolor[2][0]+','+this.state.bgcolor[2][1]+','+this.state.bgcolor[2][2]+',1)'
                }}>
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
                    <TextComponent style={{color: 'rgba('+(this.state.bgcolor[1][0])+','+(this.state.bgcolor[1][1])+','+(this.state.bgcolor[1][2])+',1)'}}>
                        <Bolder> {this.state.artist}</Bolder> - <span> {this.state.title}</span> 
                    </TextComponent>
                </LastFmComponent>
            </div>
        ) */
    } 
}