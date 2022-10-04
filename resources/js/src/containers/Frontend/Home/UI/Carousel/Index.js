import React, { Component } from 'react';
import { Carousel as BSCarousel, CarouselItem, CarouselIndicators } from 'reactstrap';

import './Carousel.scss';

export default function Carousel({ children, items, activeIndex, setActiveIndex, animating, setAnimating, selectPublicationSelector }) {
    const setInfo = () => {
        const lang = localStorage.getItem('frontend_lang');

        selectPublicationSelector(activeIndex);

        document.querySelector('.banner__text .info .title').innerHTML = items[activeIndex].title[lang];
        document.querySelector('.banner__text .info .description').innerHTML = items[activeIndex].description[lang];
        document.querySelector('.banner__text .info .read_more').innerHTML = items[activeIndex].read_more;
    }

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const onExiting = () => {
        $('.banner__text .info .title').animate({ opacity: 0 });
        $('.banner__text .info .description').animate({ opacity: 0 });
        $('.banner__text .info .read_more').animate({ opacity: 0 }, () => {
            setInfo();
            setAnimating(true);
        });
    }

    const onExited = () => {
        setAnimating(false);
        $('.banner__text .info .title').animate({ opacity: 1 });
        $('.banner__text .info .description').animate({ opacity: 1 });
        $('.banner__text .info .read_more').animate({ opacity: 1 });
    }

    const slides = items.map(item => <CarouselItem onExiting={onExiting} onExited={onExited} key={`CarouselItem-${JSON.stringify(item)}`} className="h-100">
        <div className="h-100 bg-img" style={{ backgroundImage: `url(${item.photo})` }} />
    </CarouselItem>);

    return <BSCarousel id="banner-carousel" activeIndex={activeIndex} next={next} previous={previous} ride="carousel" className="h-100 carousel-fade BannerCarousel">
        {/* <CarouselIndicators items={items} activeIndex={activeIndex} className="d-lg-flex flex-column align-items-center" onClickHandler={goToIndex} /> */}

        {slides}

        {children}
    </BSCarousel>;
}

