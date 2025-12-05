var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "315",
        width: "560",
        playerVars: {
            listType: "playlist",
            list: "PLC63ae3uCHHb0Ck39g6Cs2mBQwknPsyUg" // Replace YOUR_PLAYLIST_ID with the actual ID of your YouTube playlist
        }
    });
}