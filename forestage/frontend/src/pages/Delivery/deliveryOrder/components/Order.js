import React, { useState, useEffect } from 'react'
import $ from 'jquery'

function Order(props) {
  const {
    inputText,
    setInputText,
    inputTel,
    inputAdd,
    setInputTel,
    textArea,
    setTextArea,
    orderAll,
    member,
    inputMember,
    memberId,
  } = props

  const [allAddress, setAllAddress] = useState('')
  const [memberData, setMemberData] = useState([])

  function getData() {
    $.ajax({
      url: `http://localhost:3001/delivery/member/${memberId}`,
      method: 'GET',
      dataType: 'json',
    }).then(function (result) {
      setInputTel(result[0].mobile)
      setInputText(result[0].name)
    })
  }
  useEffect(() => {
    setAllAddress(
      orderAll.address.city + orderAll.address.dist + orderAll.address.road
    )
  }, [])

  return (
    <>
      <div className="res-person">
        <div className="head">
          <h3>訂位人資料</h3>
          <button
            value={member}
            onClick={(e) => {
              getData()
            }}
          >
            同會員資料
          </button>
        </div>
        <hr />
        <div className="content">
          <div className="title">
            <span className="h4 date" type="text">
              姓名
            </span>
            <span className="h4" type="tel">
              電話
            </span>
            <span className="h4" disabled>
              地址
            </span>
            <span className="h4">備註</span>
          </div>
          <div className="detail">
            <input
              type="text"
              placeholder="請輸入姓名"
              value={inputText}
              onChange={(event) => {
                setInputText(event.target.value)
              }}
            />
            <input
              type="text"
              placeholder="請輸入電話"
              value={inputTel}
              onChange={(event) => {
                setInputTel(event.target.value)
              }}
            />
            <input
              type="text"
              className="add"
              placeholder="桃園市中壢區中央路100號"
              defaultValue={allAddress}
              disabled
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="範例: 餐點放在門口就好，謝謝"
              value={textArea}
              onChange={(event) => {
                setTextArea(event.target.value)
              }}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  )
}

export default Order
