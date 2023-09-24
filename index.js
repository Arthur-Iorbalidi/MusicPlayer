let playlist = [
    'EdSheeran-2step.mp3',
    'LewisCapaldi–Grace.mp3',
    'OneRepublic-Run(CollinsRemix).mp3',
    'TheScore-Victorious.mp3',
    'ImagineDragons-Demons.mp3',
    'EdSheeran-StopTheRain.mp3'
];
let treck;

const audio = document.querySelector('.audio')


window.onload = function() {
    treck = 0;
}

document.body.addEventListener("click", function(event) {
    if(!event.target.closest('.volumePanel') && !event.target.closest('.volume')) {
        volumePanel.classList.remove('show');
    }
})

function switchTreck(numTreck) {
    audio.src = 'music/' + playlist[numTreck];
    audio.currentTime = 0;
    audio.play();
}

function timeToFormat(durationInSeconds, elem) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    const formattedDuration = `${minutes.toString().padStart(1, '0')}:${seconds.toString().padStart(2, '0')}`;
    if(formattedDuration === 'NaN:NaN') {
        setTimeout(timeToFormat(durationInSeconds, elem), 1000);
    }
    else {
        elem.innerHTML = formattedDuration;
    }
}

const commonTime = document.querySelector('.commonTime');
const currentTime = document.querySelector('.currentTime');
function audioTime() {
    console.log(audio.duration)
    let audioTime = Math.round(audio.currentTime);
    let audioLength = Math.round(audio.duration)
    time.style.width = (audioTime * 100) / audioLength + '%';
    if (audioTime == audioLength && treck < 5) {
        treck++;
        switchTreck(treck);
        SetImg()
    } else if (audioTime == audioLength && treck >= 5) {
        treck = 0;
        switchTreck(treck);
        SetImg()
    }
    timeToFormat(audio.duration, commonTime);
    timeToFormat(audioTime, currentTime);
}

const btnPlay = document.querySelector('.play');
const time = document.querySelector('.time');
btnPlay.addEventListener("click", function() {
    if (btnPlay.classList.contains('pause')) {
        btnPlay.classList.toggle('pause');
        audio.pause();
        clearInterval(audioPlay);
        return;
    }
    audio.play();
    btnPlay.classList.toggle('pause');
    audioPlay = setInterval(audioTime, 10)
})

const btnBack = document.querySelector('.backward');
const btnNext = document.querySelector('.forward');
btnBack.addEventListener("click", function() {
    if (treck > 0) {
        treck--;
        switchTreck(treck);
    } else { 
        treck = 5;
        switchTreck(treck);
    }
    audioPlay = setInterval(audioTime, 10)
    btnPlay.classList.add('pause');
    SetImg();
});
btnNext.addEventListener("click", function() {
    if (treck < 5) {
        treck++;
        switchTreck(treck);
    } else { 
        treck = 0;
        switchTreck(treck);
    }
    audioPlay = setInterval(audioTime, 10)
    btnPlay.classList.add('pause');
    SetImg();
});

const img = document.querySelector('.player_img')
const text = document.querySelector('.text')
function SetImg() {
    var classesArray = Array.from(img.classList);
    img.classList.remove(classesArray[1]);
    switch (treck) {
        case 0:
            img.classList.add('img_2step');
            text.innerHTML = 'Ed Sheeran - 2step';
            break;
        case 1:
            img.classList.add('img_Grace');
            text.innerHTML = 'Lewis Capaldi - Grace';
            break;
        case 2:
            img.classList.add('img_Run');
            text.innerHTML = 'OneRepublic - Run';
            break;
        case 3:
            img.classList.add('img_Victorious');
            text.innerHTML = 'The Score - Victorious';
            break;
        case 4:
            img.classList.add('img_Demons');
            text.innerHTML = 'Imagine Dragons - Demons';
            break;
        case 5:
            img.classList.add('img_StopTheRain');
            text.innerHTML = 'Ed Sheeran - Stop The Rain';
            break;
    }
}

const timeLine = document.querySelector('.audio-track')
timeLine.addEventListener("click", function(event) {
    time.style.width = event.offsetX + 'px';
    const percent = (event.offsetX) / (timeLine.clientWidth);
    audio.currentTime = audio.duration * percent;
})

audio.volume = 0.5;

const btnVolume = document.querySelector('.volume');

const volumePanel = document.querySelector('.volumePanel');
const volumeSlider = document.querySelector('.volumeSlider');
const volumeFill = document.querySelector('.volumeFill');

btnVolume.addEventListener('click', toggleVolumePanel);
volumeSlider.addEventListener('click', adjustVolume);

function adjustVolume(event) {
  const sliderRect = volumeSlider.getBoundingClientRect();
  const offsetY = sliderRect.bottom - event.clientY;
  const volume = Math.max(0, Math.min(1, offsetY / sliderRect.height));
  updateVolume(volume);
}

function updateVolume(volume) {
  const sliderHeight = volumeSlider.offsetHeight;
  const fillHeight = Math.ceil(volume * sliderHeight);

  volumeFill.style.height = fillHeight + 'px';
  audio.volume = volume;
}

function toggleVolumePanel() {
  volumePanel.classList.toggle('show');
}
