// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
import "typeface-nunito"
import "typeface-alegreya"

export const onClientEntry = () => {
  var gumroadScript
  function initGumRoad() {
    if (!gumroadScript) {
      gumroadScript = document.createElement("script")
      gumroadScript.src = "https://gumroad.com/js/gumroad.js"
      gumroadScript.onload = function(e) {
        if (window.createGumroadOverlay) {
          window.createGumroadOverlay()
        }
      }

      document.head.appendChild(gumroadScript)
    } else {
      if (window.createGumroadOverlay) {
        window.createGumroadOverlay()
      }
    }
  }

  if (document.readyState !== "loading") {
    initGumRoad()
  } else {
    document.addEventListener("DOMContentLoaded", initGumRoad)
  }
}
