window.addEventListener("load", onReady);

function onReady () {
    const swimDuration = 10;
    const fadeOutDuration = 2;

    const wrap = createWrap();
    const images = createImages();

    images.forEach(image => wrap.append(image));
    document.querySelector('.slider').append(wrap);

    let indexCurrentSlide = 0;
    run();

    function createWrap() {
        const wrap = document.createElement('div');
        wrap.classList.add('wrap');
        wrap.setAttribute('style', `--swim-duration: ${swimDuration}s; --fade-out-duration: ${fadeOutDuration}s`);
        return wrap;
    }

    function createImages() {
        const imagesSrc = ['photo_01.jpg', 'photo_02.jpg', 'photo_03.jpg']
        return imagesSrc.map(src => {
            const image = document.createElement('img');
            const pathToImagesDir = './assets/images/';
            image.setAttribute('src', pathToImagesDir + src);
            image.classList.add('image');
            return image;
        });
    }

    function run() {
        images[indexCurrentSlide].classList.add('image--visible');
        const prevImage = images[indexCurrentSlide];
        setTimeout(() => {
            indexCurrentSlide = indexCurrentSlide === images.length - 1 ? 0 : indexCurrentSlide + 1;
            prevImage.classList.add('image--fade-out');
            run();
        }, (swimDuration - fadeOutDuration) * 1000);
        prevImage.addEventListener('animationend', () => {
            prevImage.classList.remove('image--visible');
            prevImage.classList.remove('image--fade-out');
        }, { once: true });
    }
}
