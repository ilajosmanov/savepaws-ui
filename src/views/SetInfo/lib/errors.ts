function getErrorMessage(rule: string) {
  switch (rule) {
    case 'required': {
      return 'Це поле є обов\'язковим';
    }
    default: {
      return null;
    }
  }
}

export {
  getErrorMessage,
};
