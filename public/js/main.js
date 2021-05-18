// const { underline } = require("ansi-styles");

gsap.registerPlugin(ScrollTrigger);

const timeline = gsap.timeline({ defaults: { duration: 0.5 } });
timeline
  .from("#hero", { y: "10", opacity: 0 })
  .from("header", { y: "10", opacity: 0 })
  .from("#equation", { y: "10", opacity: 0 });

function randomValues() {
  anime({
    targets: ".rotate-hex",
    rotate: () => {
      return anime.random(-360, 360);
    },
    duration: 3000,
    easing: "easeInOutQuad",
    complete: randomValues,
  });
}

$(document).ready(() => {
  $(".input-field").on("change blur", () => {
    let counter = 0;
    const variables = [];

    $(".input-field").each((i, item) => {
      // Automatically replace an empty field with its correspondent letter (a, b or c)
      if (!$(item).text()) {
        $(item).text("---");
      } else if (!isNaN($(item).text())) {
        variables.push($(item).text());
        counter++;
      } else {
        counter = 0;
      }

      if (counter === 3) {
        console.log(variables[0]);
        const variablesPackage = {
          a: variables[0],
          b: variables[1],
          c: variables[2],
        };
        console.log(variablesPackage);

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(variablesPackage),
        };

        const response = fetch("/api", options)
          .then((res) => res.json())
          .then((data) => {
            $(".output").html(
              `x = ${data.x_part}` + "<br>" + `y = ${data.y_part}`
            );
            $(".solutions").css("display", "flex");
            $(".more-steps").appendTo(".solution");
            $(".more-steps").css("display", "flex");

            const solutiontl = gsap.timeline({ defaults: { duration: 0.5 } });
            solutiontl
              .from(".solution", { y: "10", opacity: 0 })
              .from(".more-steps", { y: "10", opacity: 0 })
            // console.log(data);
          });
      }
    });
  });

  // Only allow numbers to be entered on .input class objects
  $(".input-field").on("keypress keyup blur", function (event) {
    $(this).val(
      $(this)
        .val()
        .replace(/[^\d].+/, "")
    );
    if (event.which < 48 || event.which > 57) {
      $(".error").css("display", "inline");
      event.preventDefault();
    } else {
      $(".error").css("display", "none");
    }
  });

  // Prevent paste cut drag and drop
  $("bodys").bind("paste cut drag drop", function (e) {
    e.preventDefault();
  });

  randomValues();
});
