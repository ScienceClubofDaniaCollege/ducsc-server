// Call the dataTables jQuery plugin
$(document).ready(function() {
  $("#dataTable").DataTable({
    ajax: {
      url: "/member",
      dataSrc: ""
    },
    columns: [
      {
        data: null,
        render: (data, type, row) => `<img src=${data.photo}  alt="${data.fname}'s profile photo" style= "height:60px;width: 60px" class="img-profile rounded">`},
      {
        data: null,
        render: (data, type, row) => data.fname + " " + data.lname
      },
      { data: "memberType" },
      { data: "memberId" },
      { data: "section" },
      { data: "roll" },
      {
        data: null,
        render: (data, type, row) => {

        return (`<form action="/member/approve/${data.memberId}" method="POST">
          <button><i class="fa fa-check"></i></button>
        </form>`);
        }
      },
    ]
  });
});
