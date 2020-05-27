
< !DOCTYPE html >
    <html>
        <head>
            <base href="https://demos.telerik.com/kendo-ui/window/mvvm">
                <style>html {font - size: 14px; font-family: Arial, Helvetica, sans-serif; }</style>
                <title></title>
                <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.common-bootstrap.min.css" />
                <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.bootstrap.min.css" />
                <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.bootstrap.mobile.min.css" />

                <script src="https://kendo.cdn.telerik.com/2018.1.221/js/jquery.min.js"></script>
                <script src="https://kendo.cdn.telerik.com/2018.1.221/js/kendo.all.min.js"></script>


                <link rel="stylesheet" href="../content/shared/styles/examples-offline.css">
                    <script src="../content/shared/js/console.js"></script>
</head>
                <body>

                    <div id="window-container">

                    </div>

                    <div id="window-container2">

                    </div>
                    <script>
                        var viewModel = kendo.observable({
                            description: "some text here"
    });



  $(document).ready(function(){

    var window = $('#window-container').kendoWindow({title:'Passing Data Values In', width:200}).data('kendoWindow');
    var window2 = $('#window-container2').kendoWindow({title:'Binding Data',width:200,  position:{left:"30%", top:30}}).data('kendoWindow');


     var kendoDialog = kendo.template($("#window-template").html());
            window.open();
            window.content(kendoDialog(viewModel));





     var kendoDialog2 = kendo.template($("#window-template2").html());
            window2.open();
            window2.content(kendoDialog2);


            kendo.bind($("#window-container2"), viewModel);


  });



</script>


                    <script id="window-template" type="text/x-kendo-template">
                        <div class="col-sm-10">

                            #= data.description #
            </div>
                    </script>


                    <script id="window-template2" type="text/x-kendo-template">
                        <div class="col-sm-10">
                            <span data-bind="html:description"></span>
                        </div>
                    </script>
  
  
</div>


</body>
</html>
