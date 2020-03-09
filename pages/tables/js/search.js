function search(a,b) {
  var input, filter, table, tr, td, i, k, txtValue;
  input = document.getElementById(b.id);
  filter = input.value.toUpperCase();
  table = document.getElementById(a.id);
  tr = table.getElementsByTagName("tr");
  k = tr[1].cells.length;
  for (i = 0; i < tr.length; i++) {

    for (j = 0; j < k; j++){
      td = tr[i].getElementsByTagName("td")[j];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
}
