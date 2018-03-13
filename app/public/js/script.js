$(document).ready(function(){
    $("#btnMapGC").click(function(){
        const group=$("#group").val().split(';');
        const calc=$("#calc").val().split(';');
        const mlgid = group[0];
        const gname = group[1];
        const calcId = calc[0];
        const URL = calc[1];
        const parentapp = calc[2];
        $("#btnMapGC").attr('value', 'Please Wait...').attr('disabled', true);

        $.post("https://og-mailerlite.herokuapp.com/link",{calcid: calcId,mlgid: mlgid, groupname: gname, url: URL,parentapp:parentapp}, function (data){
            $("#btnMapGC").attr('value', 'Map').attr('disabled', false);
            window.location.reload();
        });
        // $.post("http://localhost:3001/link",{calcid: calcId,mlgid: mlgid, groupname: gname, url: URL,parentapp:parentapp}, function (data){
        //     $("#btnMapGC").attr('value', 'Map').attr('disabled', false);
        //     window.location.reload();
        // });
    });

    $("#changekey").click(function(){
        const mlkey=$("#mlkey").val();
        const ogkey=$("#ogkey").val();
        mlapikey=mlkey;
        ogapikey=ogkey;
        $("#changekey").attr('value', 'Please Wait...').attr('disabled', true);
        $.post("https://og-mailerlite.herokuapp.com/changekey",{mlapikey: mlapikey,ogapikey:ogapikey}, function (data){
            $("#changekey").attr('value', 'submit').attr('disabled', false);
        });
        // $.post("http://localhost:3001/changekey",{mlapikey: mlapikey,ogapikey:ogapikey}, function (data){
        //     $("#changekey").attr('value', 'submit').attr('disabled', false);
        // });
    });
    deleteGroupAppLink = (item) => {
        $("#" + item).html('<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>');
        $("#" + item).attr('disabled', true);
        // $.get("https://og-mailerlite.herokuapp.com/"+item, function(data) {
        //     window.location.reload();
        // });
        $.get("http://localhost:3001/deletelink/"+item, function(data) {
            window.location.reload();
        });
    }
});
