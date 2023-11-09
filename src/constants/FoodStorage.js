export const APPETIZER = Object.freeze({
  '양송이수프' : 6000,
  '타파스' : 5500,
  '시저샐러드' : 8000,
  'type' : 'appetizer',
});

export const MAIN = Object.freeze({
  '티본스테이크' : 55000,
  '바비큐립' : 54000,
  '해산물파스타' : 35000,
  '크리스마스파스타' : 25000,
  'type' : 'main',
});

export const DESERT = Object.freeze({
  '초코케이크' : 15000,
  '아이스크림' : 5000,
  'type' : 'desert',
});

export const DRINK = Object.freeze({
  '제로콜라' : 3000,
  '레드와인' : 60000,
  '샴페인' : 25000,
  'type' : 'drink',
});

export const MENU = [APPETIZER, MAIN, DESERT, DRINK];

export const NAME = Object.freeze({
  type : 'type',
  appetizer : 'appetizer',
  main : 'main',
  desert : 'desert',
  drink : 'drink',
})

export const REGEX = Object.freeze({
  notNumber : /[^0-9]/g,
  notHangle : /[^ㄱ-ㅎ가-힣]/g,
});