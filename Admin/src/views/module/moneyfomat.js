
import React from 'react';

const moneyfomat = (money) => {
  var formatter = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  }).format(money);

  return formatter;
};

export default moneyfomat;
