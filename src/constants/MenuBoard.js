const APPETIZER = Object.freeze({
  양송이수프 : 6000,
  타파스 : 5500,
  시저샐러드 : 8000,
});

const MAIN = Object.freeze({
  티본스테이크 : 55000,
  바비큐립 : 54000,
  해산물파스타 : 35000,
  크리스마스파스타 : 25000,
});

const DESERT = Object.freeze({
  초코케이크 : 15000,
  아이스크림 : 5000,
});

const DRINK = Object.freeze({
  제로콜라 : 3000,
  레드와인 : 60000,
  샴페인 : 25000,
});



export const MENU = new Map()
.set(0, APPETIZER)
.set(1, MAIN)
.set(2, DESERT)
.set(3, DRINK);

export const TYPE = new Map()
.set(0, 'appetizer')
.set(1, 'main')
.set(2, 'desert')
.set(3, 'drink');
