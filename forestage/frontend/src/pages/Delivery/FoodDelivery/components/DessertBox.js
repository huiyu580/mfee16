import React, { useState, useEffect } from 'react'

function DessertBox(props) {
  const { name, price, image_realistic } = props
  return (
    <>
      <div className="DessertBox">
        <figure className="sub-border">
          <img src={image_realistic} alt="" className="sub" />
        </figure>
        <form id="myform" method="POST" action="#/" className="button-group">
          <input type="button" value="" className="minus" field="quantity" />
          <input type="text" name="quantity" value="0" className="num" />
          <input type="button" value="" className="plus" field="quantity" />
        </form>
        <p className="food">{name}</p>
        <p className="food">{price}</p>
      </div>
    </>
  )
}

export default DessertBox
