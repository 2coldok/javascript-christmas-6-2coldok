
export const choiceValidator = (str) => {
  if (str !== '1' && str !== '2' && str !== '3' && str !== 'Q') {
    throw new Error('[ERROR] 초이스 오류');
  }
};

const DATA_BACKEND = [
  '백엔드, 레벨1, 자동차경주',
  '백엔드, 레벨1, 로또',
  '백엔드, 레벨1, 숫자야구게임',
  '백엔드, 레벨2, 장바구니',
  '백엔드, 레벨2, 결제',
  '백엔드, 레벨2, 지하철노선도',
  '백엔드, 레벨4, 성능개선',
  '백엔드, 레벨4, 배포',
];

const DATA_FRONTEND = [
  '프론트엔드, 레벨1, 자동차경주',
  '프론트엔드, 레벨1, 로또',
  '프론트엔드, 레벨1, 숫자야구게임',
  '프론트엔드, 레벨2, 장바구니',
  '프론트엔드, 레벨2, 결제',
  '프론트엔드, 레벨2, 지하철노선도',
  '프론트엔드, 레벨4, 성능개선',
  '프론트엔드, 레벨4, 배포',
];

export const dataValidator = (data) => {
  if (!DATA_BACKEND.includes(data) && !DATA_FRONTEND.includes(data)) {
    throw new Error('[ERROR] 데이터 입력 오류.');
  }
};

export const YesOrNoValidator = (answer) => {
  if (answer !== '네' && answer !== '아니오') {
    throw new Error('[ERROR] 네 또는 아니오만 입력해주세요');
  }
};



