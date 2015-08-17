define(function(){
    var getSelected = function(document) {
        //http://stackoverflow.com/questions/5643635/how-to-get-selected-html-text-with-javascript#answer-10180367
        var text = "";
        if (document.getSelection
            && document.getSelection().toString()
            && $(document.getSelection()).attr('type') != "Caret") {
            text = document.getSelection();
            return text;
        }
        else if (document.getSelection
            && document.getSelection().toString()
            && $(document.getSelection()).attr('type') != "Caret") {
            text = document.getSelection();
            return text;
        }
        else {
            var selection = document.selection && document.selection.createRange();

            if (!(typeof selection === "undefined")
                && selection.text
                && selection.text.toString()) {
                text = selection.text;
                return text;
            }
        }

        return false;
    };

    var clearSelected = function(document){
        //http://stackoverflow.com/questions/3169786/clear-text-selection-with-javascript#answers
        if (document.getSelection) {
            if (document.getSelection().empty) {  // Chrome
                document.getSelection().empty();
            } else if (document.getSelection().removeAllRanges) {  // Firefox
                document.getSelection().removeAllRanges();
            }
        } else if (document.selection) {  // IE?
            document.selection.empty();
        }
    };

    var clearSelectedOnSelection = function(selection){
        if(selection.empty){ //Chrome, IE?
            selection.empty();
        } else if (selection.removeAllRanges) { //Firefox
            selection.removeAllRanges();
        }
    };

    return {
        getSelected: getSelected,
        clearSelected: clearSelected,
        clearSelectedOnSelection: clearSelectedOnSelection
    }
});
