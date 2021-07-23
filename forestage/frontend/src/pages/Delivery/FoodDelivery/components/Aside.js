import React, { useEffect } from 'react'

function Aside(props) {
  const { dishCount, dishes, setDishes, dishList, setDishList, total } = props

  useEffect(() => {
    let newDishArr = []
    let dishArr = Object.entries(dishCount)
    dishes.forEach((dish) => {
      newDishArr = dishArr.map((v, i) => {
        if (parseInt(v[0]) === dish.dish_id) {
          v[0] = dish.name
        }
        return v
      })
    })

    setDishList(newDishArr)
  }, [dishCount])
  console.log(dishes, '123')

  return (
    <>
      <aside className="aside-list">
        <div className="menu">
          <div className="content">
            <div className="">
              <div className="title">
                <h4>目前品項</h4>
              </div>
              <ul>
                {dishList.map((v, i) => {
                  if (v[1] > 0) {
                    return (
                      <li>
                        <span>{v[0]}</span>
                        <span>{v[1]}</span>
                      </li>
                    )
                  }
                })}
                <hr />
                <li>
                  <span>免運門檻$300</span>
                </li>
                <li>
                  <span>總金額${total}</span>
                </li>
              </ul>
            </div>
          </div>
          <img
            src={'http://localhost:3000/images/delivery/FoodDelivery/menu.png'}
            alt=""
          />
          <input
            type="button"
            defaultValue="送出訂單"
            className="OrderGet"
            field=""
          />
        </div>
      </aside>
    </>
  )
}

export default Aside
