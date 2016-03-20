/**
 * Created by Косаностра on 20.03.2016.
 */
$(document).ready(function(){
    'use strict';
    $('#block-group').on('change',function(){
        var deffered = $.ajax({
            url: '/adm/serv/getgroups/'+$(this).val()
        });

        deffered.success(function(data){
            alert(data.slider);
            $.each(data, function (key, item) {
                $('#group').append($('<option>', {
                    value: key,
                    text : key
                }));
            });
        });
        deffered.error(function(){
           alert('pizdec');
        });
        deffered.fail(function(){
            alert('fail');
        });
    });

    $('.reinit-block').on('click',function(){
        var deffered = $.ajax({
            url: '/adm/reinit_block/'+$('#block').val()
        });

        deffered.success(function(data){
            alert('succes')
        });
        deffered.error(function(){
            alert('pizdec');
        });
        deffered.fail(function(){
            alert('fail');
        });
    });
    $('.reinit-group').on('click',function(){
        var deffered = $.ajax({
            url: '/adm/reinit_block/'+$('#block-group').val()+'/'+$('#group').val()
        });

        deffered.success(function(data){
            alert('succes')
        });
        deffered.error(function(){
            alert('pizdec');
        });
        deffered.fail(function(){
            alert('fail');
        });
    });

});