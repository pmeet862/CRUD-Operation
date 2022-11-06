$("#add_product").submit(function (event) {
  alert("Data inserted successfully!");
});

$("#update_product").submit(function (event) {
  event.preventDefault();
  var x = document.forms["myform"]["name"].value;
  x = x.trim();
  var y = document.forms["myform"]["price"].value;
  y = y.trim();
  if (x == "" || x == null || y == "" || y == null) {
    alert("Data must be filled out");
    return false;
  }
  var unindexed_array = $(this).serializeArray();
  var data = {};
  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });

  var request = {
    url: `http://localhost:5000/products/${data.id}`,
    method: "PATCH",
    data: data,
  };
  $.ajax(request).done(function (response) {
    alert("Data updated successfully!");
  });
});

if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");
    var request = {
      url: `http://localhost:5000/products/${id}`,
      method: "DELETE",
    };
    if (confirm("Do you want to delete this product?")) {
      $.ajax(request).done(function (response) {
        alert("Data deleted successfully!");
        location.reload();
      });
    }
  });
}

// function validateForm() {
//     var x = document.forms["myform"]["name"].value;
//     var y = document.forms["myform"]["price"].value;
//     if (x == "" || x == null || y == "" || y == null || x.match(/^\s*$/)) {
//         alert("Data must be filled out");
//         return false;
//     }
// }
