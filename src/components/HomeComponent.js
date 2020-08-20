import React, { useState } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption} from 'reactstrap';
import { Loading } from './LoadingComponent';

  
const Slider = ({items, isLoading, errMess}) => {
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
  
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
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }
    
    if(isLoading){
        return(
                <Loading />
        );
    }
    else if(errMess) {
        return(
             <h4>{errMess}</h4>
        );
    }
    else if(items != null)
    { 
        const slides = items.map((item) => {
            return (
              <CarouselItem key={item._id} className="custom-tag" onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)}>
                <img src={item.image} alt={item.title} />
                <CarouselCaption className="bg-header" captionText={item.description} captionHeader={item.title} />
              </CarouselItem>
            );
          });
        return (
        <div> 
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
      </div>
    );}
    else if(items == null){
        return(
            <div>
                <h2>We are really sorry, Something happen worng</h2>
            </div>
        );
    }

  }

function RenderCard({item, isLoading, errMess}) {
    if(isLoading){
        return(
                <Loading />
        );
    }
    else if(errMess) {
        return(
             <h4>{errMess}</h4>
        );
    }
    else if(item != null){
        return(
            <Card>
                <CardImg src={ item.image } alt={item.name} />
                <CardBody>
                <CardTitle>{item.title}</CardTitle>
                {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                {<CardText>{item.description}</CardText>}
                </CardBody>
            </Card>
        );
    }
    else if(item == null){
        return(
            <div>
                <h2>We are really sorry, Something happen worng</h2>
            </div>
        );
    }
}

function Home(props) {
    
    return(
        <div className="container">
            <div className="col-12">
                    <Slider items={props.blogstopicsSlider} isLoading={props.blogstopicsLoadingSlider} errMess={props.blogstopicsErrMessSlider}/>
                </div>
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.blogstopics} isLoading={props.blogstopicsLoading} errMess={props.blogstopicsErrMess}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} isLoading={props.promoLoading} errMess={props.promoErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} isLoading={props.leaderLoading} errMess={props.leaderErrMess} />
                </div>
            </div>
        </div>
        
    );
}

export default Home;