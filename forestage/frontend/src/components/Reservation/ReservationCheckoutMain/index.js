import React, { useEffect } from 'react'
import axios from 'axios'
import ReservationContent from './Content/ReservationContent'
import DishContent from './Content/DishContent/'
import ReservationPerson from './Content/ReservationPerson'
import StyledLink from '../StyledLink'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import withReactContent from 'sweetalert2-react-content'

function Main(props) {
  const { dishList, checkList, insertResData, setInsertResData } = props
  function insertReservation() {
    axios({
      method: 'post',
      url: 'http://localhost:3001/reservation/checkout/send',
      data: {
        dishList,
        insertResData,
      },
    })
  }

  const CheckDataSwal = withReactContent(Swal)

  function fireAlert() {
    CheckDataSwal.fire({
      title: '您的訂位已送出',
      html: <h5>請至信箱收取您的訂位確認信</h5>,
      icon: 'success',
      confirmButtonText: '<a href="/member/reservation">reservation</a>',
      // buttonsStyling: false,
      didOpen: () => {},
    })
  }

  return (
    <>
      <main className="reservation-checkout">
        <div className="res-check">
          <div className="container-big">
            <div className="bread-crumb">
              <StyledLink to="history.goBack()" className="prev span">
                線上訂位
              </StyledLink>
              {'  /  '}
              <span className="active span">訂位確認</span>
            </div>
            <ReservationContent checkList={checkList} />
            <DishContent
              dishList={dishList}
              insertResData={insertResData}
              setInsertResData={setInsertResData}
              checkList={checkList}
            />
            <ReservationPerson
              insertResData={insertResData}
              setInsertResData={setInsertResData}
            />

            <div className="check">
              <span className="info-text">
                本店採現場付款，訂單送出後您將收到 E-Mail 確認信。
              </span>
              <div className="buttons">
                <StyledLink
                  to={{ pathname: '/reservation' }}
                  style={{ textDecoration: 'none' }}
                >
                  <button className="guide-button back">
                    <img
                      src="http://localhost:3000/images/reservation/res_checkout/arrow-circle-left-solid.svg"
                      alt=""
                    />
                    修改訂位
                  </button>
                </StyledLink>
                <button
                  className="pink-guide-button"
                  onClick={() => {
                    fireAlert()
                    // insertReservation()
                  }}
                >
                  確認送出
                  <img
                    src="http://localhost:3000/images/reservation/res_checkout/arrow-circle-right-solid.svg"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
export default Main