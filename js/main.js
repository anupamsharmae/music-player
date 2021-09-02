let audio_info = `[
    {
        "name": "Batchbug",
        "artist": "Sweet Dreams"
    },
    {
        "name": "Cali",
        "artist": "Beats"
    },
    {
        "name": "Chillout Lounge",
        "artist": "Slow Grind"
    },
    {
        "name": "Dreaming Under The Stars",
        "artist": "Romance"
    }
]`


const obj = JSON.parse(audio_info)

const status = document.getElementById('status')
const playlist_icon = document.getElementById('playlist-icon')
const cross_icon = document.getElementById('cross-icon')
const modal = document.getElementById('modal')

const disc = document.getElementById('disc')

const song_name = document.getElementById('song_name')
const artist_name = document.getElementById('artist_name')

var previous = document.getElementById('previous')
var play = document.getElementById('play')
var next = document.getElementById('next')

var list_1 = document.getElementById('1')
var list_2 = document.getElementById('2')
var list_3 = document.getElementById('3')
var list_4 = document.getElementById('4')


const playlist = [list_1, list_2, list_3,list_4]
var index = 0
var playing = true





function plays(){
    if(playing){
        playlist[index].load()
        song_name.innerHTML = obj[index].name
        artist_name.innerHTML = obj[index].artist
        status.innerHTML = "Now Playing!"
        //loadtrack(index)
        playlist[index].play();
        disc.classList.add('spin')
        document.getElementById('play-icon').style.display = "none" 
        document.getElementById('pause-icon').style.display = "block" 
        playing = false
    }
    else{
        playlist[index].pause()
        disc.classList.remove('spin')
        status.innerHTML = "Paused!"
        document.getElementById('play-icon').style.display = "block" 
        document.getElementById('pause-icon').style.display = "none" 
        playing = true
    }
}

play.addEventListener("click", plays)
//Audio.addEventListener("ended",next)


next.addEventListener("click",()=>{
    if(index < playlist.length-1){
        playlist[index].pause()
        status.innerHTML = "Loading..."
        disc.classList.remove('spin')
        playing = true
        index++
        //call play event listner functin with paramtr
        setTimeout(plays, 200);
        //plays()
    }
    else{
        playlist[index].pause()
        status.innerHTML = "Loading..."
        disc.classList.remove('spin')
        playing = true
        index = 0
        setTimeout(plays, 200);
        //plays()
    }
})

previous.addEventListener("click",()=>{
    if(index > 0){
        playlist[index].pause()
        status.innerHTML = "Loading..."
        disc.classList.remove('spin')
        playing = true
        index--
        //call play event listner functin with paramtr
        setTimeout(plays, 200);
    }
    else{
        playlist[index].pause()
        status.innerHTML = "Loading..."
        disc.classList.remove('spin')
        playing = true
        index = playlist.length-1
        setTimeout(plays, 200);
    }

})

playlist_icon.addEventListener("click",()=>{
    modal.style.display = "block" 
})

cross_icon.addEventListener("click",()=>{
    modal.style.display = "none" 
})
