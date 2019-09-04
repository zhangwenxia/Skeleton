import util from "./util";
const skeleton = {
  render(createElement) {
    if (!this.loading) {
      return this.$slots.default;
    }
    return createElement(
      "div",
      {
        class: "skeleton-box"
      },
      [
        this.avatarPlacement(createElement, "left"),
        createElement(
          "div",
          {
            class: this.animate
              ? "skeleton-content skeleton-animation"
              : "skeleton-content"
          },
          [this.options(this.type, createElement)]
        ),
        this.avatarPlacement(createElement, "right")
      ]
    );
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
      required: true
    },
    type: {
      type: String,
      default: "default"
    },
    rows: {
      type: Number,
      default: 1
    },
    cols: {
      type: Number,
      default: 4
    },
    rowsOptions: {
      type: [Object, Array],
      default: () => {}
    },
    animate: {
      type: Boolean,
      default: true
    },
    avatarSize: {
      type: [Number, String],
      default: "50"
    },
    avatarType: {
      type: String,
      default: "round"
    },
    placement: {
      type: String,
      default: "left"
    }
  },
  methods: {
    options(type, h) {
      switch (type) {
        case "card":
          return this.renderCard(h);
          break;
        case "table":
          return this.renderTable(h);
          break;
        case "banner":
          return this.renderBanner(h);
          break;
        case "iconGrid":
          return this.renderIconGrid(h);
          break;

        case "grid":
          return this.renderGrid(h);
          break;
        default:
          return this.renderRows(h);
      }
    },
    /**
     * 根据头像放置位置渲染
     */
    avatarPlacement(h, type) {
      return this.placement === type && this.renderAvatar(h);
    },
    /**
     * 渲染头像
     */
    renderAvatar(h) {
      if (this.type === "avatar") {
        return h("div", {
          class:
            this.avatarType == "round"
              ? "skeleton-avatar skeleton-avatar-round"
              : "skeleton-avatar",
          style: {
            width: util.joinStr(this.avatarSize),
            height: util.joinStr(this.avatarSize),
            marginRight: this.placement === "left" ? "15px" : "",
            marginLeft: this.placement === "right" ? "15px" : ""
          }
        });
      }
    },
    /**
     * 渲染行数
     */
    renderRows(h) {
      let Rows = [];
      let [width, height] = ["", ""];
      if (typeof this.rowsOptions === "object" && this.rowsOptions) {
        if (Array.isArray(this.rowsOptions)) {
          if (this.rowsOptions.length < this.rows) {
            for (
              let i = this.rows - this.rowsOptions.length;
              i < this.rows + 2;
              i++
            ) {
              this.rowsOptions.push({
                width: "",
                height: ""
              });
            }
          }
          for (let i = 0; i < this.rows; i++) {
            Rows.push(
              h("div", {
                class: "skeleton-row",
                style: {
                  width: this.rowsOptions[i]["width"]
                    ? this.rowsOptions[i]["width"]
                    : "",
                  height: this.rowsOptions[i]["height"]
                    ? this.rowsOptions[i]["height"]
                    : ""
                }
              })
            );
          }
        } else {
          Rows = this.eachRow(h, {
            width: this.rowsOptions.width,
            height: this.rowsOptions.height
          });
        }
      } else {
        Rows = this.eachRow(h);
      }
      return Rows;
    },
    eachRow(h, options) {
      let Rows = [];
      for (let i = 0; i < this.rows; i++) {
        Rows.push(
          h("div", {
            class: "skeleton-row",
            style: options
          })
        );
      }
      return Rows;
    },
    /**
     *渲染icon网格
     * @param {*} h
     */
    renderIconGrid(h) {
      let Rows = [];
      let Cols = [];
      for (let i = 0; i < this.cols; i++) {
        Cols.push(
          h(
            "div",
            {
              class: "skeleton-grid-col"
            },
            [
              h("div", {
                class:
                  this.avatarType == "round"
                    ? "skeleton-grid-icon skeleton-avatar-round"
                    : "skeleton-grid-icon"
              }),
              h("div", {
                class: "skeleton-grid-desc"
              })
            ]
          )
        );
      }
      for (let i = 0; i < this.rows; i++) {
        Rows.push(
          h(
            "div",
            {
              class: "skeleton-grid-row"
            },
            [Cols]
          )
        );
      }
      return h(
        "div",
        {
          class: "skeleton-grid"
        },
        [Rows]
      );
    },
    /**
     * 渲染卡片
     */
    renderCard(h) {
      let Rows = [];
      let { width, height } = util.getWidthAndHeight(this.rowsOptions);
      for (let i = 0; i < this.rows; i++) {
        Rows.push(
          h(
            "div",
            {
              class: "skeleton-card-row"
            },
            [
              h("div", {
                class: "skeleton-card-content",
                style: {
                  width,
                  height
                }
              }),
              h("div", {
                class: "skeleton-card-desc"
              })
            ]
          )
        );
      }
      return h(
        "div",
        {
          class: "skeleton-card"
        },
        [Rows]
      );
    },
    /**
     * 渲染table
     */
    renderTable(h) {
      let Rows = [];
      let Cols = [];
      let { width, height } = util.getWidthAndHeight(this.rowsOptions);

      for (let i = 0; i < this.cols; i++) {
        Cols.push(
          h("div", {
            class: "skeleton-table-col",
            style: {
              width,
              height
            }
          })
        );
      }
      for (let i = 0; i < this.rows; i++) {
        Rows.push(
          h(
            "div",
            {
              class: "skeleton-table-row"
            },
            [Cols]
          )
        );
      }
      return h(
        "div",
        {
          class: "skeleton-table"
        },
        [Rows]
      );
    },
    /**
     *  渲染banner
     */
    renderBanner(h) {
      let Rows = [];
      let { width, height } = util.getWidthAndHeight(this.rowsOptions);

      for (let i = 0; i < this.rows; i++) {
        Rows.push(
          h(
            "div",
            {
              class: "skeleton-banner-row",
              style: {
                width,
                height
              }
            },
            [
              h(
                "div",
                {
                  class: "skeleton-banner-icon"
                },
                [
                  h("span", {
                    class: "skeleton-banner-icon-option"
                  }),
                  h("span", {
                    class: "skeleton-banner-icon-option"
                  }),
                  h("span", {
                    class: "skeleton-banner-icon-option"
                  })
                ]
              )
            ]
          )
        );
      }
      return h(
        "div",
        {
          class: "skeleton-banner"
        },
        [Rows]
      );
    },
    /**
     *  渲染banner
     */
    renderGrid(h) {
      let Rows = [];
      let Cols = [];
      for (let i = 0; i < this.cols; i++) {
        Cols.push(
          h(
            "div",
            {
              class: "skeleton-grid-col"
            },
            [
              h("div", {
                class:
                  this.avatarType == "round"
                    ? "skeleton-grid-icon skeleton-avatar-round"
                    : "skeleton-grid-icon"
              })
            ]
          )
        );
      }
      for (let i = 0; i < this.rows; i++) {
        Rows.push(
          h(
            "div",
            {
              class: "skeleton-grid-row"
            },
            [Cols]
          )
        );
      }
      return h(
        "div",
        {
          class: "skeleton-grid"
        },
        [Rows]
      );
    }
  }
};

const skeletonPugin = {
  install: Vue => {
    Vue.component("xd-skeleton", skeleton);
  }
};
export default skeletonPugin;
