// audio lists
const list_1 = document.getElementById('1')
const list_2 = document.getElementById('2')
const list_3 = document.getElementById('3')
const list_4 = document.getElementById('4')

const audio = [
    {
        name: "Batchbug",
        artist: "Sweet Dreams",
        scr: list_1
    },
    {
        name: "Cali",
        artist: "Beats",
        scr: list_2
    },
    {
        name: "Chillout Lounge",
        artist: "Slow Grind",
        scr: list_3
    },
    {
        name: "Dreaming Under The Stars",
        artist: "Romance",
        scr: list_4
    }
]

const statusText = document.getElementById('status')
const playlist_icon = document.getElementById('playlist-icon')
const cross_icon = document.getElementById('cross-icon')
const modal = document.getElementById('modal')

// album cards
const disc = document.getElementById('disc')
const song_name = document.getElementById('song_name')
const artist_name = document.getElementById('artist_name')



// buttons
const repeatbtn = document.getElementById('repeat')
const previousbtn = document.getElementById('previous')
const playbtn = document.getElementById('play')
const nextbtn = document.getElementById('next')
const volumebtn = document.getElementById('volume')


// seek bar
const end_duration = document.getElementById('end_duration')
const start_duration = document.getElementById('start_duration')

const seekbar_slider = document.getElementById('seekbar_slider')
const slider_range = document.getElementById('slider_range')
const range = document.getElementById('range')
const dot = document.getElementById('dot')


// flags containing for the check status
let isplaying = false
let ismuted = false
let isrepeated = false
let index = 0


// update the seekbar with current time.
function updateSlider(currentTime, duration) {
    if (duration) {
        let silder = Math.floor((currentTime * 100) / duration)
        range.style.width = silder + 2 + "%"
    }
}



// track function which track the current time and duration of the playing song
// and update the time label i.e start duration and end duration.
function trackDuration(e) {
    var { currentTime, duration } = e.target

    let currentTime_min = Math.floor(currentTime / 60)
    let currentTime_sec = Math.floor(currentTime % 60)

    let duration_min = Math.floor(duration / 60)
    let duration_sec = Math.floor(duration % 60)

    if (currentTime_sec < 10)
        currentTime_sec = `0${currentTime_sec}`

    start_duration.innerHTML = `${currentTime_min}:${currentTime_sec}`

    if (duration && duration_sec < 10)
        end_duration.textContent = `${duration_min}:0${duration_sec}`

    else if (duration)
        end_duration.textContent = `${duration_min}:${duration_sec}`

    // update the seekbar length according to time that song has played.    
    updateSlider(currentTime, duration)
}



// plays and stop method
function songplay() {
    if (!isplaying) {

        // check if volume btn is muted for the current song or not.
        audio[index].scr.muted = (ismuted)? true : false

        // check if the repeat btn is active for the current song or not.
        audio[index].scr.loop = (isrepeated)? true : false

        // plays the current song.
        audio[index].scr.play()
        isplaying = true

        song_name.innerText = audio[index].name
        artist_name.innerText = audio[index].artist
        statusText.innerText = 'Now Playing!'
        disc.classList.add('spin')
        playbtn.classList.add('active')
        document.getElementById('play-icon').style.display = "none"
        document.getElementById('pause-icon').style.display = "block"

        audio[index].scr.addEventListener('timeupdate', trackDuration)
    }
    else {
        // stop the current song and DOM elements
        stopSong()
    }

}


// this method trigger when the song is finished playing and to reset the Ui
function stopSong() {

    //stop the current song
    audio[index].scr.pause()
    isplaying = false

    disc.classList.remove('spin')
    playbtn.classList.remove('active')
    statusText.innerText = "Paused!"
    range.style.width = 2 + "%"
    start_duration.innerText = "0:00"
    document.getElementById('play-icon').style.display = "block"
    document.getElementById('pause-icon').style.display = "none"
}


// play button handler handles the plays() method that is use to play and stop the song
playbtn.addEventListener('click', songplay)

// audio handler handles the stop() method when song is finished
audio[index].scr.addEventListener("ended", stopSong)

nextbtn.addEventListener('click', () => {
    if (index < audio.length - 1) {
        stopSong()
        index++
        audio[index].scr.load()
        songplay()
    }
    else {
        stopSong()
        index = 0
        audio[index].scr.load()
        songplay()
    }
})

previousbtn.addEventListener('click', () => {
    if (index > 0) {
        stopSong()
        index--
        audio[index].scr.load()
        songplay()
    }
    else {
        stopSong()
        index = audio.length - 1
        audio[index].scr.load()
        songplay()
    }
})

volumebtn.addEventListener('click', () => {
    if (!ismuted) {
        ismuted = true
        audio[index].scr.muted = ismuted

        volumebtn.classList.add('active')
        document.getElementById('mute').style.display = "block"
        document.getElementById('unmute').style.display = "none"
    }
    else {
        ismuted = false
        audio[index].scr.muted = ismuted

        volumebtn.classList.remove('active')
        document.getElementById('unmute').style.display = "block"
        document.getElementById('mute').style.display = "none"
    }
})

repeatbtn.addEventListener('click', () => {
    if (!isrepeated) {
        isrepeated = true
        audio[index].scr.loop = isrepeated
        repeatbtn.classList.add('active')
    }
    else {
        isrepeated = false
        audio[index].scr.loop = isrepeated
        repeatbtn.classList.remove('active')
    }
})



// open playlist handler
playlist_icon.addEventListener("click", () => {
    modal.style.display = "block"
})

// close playlsit handler
cross_icon.addEventListener("click", () => {
    modal.style.display = "none"
})


//seekbar handler
seekbar_slider.addEventListener("mouseover", ()=>{
    dot.style.visibility = "visible"
})
//seekbar handler
seekbar_slider.addEventListener("mouseleave",()=>{
    dot.style.visibility = "hidden"
})
//seekbar handler
seekbar_slider.addEventListener('click', (e)=>{
    range.style.width = (e.offsetX/slider_range.offsetWidth)*100 +"%"
})
//seekbar handler
seekbar_slider.addEventListener('dragstart', (e)=>{
    range.style.width = (e.offsetX/slider_range.offsetWidth)*100 +"%"
})