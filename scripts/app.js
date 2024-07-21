const $circle = document.querySelector('#circle')
const $score = document.querySelector('#score')


function start() {
    setScore(getScore())
    setImage()
}

function setScore(score) {
    localStorage.setItem('score', score)
    $score.textContent = score
}

function setImage() {
    const scoreReward = [
        { score: 250, image: 'assets/planets/planet01.png' },
        { score: 500, image: 'assets/planets/planet02.png' },
        { score: 1000, image: 'assets/planets/planet03.png' },
        { score: 2000, image: 'assets/planets/planet04.png' },
        { score: 4000, image: 'assets/planets/planet05.png' },
        { score: 16000, image: 'assets/planets/planet06.png' },
        { score: 32000, image: 'assets/planets/planet07.png' },
        { score: 64000, image: 'assets/planets/planet08.png' },
        { score: 100000, image: 'assets/planets/planet09.png' }
    ];

    const currentScore = getScore();
    for (let i = scoreReward.length - 1; i >= 0; i--) {
        if (currentScore >= scoreReward[i].score) {
            $circle.setAttribute('src', scoreReward[i].image);
            break;
        }
    }
}

function getScore() {
    return Number(localStorage.getItem('score') ?? 0)
}

function addOne() {
    setScore(getScore() + 1)
    setImage()
}

$circle.addEventListener('click', (event) => {
    const rect = $circle.getBoundingClientRect()

    const offsetX = event.clientX - rect.left - rect.width / 2
    const offsetY = event.clientY - rect.top - rect.height / 2

    const DEG = 30

    const tiltX = (offsetY / rect.height) * DEG
    const tiltY = (offsetX / rect.width) * -DEG

    $circle.style.setProperty('--tiltX', `${tiltX}deg`)
    $circle.style.setProperty('--tiltY', `${tiltY}deg`)

    setTimeout(() => {
        $circle.style.setProperty('--tiltX', `0deg`)
        $circle.style.setProperty('--tiltY', `0deg`)
    }, 300)

    const plusOne = document.createElement('div')
    plusOne.classList.add('plus-one')
    plusOne.textContent = '1'
    plusOne.style.left = `${event.clientX - rect.left}px`
    plusOne.style.top = `${event.clientY - rect.top}px`


    $circle.parentElement.appendChild(plusOne)

    addOne()

    setTimeout(() => {
        plusOne.remove()
    }, 2000)
})

start()