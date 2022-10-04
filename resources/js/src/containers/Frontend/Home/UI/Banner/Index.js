import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Carousel from '../Carousel';

export default function Banner({ banner_publications = [] }) {
    const [animating, setAnimating] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activePublicationSelectorIndex, setActivePublicationSelectorIndex] = useState(0);

    const lang = localStorage.getItem('frontend_lang');

    const goToIndex = index => {
        setActiveIndex(index);
    }

    const selectPublicationSelector = index => {
        if (animating) return;
        goToIndex(index);
        setActivePublicationSelectorIndex(index);
    }

    return <div className='banner'>
        <div className="banner__container">
            <div className="banner__text container">
                {banner_publications.length > 0 && <div className='row'>
                    <div className='col-md-8 col-lg-7 col-xl-6 info'>
                        <div className='title' dangerouslySetInnerHTML={{ __html: banner_publications[0].title[lang] }} />
                        <div className='description' dangerouslySetInnerHTML={{ __html: banner_publications[0].description[lang] }} />
                        <Link to={banner_publications[0].link} className={`read_more btn btn-${window.APP_SECONDARY_COLOR}`}>{banner_publications[0].read_more}</Link>
                    </div>

                    <div className='col-md-4 col-lg-3 selectors'>
                        {banner_publications.map((item, index) => <div key={`publication-selector-${JSON.stringify(item)}`} onClick={() => selectPublicationSelector(index)} className={`publication-selector${activePublicationSelectorIndex === index ? ' active' : ''}`}>
                            <div className='subjects'>{item.category[lang] + (item.subjects.length > 0 ? ', ' : '')}{item.subjects.map(subject => subject.name[lang]).join(', ')}</div>

                            <div className='title'>{item.title[lang]}</div>

                            <div className="dot" />
                        </div>)}
                    </div>
                </div>}
            </div>
        </div>

        <Carousel items={banner_publications} activeIndex={activeIndex} setActiveIndex={setActiveIndex} animating={animating} setAnimating={setAnimating} selectPublicationSelector={selectPublicationSelector} />
    </div>;
}