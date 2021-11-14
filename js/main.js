const audio_info = `[
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

// jSON object
const obj = JSON.parse(audio_info)

const status = document.getElementById('status')
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

// audio lists
const list_1 = document.getElementById('1')
const list_2 = document.getElementById('2')
const list_3 = document.getElementById('3')
const list_4 = document.getElementById('4')

// audio list array and index for starting index and isplaying is for flag
const playlist = [list_1, list_2, list_3,list_4]
let index = 0
let isplaying = true

// seek bar
const end_duration = document.getElementById('end_duration')
const start_duration = document.getElementById('start_duration')

const seekbar_slider = document.getElementById('seekbar_slider')
const slider_range = document.getElementById('slider_range')
const range = document.getElementById('range')
const dot = document.getElementById('dot')



// update the seekbar with current time
function updateSlider(currentTime, duration){
    if(duration){
        let silder = Math.floor((currentTime * 100) / duration)
        range.style.width = silder + 2  + "%"
    }  
}



// track function which track the current time and duration of the playing song
// and update the time label i.e start duration and end duration
function trackDuration(e){
    var {currentTime, duration} = e.target
  
    let currentTime_min = Math.floor(currentTime / 60)
    let currentTime_sec = Math.floor(currentTime % 60)
            
    let duration_min = Math.floor(duration / 60)
    let duration_sec = Math.floor(duration % 60)
            
    if(currentTime_sec < 10)
        currentTime_sec = `0${currentTime_sec}`
      
    start_duration.innerHTML = `${currentTime_min}:${currentTime_sec}`
            
    if(duration && duration_sec < 10)
        end_duration.textContent = `${duration_min}:0${duration_sec}`
    
    else if(duration)
        end_duration.textContent = `${duration_min}:${duration_sec}`
    
    updateSlider(currentTime, duration)    
}



// plays and stop method
function plays(){
    if(isplaying){
        playlist[index].load()
        song_name.innerText = obj[index].name
        artist_name.innerText = obj[index].artist
        status.innerText = 'Now Playing!'
        playlist[index].play()
        disc.classList.add('spin')
        playbtn.classList.add('active')
        document.getElementById('play-icon').style.display = "none" 
        document.getElementById('pause-icon').style.display = "block" 
        isplaying = false
        playlist[index].addEventListener('timeupdate',trackDuration)
    }
    else{
        playlist[index].pause()
        disc.classList.remove('spin')
        playbtn.classList.remove('active')
        status.innerText = "Paused!"
        document.getElementById('play-icon').style.display = "block" 
        document.getElementById('pause-icon').style.display = "none" 
        isplaying = true
    }
}



// this method trigger when the song is finished playing and to reset the Ui
function stop(){
    playlist[index].pause()
    disc.classList.remove('spin')
    playbtn.classList.remove('active')
    range.style.width = 2 + "%"
    start_duration.innerText = "0:00"
    document.getElementById('play-icon').style.display = "block" 
    document.getElementById('pause-icon').style.display = "none" 
    isplaying = true
}



// repeat button handler handles the current song will repeat continuously
repeatbtn.addEventListener("click", ()=>{
    if(!repeatbtn.classList.contains('active')){
        repeatbtn.classList.add('active')
        playlist[index].loop = true
    }
    else{
        repeatbtn.classList.remove('active')
        playlist[index].loop = false
    }
})



// play button handler handles the plays() method that is use to play and stop the song
playbtn.addEventListener("click", plays)



// audio handler handles the stop() method when song is finished
playlist[index].addEventListener("ended",stop)



// next button handler handles the next song will play when clicked
nextbtn.addEventListener("click",()=>{
    if(index < playlist.length-1){
        playlist[index].pause()
        status.innerHTML = "Loading..."
        disc.classList.remove('spin')
        isplaying = true
        index++
        setTimeout(plays, 200);
    }
    else{
        playlist[index].pause()
        status.innerHTML = "Loading..."
        disc.classList.remove('spin')
        isplaying = true
        index = 0
        setTimeout(plays, 200);   
    }
})



//previous button handler handles the previous song will play when clicked
previousbtn.addEventListener("click",()=>{
    if(index > 0){
        playlist[index].pause()
        status.innerHTML = "Loading..."
        disc.classList.remove('spin')
        isplaying = true
        index--
        setTimeout(plays, 200);
    }
    else{
        playlist[index].pause()
        status.innerHTML = "Loading..."
        disc.classList.remove('spin')
        isplaying = true
        index = playlist.length-1
        setTimeout(plays, 200);
    }
})



// volume button handler handles the mute and unmute state of volume when pressed
volumebtn.addEventListener("click", ()=>{
    if(!volumebtn.classList.contains('active')){
        volumebtn.classList.add('active')
        playlist[index].muted = true
        document.getElementById('mute').style.display = "block" 
        document.getElementById('unmute').style.display = "none" 
    }
    else{
        volumebtn.classList.remove('active')
        playlist[index].muted = false
        document.getElementById('unmute').style.display = "block" 
        document.getElementById('mute').style.display = "none" 
    }
})



// open playlist handler
playlist_icon.addEventListener("click",()=>{
    modal.style.display = "block" 
})

// close playlsit handler
cross_icon.addEventListener("click",()=>{
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