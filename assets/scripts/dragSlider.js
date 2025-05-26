let reviewCurrentSlide = 0;

function updateReviewSlidePosition() {
    const reviewSlider = document.querySelector('.review-slider');
    reviewSlider.style.transform = `translateX(${-reviewCurrentSlide * 100}%)`;
}

function reviewPrevSlide() {
    const totalSlides = document.querySelectorAll('.review-slide').length;
    reviewCurrentSlide = (reviewCurrentSlide > 0) ? reviewCurrentSlide - 1 : totalSlides - 1;
    updateReviewSlidePosition();
}

function reviewNextSlide() {
    const totalSlides = document.querySelectorAll('.review-slide').length;
    reviewCurrentSlide = (reviewCurrentSlide < totalSlides - 1) ? reviewCurrentSlide + 1 : 0;
    updateReviewSlidePosition();
}

let isReviewDragging = false;
let reviewStartPos = 0;
let reviewCurrentTranslate = 0;
let reviewPrevTranslate = 0;

document.querySelectorAll('.review-slide').forEach((slide, index) => {
    const reviewTouchStart = (e) => {
        isReviewDragging = true;
        reviewStartPos = getReviewPositionX(e);
        reviewCurrentSlide = index;
    };

    const reviewTouchMove = (e) => {
        if (!isReviewDragging) return;
        const currentPosition = getReviewPositionX(e);
        reviewCurrentTranslate = reviewPrevTranslate + currentPosition - reviewStartPos;
        document.querySelector('.review-slider').style.transform = `translateX(${reviewCurrentTranslate}px)`;
    };

    const reviewTouchEnd = () => {
        isReviewDragging = false;
        const movedBy = reviewCurrentTranslate - reviewPrevTranslate;
        if (movedBy < -100 && reviewCurrentSlide < document.querySelectorAll('.review-slide').length - 1) {
            reviewNextSlide();
        } else if (movedBy > 100 && reviewCurrentSlide > 0) {
            reviewPrevSlide();
        } else {
            updateReviewSlidePosition();
        }
        reviewPrevTranslate = reviewCurrentTranslate;
    };

    slide.addEventListener('mousedown', reviewTouchStart);
    slide.addEventListener('mousemove', reviewTouchMove);
    slide.addEventListener('mouseup', reviewTouchEnd);
    slide.addEventListener('mouseleave', reviewTouchEnd);
    slide.addEventListener('touchstart', reviewTouchStart);
    slide.addEventListener('touchmove', reviewTouchMove);
    slide.addEventListener('touchend', reviewTouchEnd);
});

function getReviewPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}
