let helpers = {

    LastFMHelper: function() {
        fetch("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=suzamax&api_key=9d17e8b3542e80484a9ec31253f75f7e&limit=1&format=json")
        .then(res => res.json())
        .catch(e => console.log("failed to retrieve data"));
    }
}

export default helpers;