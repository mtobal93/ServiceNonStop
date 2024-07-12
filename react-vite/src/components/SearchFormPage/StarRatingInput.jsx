import { useState, useEffect } from "react";

const StarRatingInput = ({ stars, onChange, reset }) => {

  const [activeRating, setActiveRating] = useState(stars)


  useEffect(() => {
    setActiveRating(stars); // Reset active rating when stars prop changes
  }, [stars, reset]);


  const handleStarClick = (starOrder) => {
    const newRating = starOrder === activeRating ? null : starOrder;
    setActiveRating(newRating);
    onChange(newRating);
  };



  return (
    <>
      <div className="rating-input">
        <div className="starsSearch">
          {[1, 2, 3, 4, 5].map((starOrder) => (
            <span
              key={starOrder}
              className={activeRating >= starOrder ? "paws-filled" : "paws-unfilled"}
              onClick={() => handleStarClick(starOrder)}
            >
              <i className="fa-solid fa-hammer" />&nbsp;
            </span>
          ))}
        </div>
        {activeRating !== 0 && (

          <div className="rating-paw-text">&nbsp;
            {activeRating && activeRating > 1 && activeRating < 5 &&
              <span>&nbsp;{activeRating}&nbsp;Hammers&nbsp;&&nbsp;Up</span>
            }
            {activeRating && activeRating === 1 &&
              <span>&nbsp;{activeRating}&nbsp;Hammer&nbsp;&&nbsp;Up</span>
            }
            {activeRating && activeRating === 5 &&
              <span>&nbsp;{activeRating}&nbsp;Hammers</span>
            }
          </div>
        )}
      </div>
    </>
  )
}

export default StarRatingInput;
