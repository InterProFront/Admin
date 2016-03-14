/**
 * Created by Косаностра on 14.03.2016.
 */
/**
 * Created by kocahoctpa on 3/14/16.
 */



$(document).ready(function(){
    'use strict';

    var Adminka = document.adminkaInterpro;
    Adminka.init({});

    function SendSorter(block, id, sort){

        var dataobj = {};
        dataobj['block']    = block;
        dataobj['group_id'] = id;
        dataobj['show']   = sort;
        dataobj['entity'] =  'groupitem';

        var messagecontainer = $('.message-container');
        messagecontainer.removeClass('success');
        messagecontainer.removeClass('alert');
        messagecontainer.text('');

        $(this).adminka(
            'savecontent',
            {
                type: 'POST',
                url: '/adm/update/groupitem',
                data: dataobj
            },
            {
                done_callback: function(data){
                    if (data.status === 'OK') {
                        messagecontainer.addClass('success');
                        messagecontainer.text('Страницы опубликована');
                    }else{
                        messagecontainer.addClass('alert');
                        messagecontainer.text('Не удалось опубликовать страницу. Статус ошибки: ' + data.status);
                    }
                },
                fail_callback: function(data){
                    messagecontainer.addClass('alert');
                    messagecontainer.append('Что-то пошло не по плану: <br>' + JSON.stringify(data));
                },
                always_callback: function(data){
                    //Убрать индикатор загрузки, если появится
                }
            }
        );
    }

    $('.publicated').on('change',function(){
            var block = $(this).parents('tbody').data('block');
            var id = $(this).parents('tr').data('id');
            if ($(this).val() == 'true'){
                var sorter = true;
            }else{
                var sorter = false;
            }
            SendSorter(block,id,sorter);
    });
});