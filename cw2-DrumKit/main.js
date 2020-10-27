M.AutoInit();


const control = {
    'KeyQ': document.querySelector('#boom'),
    'KeyW': document.querySelector('#clap'),
    'KeyE': document.querySelector('#hihat'),
    'KeyR': document.querySelector('#kick'),
    'KeyT': document.querySelector('#openhat'),
    'KeyA': document.querySelector('#ride'),
    'KeyS': document.querySelector('#snare'),
    'KeyD': document.querySelector('#tink'),
    'KeyF': document.querySelector('#tom'),
}
const records = []
let recordingTrack = null
let recordingTime = 3
let recordingTimeout


document.body.addEventListener('keydown', (e) => {
    playsound(control[e.code])
    saveSound(control[e.code])
})

const playsound = (soundNode) => {
    const sound = soundNode.cloneNode()
    sound.onended = () => { delete sound }
    sound.play()

}

const saveSound = (soundNode) => {
    if (recordingTrack !== null) {
        const rec = records[recordingTrack].rec
        const start = records[recordingTrack].start
        rec.push({ offset: Date.now() - start, node: soundNode })
        console.log(records[recordingTrack].rec)
    }
}

const stopRecording = () => {
    recordingTrack = null
    clearTimeout(recordingTimeout)
    document.querySelectorAll(".recordBtn").forEach((element, num) => {
        element.classList.replace('darken-2','lighten-3')
    })
}

const startRecording = (track) => {
    stopRecording()
    document.querySelectorAll(".recordBtn")[track].classList.replace('lighten-3','darken-2')
    records[track] = { start: Date.now(), rec: [] }
    recordingTrack = track

    recordingTimeout = setTimeout(()=>{
        stopRecording()
    },recordingTime*1000)
}


document.querySelectorAll(".recordBtn").forEach((element, num) => {
    element.addEventListener('click', () => {
        if (recordingTrack == num) {
            stopRecording()
        } else {
            startRecording(num)
        }
    })
})

document.querySelector("#stopRecord").addEventListener('click', () => {
    stopRecording()
})

document.querySelector("#playAll").addEventListener('click', () => {
    stopRecording()
    records.forEach((track) => {
        track.rec.forEach((soundObj) => {
            setTimeout(() => {
                playsound(soundObj.node)
            }, soundObj.offset)
        })
    })
})

document.querySelectorAll(".playBtn").forEach((element, num) => {
    element.addEventListener('click', () => {
        records[num].rec.forEach((soundObj) => {
            setTimeout(() => {
                playsound(soundObj.node)
            }, soundObj.offset)
        })
        console.log('dupa')
        document.querySelector('.progresBar').style.width = "100%"
        
    })
})
