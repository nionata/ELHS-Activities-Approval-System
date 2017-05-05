function requestSubmitPreFillApproval() {
  //Get the current spreadsheet and get the most recent requests data
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName("Form Responses 1");
  var data = sheet.getRange("B" + sheet.getLastRow() + ":" + "W" + sheet.getLastRow()).getValues()[0];  // Data for pre-fill

  //Get the approval form and all its items
  var approvalForm = FormApp.openById("1rNp0ukQ4Eyi6MwVRp2DkxClNUZpRKq8wPv1OA9GONGk");
  var items = approvalForm.getItems();

  var formResponse = approvalForm.createResponse();

  // Prefill Email
  var formItem = items[0].asTextItem();
  var response = formItem.createResponse(data[0]);
  formResponse.withItemResponse(response);

  //Prefill Contact Name
  formItem = items[1].asTextItem();
  response = formItem.createResponse(data[1]);
  formResponse.withItemResponse(response);

  //Prefill Activity Name
  formItem = items[2].asTextItem();
  response = formItem.createResponse(data[2]);
  formResponse.withItemResponse(response);

  //Prefill Activity Type
  formItem = items[3].asListItem();
  response = formItem.createResponse(data[3]);
  formResponse.withItemResponse(response);

  //Prefill Group/Sponser
  formItem = items[4].asTextItem();
  response = formItem.createResponse(data[4]);
  formResponse.withItemResponse(response);

  //Prefill Start
  formItem = items[5].asDateTimeItem();
  response = formItem.createResponse(data[5]);
  formResponse.withItemResponse(response);

  //Prefill End
  formItem = items[6].asDateTimeItem();
  response = formItem.createResponse(data[6]);
  formResponse.withItemResponse(response);

  //Prefill Location of Event
  formItem = items[7].asTextItem();
  response = formItem.createResponse(data[7]);
  formResponse.withItemResponse(response);

  //Prefill Location Flexibility
  formItem = items[8].asMultipleChoiceItem();
  response = formItem.createResponse(data[8]);
  formResponse.withItemResponse(response);

  //Prefill Participants
  formItem = items[9].asTextItem();
  response = formItem.createResponse(data[9]);
  formResponse.withItemResponse(response);

  //Prefill Rehearsal
   formItem = items[10].asParagraphTextItem();
   response = formItem.createResponse(data[10]);
   formResponse.withItemResponse(response);

  //Prefill Funds Question
  formItem = items[11].asMultipleChoiceItem();
  response = formItem.createResponse(data[11]);
  formResponse.withItemResponse(response);

  //Prefill Account
  formItem = items[13].asTextItem();
  response = formItem.createResponse(data[12]);
  formResponse.withItemResponse(response);

  //Prefill Booster
  if(data[13] != "") {
    formItem = items[14].asMultipleChoiceItem();
    response = formItem.createResponse(data[13]);
    formResponse.withItemResponse(response);
  }

  if(data[14] != "") {
    //Required field that might not be filled out, have to test to see if there is content
    formItem = items[15].asDateItem();
    response = formItem.createResponse(data[14]);
    formResponse.withItemResponse(response);
  }

  //Required field that might not be filled out, have to test to see if there is content
  if(data[15] != "") {
    //Prefill Collection End
    formItem = items[16].asDateItem();
    response = formItem.createResponse(data[15]);
    formResponse.withItemResponse(response);
  }

  //Prefill Items Sold
  formItem = items[17].asParagraphTextItem();
  response = formItem.createResponse(data[16]);
  formResponse.withItemResponse(response);

  //Prefill Use Funds
  formItem = items[18].asParagraphTextItem();
  response = formItem.createResponse(data[17]);
  formResponse.withItemResponse(response);

  //Prefill Logistics Needs
  formItem = items[20].asParagraphTextItem();
  response = formItem.createResponse(data[18]);
  formResponse.withItemResponse(response);

  //Prefill Notes
  formItem = items[21].asParagraphTextItem();
  response = formItem.createResponse(data[19]);
  formResponse.withItemResponse(response);

  var url = formResponse.toPrefilledUrl();

  MailApp.sendEmail({
     to: "elhsactivities@gmail.com",
     subject: "New Activity Request For " + data[2],
     htmlBody: "<h3>" + data[1] + " just submitted an activity request for " + data[2] + "</h1>" +
               "<p>To approve the activity, click this link: <br />" + url + "</p>"
  })
};
