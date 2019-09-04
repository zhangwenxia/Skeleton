export default {
  joinStr: str => str + "px",
  getWidthAndHeight: obj => {
    let height = "";
    let width = "";
    if (typeof obj === "object" && obj) {
      width = obj.width ? obj.width : "";
      height = obj.height ? obj.height : "";
    }
    return {
      width,
      height
    };
  }
};