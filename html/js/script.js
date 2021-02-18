$(document).ready(function () {
  var count = 0;
  var editIndex, checked, valid1, valid2, valid3, valid4;
  var deleteCheck = false;
  //for input masking
  $(":input").inputmask();
  //DataTable() plugin
  var tableData = $("#tabledata").DataTable();
  //DataTable() plugin
  $("#DOB").focusin(function () {
    $("#DOB").datepicker();
  });
  //tab button
  $(".tabButton").click(function () {
    $(".content>div").eq($(this).index()).show().siblings().hide();
  });
  $(".tabButton").eq(0).trigger("click"); //first tab will be show() always
  //save and next button & previous button
  $("#nextButton1,#prevButton2").click(function () {
    $(".tabButton#two").trigger("click");
  });
  $("#nextButton2, #prevButton3").click(function () {
    $(".tabButton#three").trigger("click");
  });
  $("#prevButton1").click(function () {
    $(".tabButton#one").trigger("click");
  });
  $("#nextButton3").click(function () {
    $(".tabButton#four").trigger("click");
  });
  //submit button
  $(".submitButton").click(function () {
    // console.log($("#contact").inputmask("isComplete"));
    $("input,textarea,select,radio,number,checkbox").css(
      "border",
      "2px solid #000"
    );
    $("#firstName").val() != "" &&
    $("#lastName").val() != "" &&
    $('input[class="radioInput"]:checked').val() != undefined
      ? (valid1 = "true")
      : (valid1 = "false");
    $("#email").val() != "" &&
    ($("#contact").inputmask("isComplete") == true) &&
    ($("#DOB").inputmask("isComplete") == true)
      ? (valid2 = "true")
      : (valid2 = "false");
    $("#aboutYou").val() != "" && $("#sports").val() != ""
      ? (valid3 = "true")
      : (valid3 = "false");
    ($("#hoursInput").inputmask("isComplete") == true) &&
    ($("#zipInput").inputmask("isComplete") == true) &&
    ($("#ipAddress").inputmask("isComplete") == true) &&
    ($("#money").inputmask("isComplete") == true)
      ? (valid4 = "true")
      : (valid4 = "false");
    if (valid1 == "true" && valid2 == "true" && valid3 == "true" && valid4=="true") {
      tableData.row
        .add([
          count,
          $("#firstName").val(),
          $("#lastName").val(),
          $('input[class="radioInput"]:checked').val(),
          $("#email").val(),
          $("#contact").val(),
          $("#DOB").val(),
          $("#sports").val(),
          $("#aboutYou").val(),
          $("#agree").is(":checked") == true ? "agree" : "no agree",
          $("#hoursInput").val(),
          $("#zipInput").val(),
          $("#ipAddress").val(),
          $("#money").val(),
          '<input type="button" class="edit" value="edit"/>',
          '<input type="button" class="delete" value="delete"/>'
        ])
        .draw();
      count++;
      $("form").not($(".tabButton#one").trigger("click")).trigger("reset");
    } else if (valid1 == "false") {
      $(".tabButton#one").trigger("click");
      if ($("#firstName").val() == "") {
        $("#firstName").css("border", "2px solid #F90A0A");
      } else if ($("#lastName").val() == "") {
        $("#lastName").css("border", "2px solid #F90A0A");
      } else if ($('input[class="radioInput"]:checked').val() == undefined) {
        $("#genderLabel").css("border", "2px solid #F90A0A");
      }
    } else if (valid2 == "false") {
      $(".tabButton#two").trigger("click");
      if ($("#email").val() == "") {
        $("#email").css("border", "2px solid #F90A0A");
      } else if (!$("#contact").inputmask("isComplete")) {
        $("#contact").css("border", "2px solid #F90A0A");
      } else if (!$("#DOB").inputmask("isComplete")) {
        $("#DOB").css("border", "2px solid #F90A0A");
      }
    } else if (valid3 == "false") {
      $(".tabButton#three").trigger("click");
      if ($("#aboutYou").val() == "") {
        $("#aboutYou").css("border", "2px solid #F90A0A");
      } else if ($("#sports").val() == "") {
        $("#sports").css("border", "2px solid #F90A0A");
      }
    }else if(valid4 == "false"){
      $(".tabButton#four").trigger("click");
      if(!$("#hoursInput").inputmask("isComplete")){
        $("#hoursInput").css("border", "2px solid #F90A0A");
      }else if(!$("#zipInput").inputmask("isComplete")){
        $("#zipInput").css("border", "2px solid #F90A0A");
      }else if(!$("#ipAddress").inputmask("isComplete")){
        $("#ipAddress").css("border", "2px solid #F90A0A");
      }else if(!$("#money").inputmask("isComplete")){
        $("#money").css("border", "2px solid #F90A0A");
      }
    }
  });
  //edit function
  $(document).on("click", ".edit", function () {
    deleteCheck = true;
    editIndex = $(this).parent().parent().index();
    var values = $(this).closest("tr");
    console.log(tableData.row(editIndex).data()[9]);
    $("#firstName").val(tableData.row(editIndex).data()[1]);
    $("#lastName").val(tableData.row(editIndex).data()[2]);
    $(
      "input[name=gender][value=" + tableData.row(editIndex).data()[3] + "]"
    ).prop("checked", true);
    $("#email").val(tableData.row(editIndex).data()[4]);
    $("#contact").val(tableData.row(editIndex).data()[5]);
    $("#DOB").val(tableData.row(editIndex).data()[6]);
    $(
      "#sports option:selected[value=" +
        tableData.row(editIndex).data()[7] +
        "]"
    ).prop("checked", true);
    $("#aboutYou").val(tableData.row(editIndex).data()[8]);
    tableData.row(editIndex).data()[9] == "agree"
      ? $("#agree").prop("checked", true)
      : $("#agree").prop("checked", false);
    $("#hoursInput").val(tableData.row(editIndex).data()[10]),
    $("#zipInput").val(tableData.row(editIndex).data()[11]),
    $("#ipAddress").val(tableData.row(editIndex).data()[12]),
    $("#money").val(tableData.row(editIndex).data()[13])
    $(".submitButton").not($("#updateBtn, #cancelBtn").show()).hide();
  });
  //update button
  $(document).on("click", ".updateButton", function () {
    console.log("in");
    tableData
      .row(editIndex)
      .data([
        count,
        $("#firstName").val(),
        $("#lastName").val(),
        $('input[class="radioInput"]:checked').val(),
        $("#email").val(),
        $("#contact").val(),
        $("#DOB").val(),
        $("#sports").val(),
        $("#aboutYou").val(),
        $("#agree").prop("checked")
          ? (agreeDat = "agree")
          : (agreeDate = "not agree"),
        $("#hoursInput").val(),
        $("#zipInput").val(),
        $("#ipAddress").val(),  
        $("#money").val(),     
         '<input type="button" class="edit" value="edit"/>',
        '<input type="button" class="delete" value="delete"/>'
      ])
      .draw();
    $(".submitButton").not($("#updateBtn,  #cancelBtn").hide()).show();
    $("form").trigger("reset");
  });
  //cancel button
  $(document).on("click", ".cancelButton", function () {
    deleteCheck = false;
    $(".submitButton").not($("#updateBtn,  #cancelBtn").hide()).show();
    $("form").not($(".tabButton#one").trigger("click")).trigger("reset");
  });
  // delete button
  $(document).on("click", ".delete", function () {
    if (deleteCheck != true) {
      // var deleteThis = $(this).closest("tr");
      // tableData.row(deleteThis).remove().draw( false );
      $(this).closest("tr").remove();
    }
  });
});
