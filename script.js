const musicContainer = document.querySelector('#music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('#progress');
const progressContainer = document.querySelector('#progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

const songs = ['hey', 'Ghita Munteanu - Ma asteapta puiul meu acasa', '50 Cent - Candy Shop'];
let songIndex = 1;
let isPlaying = false;

const loadSong = (song) => {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

const playSong = () => {
    musicContainer.classList.add('play');
    audio.play();
    isPlaying = true;
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
}

const pauseSong = () => {
    musicContainer.classList.remove('play');
    audio.pause();
    isPlaying = false;
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
}

loadSong(songs[songIndex]);

playBtn.addEventListener('click', () => {
    if (isPlaying)
        pauseSong();
    else
        playSong();
})

nextBtn.addEventListener('click', () => {
    if (songIndex === songs.length - 1)
        songIndex = 0;
    else
        songIndex++;
    loadSong(songs[songIndex]);
    if (isPlaying)
        playSong();
    else
        pauseSong();
});

prevBtn.addEventListener('click', () => {
    if (songIndex === 0)
        songIndex = songs.length - 1;
    else
        songIndex--;
    loadSong(songs[songIndex]);
    if (isPlaying)
        playSong();
    else
        pauseSong();
});

audio.addEventListener('timeupdate', (e) => {
    let progressBar = (e.target.currentTime / e.target.duration) * 100;
    progress.style.width = `${progressBar}%`;
})

progressContainer.addEventListener('click', (e) => {
    const width = e.target.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    console.log(width);
    audio.currentTime = duration * (clickX / width);
})