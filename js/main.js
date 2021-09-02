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

const repeat = document.getElementById('repeat')
const range = document.getElementById('range')
const volume = document.getElementById('volume')
const volume_slider = document.getElementById('volume_slider')
const volume_div = document.getElementById('volume-div')
const volume_wrap_div = document.getElementById('volume_wrap_div')

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
const end_duration = document.getElementById('end_duration')
const start_duration = document.getElementById('start_duration')

function updateSlider(currentTime, duration){
    //console.log(Math.floor(currentTime), Math.floor(duration))
    if(duration){
        let silder = Math.floor((currentTime * 100) / duration)
        range.value = silder
    }
    
}

function track_duration(index){
    playlist[index].addEventListener('timeupdate',(e)=>{
        var {currentTime, duration} = e.target
        let currentTime_min = Math.floor(currentTime / 60)
        let currentTime_sec = Math.floor(currentTime % 60)
            
        let duration_min = Math.floor(duration / 60)
        let duration_sec = Math.floor(duration % 60)
            
        if(currentTime_sec < 10){
            currentTime_sec = `0${currentTime_sec}`
        }
        start_duration.innerHTML = `${currentTime_min}:${currentTime_sec}`
            
        if(duration && duration_sec < 10){
            end_duration.textContent = `${duration_min}:0${duration_sec}`
        }
        else if(duration){
            end_duration.textContent = `${duration_min}:${duration_sec}`
        }
            //console.log(currentTime_min,currentTime_sec, duration)
        updateSlider(currentTime, duration)
    })
}


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
        play.classList.add('active')
        playing = false
        track_duration(index)

    }
    else{
        playlist[index].pause()
        disc.classList.remove('spin')
        status.innerHTML = "Paused!"
        document.getElementById('play-icon').style.display = "block" 
        document.getElementById('pause-icon').style.display = "none" 
        play.classList.remove('active')
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
        setTimeout(plays, 400);
        //plays()
    }
    else{
        playlist[index].pause()
        status.innerHTML = "Loading..."
        disc.classList.remove('spin')
        playing = true
        index = 0
        setTimeout(plays, 400);
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
        setTimeout(plays, 400);
    }
    else{
        playlist[index].pause()
        status.innerHTML = "Loading..."
        disc.classList.remove('spin')
        playing = true
        index = playlist.length-1
        setTimeout(plays, 400);
    }

})

playlist_icon.addEventListener("click",()=>{
    modal.style.display = "block" 
})

cross_icon.addEventListener("click",()=>{
    modal.style.display = "none" 
})

volume.addEventListener("click",()=>{
    if(!volume.classList.contains('active')){
        document.getElementById('unmute').style.display = "none" 
        document.getElementById('mute').style.display = "block" 
        //console.log(true)
        volume.classList.add('active')
        playlist[index].muted = true
    }
    else{
        document.getElementById('mute').style.display = "none" 
        document.getElementById('unmute').style.display = "block" 
        //console.log(false)
        volume.classList.remove('active')
        playlist[index].muted = false

    }
})

volume_wrap_div.addEventListener("mouseover",()=>{
    if(volume_div.classList.contains('display')){
        volume_div.classList.remove('display')
    }
    else{
        volume_div.classList.add('display')
    }
})
volume_wrap_div.addEventListener("mouseout",()=>{
    if(volume_div.classList.contains('display')){
        volume_div.classList.remove('display')
    }
    else{
        volume_div.classList.add('display')
    }
})
volume_slider.oninput = function() {
    list_1.volume = this.value /100
    list_2.volume = this.value /100
    list_3.volume = this.value /100
    list_4.volume = this.value /100

    console.log(this.value)
}

repeat.addEventListener('click', ()=>{
    if(!repeat.classList.contains('active')){
        repeat.classList.add('active')
        playlist[index].loop = true
    }
    else{
        repeat.classList.remove('active')
        playlist[index].loop = false
    }
})

