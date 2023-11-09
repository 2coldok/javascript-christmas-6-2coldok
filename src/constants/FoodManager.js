export const APPETIZER = Object.freeze({
  '양송이수프' : 6000,
  '타파스' : 5500,
  '시저샐러드' : 8000,
  'flag' : 'appetizer',
});

export const MAIN = Object.freeze({
  '티본스테이크' : 55000,
  '바비큐립' : 54000,
  '해산물파스타' : 35000,
  '크리스마스파스타' : 25000,
  'flag' : 'main',
});

export const DESERT = Object.freeze({
  '초코케이크' : 15000,
  '아이스크림' : 5000,
  'flag' : 'desert',
});

export const DRINK = Object.freeze({
  '제로콜라' : 3000,
  '레드와인' : 60000,
  '샴페인' : 25000,
  'flag' : 'drink',
});

const array = [APPETIZER, MAIN, DESERT, DRINK];

function find(food) {
  const result = array.filter((type) => {
    const map = new Map(Object.entries(type));

    return map.has(food);
  })

  return result[0]['flag'];
}

const a = find('크리스마스파스타');
console.log(a);




export const REGEX = Object.freeze({
  notNumber : /[^0-9]/g,
});