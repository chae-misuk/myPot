import React from "https://esm.run/react@18";
import { createRoot } from "https://esm.run/react-dom@18/client";
import confetti from "https://esm.run/canvas-confetti@1";

function App() {
  function onClick() {
    confetti({
      particleCount: 150,
      spread: 60 });

  }

  return /*#__PURE__*/(
    React.createElement("button", { className: "button", onClick: onClick }, /*#__PURE__*/
    React.createElement("span", null, "\uD83C\uDF89"), /*#__PURE__*/
    React.createElement("span", null, "Like")));


}

createRoot(document.getElementById("root")).render( /*#__PURE__*/React.createElement(App, null));