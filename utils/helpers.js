module.exports = {
    // date validation and format
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(
        date
      ).getDate()}/${new Date(date).getFullYear()}`;
    },
    // plural words format
    format_plural: (word, amount) => {
        // if count is greater than one
      if (amount !== 1) {
        //   return plural version of word
        return `${word}s`;
      }
  
      return word;
    },
  };