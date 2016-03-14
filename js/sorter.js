/**
 * Created by kocahoctpa on 3/14/16.
 */
$(document).ready(function(){
    'use strict';
    $('.up-button').on('click',function(){
        var sorter = 0;
        var parent = $(this).parents('tr');
        sorter = parent.data('sorter');

        parent.insertBefore('tr[data-sorter="'+(sorter-1)+'"]');



        $('tr[data-sorter='+(sorter-1)+']').data('sorter',sorter).attr('data-sorter',sorter);


        alert(parent.data('sorter'));

        parent.data('sorter',(sorter-1)).attr('data-sorter',(sorter-1)).css('background-color','#A4AAAB');

        alert(parent.data('sorter'));



        setTimeout(function(){
            parent.css('background-color','#ffffff');

        },200);

    });

    $('.down-button').on('click',function(){
        var sorter = 0;
        var parent = $(this).parents('tr');
        sorter = parent.data('sorter');

        parent.insertAfter('tr[data-sorter='+(sorter+1)+']');
        $('tr[data-sorter='+(sorter+1)+']').data('sorter',sorter).attr('data-sorter',sorter);

        alert(parent.data('sorter'));

        parent.data('sorter',(sorter+1)).attr('data-sorter',(sorter+1)).css('background-color','#A4AAAB');

        alert(parent.data('sorter'));



        setTimeout(function(){
            parent.css('background-color','#ffffff');

        },200);
    })
});