export default (seconds) => {
  if (!Number.isInteger(seconds) || seconds < 0) {
    return -1;
  }

  return {
    seconds,
    tick() {
      if (this.seconds > 0) {
        return --this.seconds;
      }

      return `Таймер остановлен`;
    }
  };
};
