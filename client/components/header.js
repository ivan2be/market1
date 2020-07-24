import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateCurrentCurrensy,
  setSortStatus,
  getTotalAmount,
  getTotalItemsInCart
} from '../redux/reducers/infobase'

const Header = () => {
  const cart = useSelector((store) => store.infobase.cart)
  const items = useSelector((store) => store.infobase.items)
  const currency = useSelector((store) => store.infobase.currency)
  const exchangeRate = useSelector((store) => store.infobase.exchangeRate)
  const sortStatus = useSelector((store) => store.infobase.sortStatus)

  const dispatch = useDispatch()

  return (
    <nav className="bg-blue-700 p-4">
      <div className="flex items-center flex-row flex-no-wrap justify-between">
        <Link id="brand-name" to="/" className="italic text-3xl font-bold text-white">
          Online-store
        </Link>
        <div className="flex text-lg text-white flex-row">
          {['Price', 'A-Z'].map((it) => {
            return (
              <button
                key={it}
                id="sort-price"
                type="button"
                className={`flex p-1 px-2 ${sortStatus === it ? 'underline' : ''}`}
                onClick={() => dispatch(setSortStatus(it))}
              >
                {it}
              </button>
            )
          })}
        </div>
        <div className="flex text-lg text-white flex-row">
          {['EUR', 'CAD', 'USD'].map((it) => {
            return (
              <button
                key={it}
                type="button"
                className={`flex p-1 px-2 ${currency === it ? 'underline' : ''}`}
                onClick={() => dispatch(updateCurrentCurrensy(it))}
              >
                {it}
              </button>
            )
          })}
        </div>
        <div className="flex flex-end text-white flex-row content-center">
          <Link id="order-count" to="/basket">
            <img alt="cart" src="images/cart.png" />
          </Link>
          <div className="flex flex-col content-center px-2">
            <div className="flex justify-center">
              {getTotalAmount(cart, items, currency, exchangeRate)}
            </div>
            <div className="flex justify-center">
              {getTotalItemsInCart(cart) <= 1
                ? `${getTotalItemsInCart(cart)} item`
                : `${getTotalItemsInCart(cart)} items`}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default React.memo(Header)
