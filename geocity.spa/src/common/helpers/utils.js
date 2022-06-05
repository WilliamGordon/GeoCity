export const getReadableDate = (strDate) => {
  if (strDate) {
    var date = strDate.split("T")[0];
    var year = date.split("-")[0];
    var month = date.split("-")[1];
    var day = date.split("-")[2];
    return `${day}/${month}/${year}`;
  }
};

export const getReadableTime = (strDate) => {
  if (strDate) {
    var Time = strDate.split("T")[1];
    var hours = Time.split(":")[0];
    var minutes = Time.split(":")[1];
    return `${hours}:${minutes}`;
  }
};
