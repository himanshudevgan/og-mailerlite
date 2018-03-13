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
            console.log('************', data);
        });
    });

    $("#changekey").click(function(){
        const mlkey=$("#mlkey").val();
        const ogkey=$("#ogkey").val();
        mlapikey=mlkey;
        ogapikey=ogkey;
        $("#changekey").attr('value', 'Please Wait...').attr('disabled', true);
        $.post("https://og-mailerlite.herokuapp.com/changekey",{mlapikey: mlapikey,ogapikey:ogapikey}, function (data){
            $("#changekey").attr('value', 'submit').attr('disabled', false);
            console.log('************', data);
        });
    });
    deleteGroupAppLink = (item) => {
        console.log('itemmmmmmmmm', item);
        $.get("http://localhost:3001/deletelink/"+item, function(data) {
            console.log('data deleted');
        });
    }
});
