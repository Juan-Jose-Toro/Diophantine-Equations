$(document).ready(function () {
  // Just a test
  $(".input").on("change blur", function () {
    // Automatically replace an empty field with its correspondent letter (a, b or c)
    if ($(this).text().length === 0) {
      let contains = this.className.includes("a");
      if (contains) {
        $(this).text("a");
      }
      contains = this.className.includes("b");
      if (contains) {
        $(this).text("b");
      }
      contains = this.className.includes("c");
      if (contains) {
        $(this).text("c");
      }
    }

    // Send information to backend when all fields are numbers
    if (!isNaN($(".input").text())) {
      // console.log($(".input").text());
      let variables = $(".input").text();
      const variablesPackage = {
        a: variables[0],
        b: variables[1],
        c: variables[2],
      };
      
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(variablesPackage),
      }
      // console.log(variablesPackage);
    }
  });

  // Only allow numbers to be entered on .input class objects
  $(".input").on("keypress keyup blur", function (event) {
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
  $("body").bind("paste cut drag drop", function (e) {
    e.preventDefault();
  });
});
