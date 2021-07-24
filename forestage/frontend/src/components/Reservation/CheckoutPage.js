import React, { useEffect, useState } from 'react'
import Header from '../Header/'
import Hero from './ReservationCheckoutMain/Hero'
import Main from './ReservationCheckoutMain/'
import '../../styles/reservation/res_checkout/res_check.scss'

// import Footer from '../../components/Footer'

function CheckoutPage(props) {
  // const { checkList, setCheckList, test } = props
  const [dishList, setDishList] = useState([])
  const [checkList, setCheckList] = useState({})
  const [insertResData, setInsertResData] = useState({
    date: '',
    seat_id: 0,
    attendance: 0,
    name: '',
    mobile: '',
    total: 0,
    note: '',
    member_id: 1,
    mcm_id: 0,
    status: '未完成',
  })
  useEffect(() => {
    setDishList(props.location.state.dishList)
    setCheckList(props.location.state.checkList)
  }, [])
  useEffect(() => {
    // 將訂位頁資料帶入insert物件中
    let newInsertResData = { ...insertResData }
    newInsertResData.date = checkList.chosenDate
    newInsertResData.seat_id = checkList.seatId
    newInsertResData.attendance = checkList.attendance
    newInsertResData.total = checkList.total
    setInsertResData(newInsertResData)
  }, [checkList])
  
  return (
    <>
      <Header />
      <Hero />
      <Main
        dishList={dishList}
        checkList={checkList}
        insertResData={insertResData}
        setInsertResData={setInsertResData}
      />
      {/* <Footer /> */}
    </>
  )
}

export default CheckoutPage
