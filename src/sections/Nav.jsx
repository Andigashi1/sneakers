import { useState } from "react";
import PropTypes from "prop-types";
import menu from "../assets/images/icon-menu.svg";
import close from "../assets/images/icon-close.svg";
import logo from "../assets/images/logo.svg";
import cart from "../assets/images/icon-cart.svg";
import avatar from "../assets/images/image-avatar.png";
import trash from "../assets/images/icon-delete.svg";

function Nav({ cartItems, removeItem, menuOpen, toggleMenu }) {
  
  const [cartOpen, setCartOpen] = useState(false);

  //Open and close the cart

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <div className="mx-2 lg:mx-4 lg:border-b-[1px] border-gray2 lg:pb-8 lg:pt-2">
      <div className="flex justify-between p-6 lg:pb-0 lg:px-0 [&>*]:flex [&>*]:justify-center [&>*]:items-center [&>*]:space-x-6">
        <div className="flex gap-4">
          <button onClick={toggleMenu} className="lg:hidden">
            <img src={menu} alt="open menu" />
          </button>
          <img src={logo} className="mb-1" alt="logo" />
          <ul className="hidden lg:flex [&>*]:text-gray1 space-x-6 lgnav">
            <li>
              <a href="#collections">Collections</a>
            </li>
            <li>
              <a href="#men">Men</a>
            </li>
            <li>
              <a href="#women">Women</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        <div>
          <img
            className="cursor-pointer hover:brightness-0"
            src={cart}
            onClick={toggleCart}
            alt="cart logo"
          />
          <img
            src={avatar}
            className="w-8 lg:w-12 border-2 border-transparent hover:border-primary rounded-full cursor-pointer"
            alt="avatar"
          />
        </div>
      </div>

      {/* Links on mobile view */}

      {menuOpen && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-65 z-50 lg:hidden"></div>
          <div className="fixed top-0 left-0 w-72 h-full bg-white z-50 pt-7 px-8 lg:hidden">
            <button onClick={toggleMenu}>
              <img src={close} alt="close menu" />
            </button>
            <ul className="space-y-6 mt-12">
              <li>
                <a href="#collections" className="text-lg font-semibold">
                  Collections
                </a>
              </li>
              <li>
                <a href="#men" className="text-lg font-semibold">
                  Men
                </a>
              </li>
              <li>
                <a href="#women" className="text-lg font-semibold">
                  Women
                </a>
              </li>
              <li>
                <a href="#about" className="text-lg font-semibold">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-lg font-semibold">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </>
      )}

      {/* Cart */}

      {cartOpen && (
        <div
          className="absolute top-[5.4rem] left-1/2 -translate-x-1/2 max-w-[22rem] w-full bg-white z-10 py-6 rounded-lg
        lg:right-10 lg:top-24 lg:left-auto lg:translate-x-0 shadow-2xl"
        >
          <p className="font-bold pb-4 px-4 border-b-[1px] border-gray2">
            Cart
          </p>
          {cartItems.quantity > 0 ? (
            <div className="px-4">
              <div className="flex justify-between items-center mt-4">
                <img
                  className="w-12 h-12 rounded-md"
                  src={cartItems.img}
                  alt="shoe image"
                />
                <div className="space-y-1 text-gray1">
                  <p>{cartItems.name}</p>
                  <p>
                    ${cartItems.price} x {cartItems.quantity}{" "}
                    <span className="font-bold text-black">
                      ${cartItems.price * cartItems.quantity}
                    </span>
                  </p>
                </div>
                <img
                  className="hover:cursor-pointer"
                  onClick={removeItem}
                  src={trash}
                  alt="trash"
                />
              </div>

              <button className="bg-primary w-full rounded-lg py-3 mt-6 font-bold">
                Checkout
              </button>
            </div>
          ) : (
            <p className="text-center text-gray1 py-10">Cart is empty</p>
          )}
        </div>
      )}
    </div>
  );
}

Nav.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  cartItems: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  removeItem: PropTypes.func.isRequired,
}

export default Nav;
