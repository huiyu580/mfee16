import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import axios from 'axios'

function HistoryCoupon(props) {
  const { memberId, setContentIsLoaded } = props
  const isDesktopOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [coupons, setCoupons] = useState([
    {
      name: '',
      deadline: '',
      minimumOrderValue: '',
      discount: '',
      fontAwesome: '',
    },
  ])

  // 取得已使用(歷史)的折價券資料
  const fetchHistoryCoupons = async () => {
    const response = await axios.get(
      `http://localhost:3001/member/coupon/history/${memberId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json, charset=utf-8',
        },
      }
    )

    const data = response.data.data

    // 將取得的資料轉換成 coupons 狀態用的格式
    let couponsFromServer = []
    data.map((v, i) => {
      couponsFromServer.push({
        name: v.name,
        deadline: v.deadline,
        minimumOrderValue: v.minimum_order_value,
        discount: v.discount,
        fontAwesome: v.font_awesome,
      })
    })

    return couponsFromServer
  }

  useEffect(() => {
    // 取得後端資料
    const fetchData = async () => {
      // 取得已使用(歷史)的折價券資料
      const historyCoupons = await fetchHistoryCoupons()
      // console.log('didUpdate history coupons:', historyCoupons)

      setCoupons(historyCoupons)
      setContentIsLoaded(true)
    }

    fetchData()
  }, [])

  // 每列的 div 的 DOM
  const couponsRowDom = () => {
    let dom = []

    for (let i = 0; i < coupons.length; i++) {
      i % 2 === 0 &&
        dom.push(
          <div className="coupon-row" key={i}>
            {couponsBoxDom(i)}
          </div>
        )
    }

    return dom
  }

  // 每張 coupon 的 DOM
  const couponsBoxDom = (i) => {
    let dom = []

    for (let j = i; j < i + 2; j++) {
      coupons[j] !== undefined
        ? dom.push(
            <div className="coupon-box" key={j}>
              <div className="coupon-left">
                <i className={coupons[j].fontAwesome}></i>
              </div>
              <div className="coupon-middle"></div>
              <div className="coupon-right">
                <div className="msg-box">
                  <h4 className="title">{coupons[j].name}</h4>
                  <div className="sub-title">
                    <p>使用期限 {coupons[j].deadline}</p>
                    <p>低消金額 {coupons[j].minimumOrderValue} 元</p>
                  </div>
                </div>
                <h3 className="discount">-{coupons[j].discount} 元</h3>
                <div className="hole"></div>
              </div>
            </div>
          )
        : dom.push(
            <div className="coupon-box empty" key={j}>
              <div className="coupon-left"></div>
              <div className="coupon-middle empty"></div>
              <div className="coupon-right">
                <div className="hole"></div>
              </div>
            </div>
          )
    }

    return dom
  }

  // 手機版折價券 DOM
  const couponsMdDom = () => {
    return (
      <>
        <div className="history-content-md">
          {coupons.map((coupon, i) => {
            return (
              <div className="coupon-row" key={i}>
                <div className="coupon-box">
                  <div className="coupon-left">
                    <i className={coupon.fontAwesome}></i>
                  </div>
                  <div className="coupon-middle"></div>
                  <div className="coupon-right">
                    <div className="msg-box">
                      <h4 className="title">{coupon.name}</h4>
                      <div className="sub-title">
                        <p>使用期限 {coupon.deadline}</p>
                        <p>低消金額 {coupon.minimumOrderValue} 元</p>
                      </div>
                    </div>
                    <h3 className="discount">-{coupon.discount} 元</h3>
                    <div className="hole"></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </>
    )
  }

  return (
    <>
      {/* ? 手機版折價券 : 電腦版折價券  */}
      {isDesktopOrMobile ? (
        couponsMdDom()
      ) : (
        <div className="history-content">
          <div className="content-container">{couponsRowDom()}</div>
        </div>
      )}
    </>
  )
}

export default HistoryCoupon