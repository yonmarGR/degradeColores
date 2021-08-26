const app = Vue.createApp({
  data() {
    return {
      title: "Gradient Generator",
      fcolor: "#78a8e0",
      scolor: "#1bf5b0",
      orientation: 1,
    };
  },
  computed: {
    setColor() {
      if (this.orientation == 1) {
        return `background: linear-gradient(to right, ${this.fcolor}, ${this.scolor});`;
      } else if(this.orientation == 2 ) {
        return `background: linear-gradient(to left, ${this.fcolor}, ${this.scolor});`;
      } else if(this.orientation == 3 ) {
        return `background: linear-gradient(to top, ${this.fcolor}, ${this.scolor});`;
      } else {
        return `background: linear-gradient(to bottom, ${this.fcolor}, ${this.scolor});`;
      }
    },
  },
});
/* la imagen maskable del manifest se crea en la pagiana https://maskable.app/editor */
