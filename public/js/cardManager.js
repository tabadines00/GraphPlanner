var el = '<div class="drag card noselect">{title}</div>';
var playArea = document.getElementById("playArea");

function addCards(title) {
    for(i = 0; i < title.length; i++){
        playArea.innerHTML += el.replace("{title}", title[i]);
    }
}