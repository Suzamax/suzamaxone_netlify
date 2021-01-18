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
        <div class="w-100 w-25-ns contain br2 shadow-4" id="lastfm"
            style={{
            color: 'rgba(' +
                this.state.bgcolor[2][0] + ',' + this.state.bgcolor[2][1] + ',' + this.state.bgcolor[2][2] + ',1)',
                opacity: this.state.isPlaying ? "1" : "0.33", 
                backgroundImage: 'url(' + this.state.cover +'), linear-gradient(90deg, rgba('+this.state.bgcolor[0][0]+','+this.state.bgcolor[0][1]+','+this.state.bgcolor[0][2]+',1) 0%, rgba('+this.state.bgcolor[1][0]+','+this.state.bgcolor[1][1]+','+this.state.bgcolor[1][2]+',1) 90%)',
                backgroundPosition: 'right',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="cf  ">
                    <div className="fl white">
                        <dl className="ml3 br2 f6 lh-copy w-50 w-100-ns pa2 bg-black-20">
                            <dt className="clip">Title</dt>
                            <dd className="ml0 truncate w-100">{this.state.title}</dd>
                            <dt className="clip">Artist</dt>
                            <dd className="ml0 truncate w-100 white b">{this.state.artist}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        )
    } 
}