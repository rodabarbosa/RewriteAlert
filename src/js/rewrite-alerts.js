if (document.getElementById) {
    window.alert =  createRewriteAlert;
    
    
    window.prompt = function(message, _default) {
        createRewritePrompt(message, _default).then(result => { return result; });
    }
    

   //window.prompt = createRewritePrompt.then(result => { return result;});
}

function createRewriteBase(message, title) {
    __rewriteLayout = document.getElementsByTagName("body")[0].appendChild(document.createElement("div"));
    __rewriteLayout.id = "_rewrite_layout";
    __rewriteLayout.setAttribute("style", "background-color:rgba(0, 0, 0, 0.3); position:absolute; width:100%; height:100%; top:0; left:0; z-index:10000;");

    __rewriteAlertWindow = __rewriteLayout.appendChild(document.createElement("div"));
    __rewriteAlertWindow.id = "_rewrite_alertwindow";
    __rewriteAlertWindow.setAttribute("style", "position: absolute; top: 7%; left: calc(50%/2); min-width: 50%; min-height: 12em; background-color:#FFF; background-repeat: no-repeat; border-radius: 0.35em;");

    __rewriteAlerWwindowTitle = __rewriteAlertWindow.appendChild(document.createElement("div"));
    __rewriteAlerWwindowTitle.id = "_rewrite_alertwindow-title";
    __rewriteAlerWwindowTitle.setAttribute("style", "position: absolute; top: 0; left: 0; width: calc(100% - 0.3em); height: 2em; font:bold 0.9em verdana,arial; background-color:#3073BB; color:#FFF; line-height: 2em; padding-left: 0.5em; border-radius: 0.3em 0.3em 0 0; ");
    __rewriteAlerWwindowTitle.innerHTML = title;

    __rewriteAlertWindowContent = __rewriteAlertWindow.appendChild(document.createElement("div"));
    __rewriteAlertWindowContent.id = "_rewrite_alertwindow-content";
    __rewriteAlertWindowContent.setAttribute("style", "position: absolute; top: 2em; left: 0; width: 100%; padding: 0.5em;");
    __rewriteAlertWindowContentMessage = __rewriteAlertWindowContent.appendChild(document.createElement("div"));
    __rewriteAlertWindowContentMessage.innerHTML = message;

    __rewriteAlertWindowFooter = __rewriteAlertWindow.appendChild(document.createElement("div"));
    __rewriteAlertWindowFooter.id = "_rewrite_alertwindow-footer";
    __rewriteAlertWindowFooter.setAttribute("style", "position: absolute; bottom: 0; right: 0; padding: 0.5em;");

    __rewriteAlertWindowButtonCancel = __rewriteAlertWindowFooter.appendChild(document.createElement("button"));
    __rewriteAlertWindowButtonCancel.id = "_rewrite_alertwindow-buttoncancel";
    __rewriteAlertWindowButtonCancel.setAttribute("style", "padding:0.7em; border:0 none; width:7em; font:0.7em verdana,arial; text-transform:uppercase; text-align:center; border-radius: 0.3em; text-decoration:none;");
    __rewriteAlertWindowButtonCancel.innerHTML = "Cancel";
    __rewriteAlertWindowButtonCancel.onclick = function() {
        document.getElementsByTagName("body")[0].removeChild(document.getElementById("_rewrite_layout"));
        return null;
    };
}

function createRewriteAlert(message) {
    if (document.getElementById("_rewrite_layout"))
        return;

    createRewriteBase(message, "Alert");

    document.getElementById("_rewrite_alertwindow-buttoncancel").setAttribute("style", "padding:0.7em; border:0 none; width:7em; font:0.7em verdana,arial; text-transform:uppercase; text-align:center; border-radius: 0.3em; text-decoration:none;background-color:#3073BB; color:#FFF;");
    document.getElementById("_rewrite_alertwindow-buttoncancel").innerHTML = "OK";
}

function createRewritePrompt(message, _default) {
    return new Promise((resolve, reject) => {
        createRewriteBase(message, "Prompt");


        __rewriteAlertWindowInput = document.getElementById("_rewrite_alertwindow-content").appendChild(document.createElement("input"));
        __rewriteAlertWindowInput.id = "_rewrite_alertwindow-input";
        __rewriteAlertWindowInput.setAttribute("style", "width: 98%");
        __rewriteAlertWindowInput.value = _default;

        __rewriteAlertWindowButtonYes = document.createElement("button");
        __rewriteAlertWindowButtonYes.setAttribute("style", "padding:0.7em; border:0 none; width:7em; font:0.7em verdana,arial; text-transform:uppercase; text-align:center; border-radius: 0.3em; text-decoration:none;background-color:#3073BB; color:#FFF;margin-right: 1em;");
        __rewriteAlertWindowButtonYes.innerHTML = "OK";
        document.getElementById("_rewrite_alertwindow-footer").insertBefore(__rewriteAlertWindowButtonYes, document.getElementById("_rewrite_alertwindow-footer").firstChild);
        __rewriteAlertWindowButtonYes.onclick = function() {
            data = document.getElementById("_rewrite_alertwindow-input").value;
            document.getElementsByTagName("body")[0].removeChild(document.getElementById("_rewrite_layout"));
            //return data;
            resolve(data);
        };
    });
}
