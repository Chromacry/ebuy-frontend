export const addItemToCart = (data) => {
  let cartData = []
  if (localStorage.getItem("cart") === null) {
    cartData.push(data)
    localStorage.setItem("cart", JSON.stringify(cartData));
    return
  }
  const currentCart = JSON.parse(localStorage.getItem("cart"));
  cartData = [...currentCart];
  cartData.push(data)
  localStorage.setItem("cart", JSON.stringify(cartData));
}

export const updateItemQuantityFromCart = (itemIndex, quantity) => {
  let cartData = []
  if (localStorage.getItem("cart") !== null) {
    const currentCart = JSON.parse(localStorage.getItem("cart"));
    cartData = [...currentCart];
    cartData[itemIndex].order_quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cartData));
  }
}

export const removeItemFromCart = (itemIndex) => {
  let cartData = []
  if (localStorage.getItem("cart") !== null) {
    const currentCart = JSON.parse(localStorage.getItem("cart"));
    cartData = [...currentCart];
    cartData.splice(itemIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cartData));
  }
}