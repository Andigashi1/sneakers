import Nav from "./sections/Nav";
import shoe1 from "./assets/images/image-product-1.jpg";
import shoe2 from "./assets/images/image-product-2.jpg";
import shoe3 from "./assets/images/image-product-3.jpg";
import shoe4 from "./assets/images/image-product-4.jpg";
import nextBtn from "./assets/images/icon-next.svg";
import prevBtn from "./assets/images/icon-previous.svg";
import minusBtn from "./assets/images/icon-minus.svg";
import plusBtn from "./assets/images/icon-plus.svg";
import cart from "./assets/images/icon-cart.svg";
import close from "./assets/images/icon-close.svg";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const shoes = [shoe1, shoe2, shoe3, shoe4];

function App() {
  const [count, setCount] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shoeCount, setShoeCount] = useState(0);
  const [lightBox, setLightBox] = useState(false);
  const [cartItems, setCartItems] = useState({
    name: "Fall Limited Edition Sneakers",
    img: shoe1,
    price: 125.0,
    quantity: 0,
  });

  //Open and close the menu on mobile view

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  //Change the quantity of the item

  const handleCount = (type) => {
    if (type === "plus") {
      setCount(count + 1);
    } else {
      if (type === "minus" && count > 0) {
        setCount(count - 1);
      }
    }
  };

  //Change shoe image

  const handleShoeCount = (type) => {
    if (type === "next") {
      setShoeCount((shoeCount + 1) % shoes.length);
    } else {
      if (type === "prev") {
        setShoeCount((shoeCount - 1 + shoes.length) % shoes.length);
      }
    }
  };

  //Change shoe image on thumbnail click

  const handleShoeChange = (index) => {
    setShoeCount(index);
  };

  //Add items to cart

  const addToCart = () => {
    if (count > 0) {
      setCartItems((prev) => ({
        ...prev,
        quantity: prev.quantity + count,
      }));
    }
    setCount(0);
  };

  //Remove items from cart

  const removeItem = () => {
    setCartItems((prev) => ({
      ...prev,
      quantity: 0,
    }));
  };

  //Open and close the lightbox

  const toggleLightBox = () => {
    !isMobile ? setLightBox(!lightBox) : null;
  };

  //Check the size screen on resize

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1024);
    };

    window.addEventListener("resize", handleResize);
    isMobile ? setLightBox(false) : null; //Close the lightbox on mobile view
    !isMobile && menuOpen ? setMenuOpen(false) : null;

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile, menuOpen]);

  return (
    <div className="mb-12 font-primary max-w-screen-xl mx-auto flex flex-col justify-center min-h-full">
      <Nav
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        cartItems={cartItems}
        removeItem={removeItem}
      />
      <div className="flex flex-col justify-center lg:flex-row lg:gap-28 lg:mt-20 lg:mx-10">
        {/* LightBox */}

        {lightBox && (
          <div className="absolute inset-0 z-10 bg-black/75 flex justify-center items-center">
            <div className="relative max-w-md flex flex-col">
              <img
                className="w-6 mb-4 self-end cursor-pointer icon"
                src={close}
                onClick={toggleLightBox}
                alt="close button"
              />
              <img
                className="rounded-xl"
                src={shoes[shoeCount]}
                alt={`shoe ${shoeCount + 1}`}
              />

              <span className="w-12 h-12 p-4 absolute right-0 translate-x-1/2 top-64 cursor-pointer bg-white rounded-full flex justify-center items-center">
                <img
                  onClick={() => handleShoeCount("next")}
                  src={nextBtn}
                  className="icon"
                  alt="previous image button"
                />
              </span>
              <span className="w-12 h-12 p-4 absolute left-0 -translate-x-1/2 cursor-pointer top-64 bg-white rounded-full">
                <img
                  onClick={() => handleShoeCount("prev")}
                  src={prevBtn}
                  className="icon"
                  alt="previous image button"
                />
              </span>

              <div className="flex justify-between mt-6 mx-8">
                {shoes.map((shoe, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 rounded-[0.86rem] cursor-pointer border-2 ${
                      shoeCount === index
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={shoe}
                        alt={`shoe ${index + 1} thumbnail`}
                        onClick={() => handleShoeChange(index)}
                        className="w-full h-full rounded-xl"
                      />
                      <div
                        className={`absolute inset-0 rounded-xl transition-colors cursor-pointer hover:bg-white/25 ${
                          shoeCount === index ? "bg-white/50" : ""
                        }`}
                        onClick={() => handleShoeChange(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Images */}

        <div className="relative max-w-screen-sm self-center">
          <img
            onClick={() => toggleLightBox()}
            className={`lg:rounded-xl lg:max-w-96 ${
              !isMobile ? "cursor-pointer" : ""
            }`}
            src={shoes[shoeCount]}
            alt={`shoe ${shoeCount + 1}`}
          />
          {isMobile ? (
            <>
              <img
                onClick={() => handleShoeCount("next")}
                src={nextBtn}
                className="p-3 w-10 h-10 absolute right-6 top-1/2 bg-white rounded-full cursor-pointer"
                alt="next image button"
              />
              <img
                onClick={() => handleShoeCount("prev")}
                src={prevBtn}
                className="p-3 w-10 h-10 absolute left-6 top-1/2 bg-white rounded-full cursor-pointer"
                alt="previous image button"
              />
            </>
          ) : (
            <div className="flex justify-between mt-6">
              {shoes.map((shoe, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 rounded-[0.86rem] cursor-pointer border-2 ${
                    shoeCount === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={shoe}
                    alt={`shoe ${index + 1} thumbnail`}
                    onClick={() => handleShoeChange(index)}
                    className={`w-full h-full rounded-xl hover:opacity-75 ${
                      shoeCount === index ? "opacity-50" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}

        <div className="mx-8 mt-6 lg:m-0 space-y-4 max-w-screen-sm lg:max-w-md self-center">
          <p className="uppercase font-semibold text-sm text-gray1 tracking-widest">
            Sneaker Company
          </p>
          <h1 className="text-3xl lg:text-4xl lg:pb-4 font-bold">
            Fall Limited Edition Sneakers
          </h1>
          <p className="text-gray1 tracking-wide">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they&apos;ll withstand
            everything the weather can offer.
          </p>
          <div className="flex justify-between lg:flex-col items-center lg:items-start lg:gap-3">
            <div className="flex space-x-6 items-center">
              <p className="text-3xl font-bold font-primary">$125.00</p>
              <p className="text-white bg-black px-2 rounded-md">50%</p>
            </div>
            <p className="text-gray-600 font-semibold line-through">$250.00</p>
          </div>

          <div className="max-lg:space-y-4 lg:flex lg:gap-4">
            <div className="flex justify-between items-center bg-gray-200 shadow-xl px-4 py-3 rounded-md">
              <img
                className="cursor-pointer px-2 py-2 hover:opacity-50 transition"
                onClick={() => handleCount("minus")}
                src={minusBtn}
                alt="minus icon"
              />
              <p className="font-bold text-lg px-6">{count}</p>
              <img
                className="cursor-pointer px-2 hover:opacity-50 transition"
                onClick={() => handleCount("plus")}
                src={plusBtn}
                alt="plus icon"
              />
            </div>
            <button
              onClick={addToCart}
              className="flex items-center justify-center gap-4 bg-primary text-black hover:bg-primary/50 
              shadow-lg shadow-primary hover:shadow-transparent transition font-semibold py-3 rounded-md w-full lg:w-3/5"
            >
              <img className="brightness-0" src={cart} alt="cart icon" />
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

App.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  cartItems: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default App;
