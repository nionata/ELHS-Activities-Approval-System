function onFormSubmit() {
    var ss = SpreadsheetApp.getActive();
    var sheet = ss.getSheetByName("Form Responses 1");
    var data = sheet.getRange("B" + sheet.getLastRow() + ":" + "X" + sheet.getLastRow()).getValues()[0];  // Data for pre-fill
    var title = data[2]

    if(data[20] == "Yes") {
      MailApp.sendEmail({
        to: data[0],
        subject: "Your activity request for " + title + " was approved.",
        htmlBody: "<h3>Your activity was approved with the following comments:</h3><br/>" +
                  "<p>" + data[21] + "</p>"
      });

      if(data[22] == "Yes") {
        var startDate =  data[5]
        var endDate = data[6]

        var event = CalendarApp.getDefaultCalendar().createEvent(title, startDate, endDate)
      }
    } else {
      MailApp.sendEmail({
        to: data[0],
        subject: "Your activity request for " + title + " was denied.",
        htmlBody: "<h3>Your activity was denied with the following comments:</h3><br/>" +
                  "<p>" + data[21] + "</p><br/>" +
                  "<p>If you would like to update your request, you can edit your original response (You should have been emailed this link after you filled out the form)</p>"
      });
    }
}

