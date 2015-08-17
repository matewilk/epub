define(function(){
    var getSelected = function(document) {
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

    return {
        getSelected: getSelected,
        clearSelected: clearSelected
    }
});
