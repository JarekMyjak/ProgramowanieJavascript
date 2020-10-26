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
let recordingTrack = null;

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


document.querySelectorAll(".recordBtn").forEach((element, num) => {
    element.addEventListener('click', () => {
        if (recordingTrack == num) {
            recordingTrack = null
        } else {
            recordedStartTime = Date.now();
            records[num] = { start: Date.now(), rec: [] }
            recordingTrack = num
        }
    })
})

document.querySelector("#stopRecord").addEventListener('click', () => {
    recordingTrack = null
})

document.querySelector("#playAll").addEventListener('click', () => {
    recordingTrack = null
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
    })
})