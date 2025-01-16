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
import { useEffect, useState } from "react";

const shoes = [shoe1, shoe2, shoe3, shoe4];

function App() {
  const [count, setCount] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [shoeCount, setShoeCount] = useState(0);
  const [cartItems, setCartItems] = useState({
    name: "Fall Limited Edition Sneakers",
    img: shoe1,
    price: 125.0,
    quantity: 0,
  });

  const handleCount = (type) => {
    if (type === "plus") {
      setCount(count + 1);
    } else {
      if (type === "minus" && count > 0) {
        setCount(count - 1);
      }
    }
  };

  const handleShoeCount = (type) => {
    if (type === "next") {
      setShoeCount((shoeCount + 1) % shoes.length);
    } else {
      if (type === "prev") {
        setShoeCount((shoeCount - 1 + shoes.length) % shoes.length);
      }
    }
  };

  const handleShoeChange = (index) => {
    setShoeCount(index);
  };

  const addToCart = () => {
    if (count > 0) {
      setCartItems((prev) => ({
        ...prev,
        quantity: prev.quantity + count,
      }));
    }
    setCount(0);
  };

  const removeItem = () => {
    setCartItems((prev) => ({
      ...prev,
      quantity: 0,
    }));
  };

  //Check the size screen on resize

  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setIsMobile(width < 1024);
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="mb-12 font-primary max-w-screen-xl mx-auto">
      <Nav cartItems={cartItems} removeItem={removeItem} />
      <div className="flex flex-col justify-center lg:flex-row lg:gap-32 lg:mt-20 lg:mx-10">
        <div className="relative max-w-screen-sm self-center">
          <img
            className="rounded-xl max-w-96"
            src={shoes[shoeCount]}
            alt="shoe image 1"
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
                <img
                  key={index}
                  src={shoe}
                  alt={`shoe ${index + 1} thumbnail`}
                  onClick={() => handleShoeChange(index)}
                  className={`w-20 h-20 rounded-xl cursor-pointer border-2 border-transparent hover:opacity-75 ${
                    shoeCount === index ? "border-primary opacity-50" : ""
                  }`}
                />
              ))}
            </div>
          )}
        </div>
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
            <div className="flex justify-between items-center bg-gray-200 px-4 py-3 rounded-md">
              <img
                className="cursor-pointer px-2 py-2"
                onClick={() => handleCount("minus")}
                src={minusBtn}
                alt="minus icon"
              />
              <p className="font-bold text-lg px-6">{count}</p>
              <img
                className="cursor-pointer px-2"
                onClick={() => handleCount("plus")}
                src={plusBtn}
                alt="plus icon"
              />
            </div>
            <button
              onClick={addToCart}
              className="flex items-center justify-center gap-4 bg-primary text-black font-semibold py-3 rounded-md w-full lg:w-3/5"
            >
              <img src={cart} alt="cart icon" />
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
