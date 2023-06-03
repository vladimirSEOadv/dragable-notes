class DraggableElement {
  #element = document.createElement("div");
  #isDragging = false;
  #x;
  #y;

  constructor({ top, left, text }) {
    this.#element.id = "draggable";
    this.#element.textContent = text;
    this.#element.contentEditable = true;
    this.#x = top;
    this.#y = left;
    const defaultStyles = {
      minWidth: "100px",
      maxWidth: "500px",
      webkitUserSelect: "none",
      padding: "15px",
      color: "white",
      minHeight: "20px",
      fontSize: "1.2em",
      backgroundColor: "#f44336",
      borderRadius: "5px",
      position: "absolute",
      top: `${top}px`,
      left: `${left}px`,
    };
    Object.assign(this.#element.style, defaultStyles);
    const appElement = document.getElementById("app") || document.body;
    appElement.appendChild(this.#element);

    this.#attachEventListeners();
  }

  #attachEventListeners = () => {
    this.#element.addEventListener("dblclick", this.#doubleClickHandler);
    this.#element.addEventListener("click", this.#editableOn);
    document.addEventListener("mousemove", this.mouseMoveHandler);
    document.addEventListener("mouseup", this.mouseUpHandler);
  };

  #editableOn = () => {
    this.#element.contentEditable = true;
    this.#element.focus();
  };

  #doubleClickHandler = () => {
    this.#element.contentEditable = false;
    this.isDragging = true;
  };

  mouseMoveHandler = (e) => {
    if (this.isDragging) {
      const dx = e.clientX - this.x;
      const dy = e.clientY - this.y;

      this.#element.style.top = `${this.#element.offsetTop + dy}px`;
      this.#element.style.left = `${this.#element.offsetLeft + dx}px`;

      this.x = e.clientX;
      this.y = e.clientY;
    }
  };

  mouseUpHandler = () => {
    this.#element.contentEditable = true;
    this.isDragging = false;
  };
}

const btn = document.querySelector("#addNote");
function createNewNote() {
  const el = new DraggableElement({ top: 0, left: 0, text: "Text" });
  console.log("el", el);
  test = el;
  return el;
}
let test;
btn.addEventListener("click", createNewNote);
