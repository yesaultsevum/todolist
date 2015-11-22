/*global
alert, console, jQuery, window
*/
(function ($) {

    'use strict';

    $(window).on('beforeunload', function () {
        var todos = $('.localStor').html();
        if (todos) {
            localStorage.setItem('todos', todos);
        } else {
            localStorage.clear();
        }
    });

    $(document).on('click', 'a', function (e) {
        e.preventDefault();
    });

    if (localStorage.getItem('todos')) {
        $('.localStor').html(localStorage.getItem('todos'));
    }

    var $input = $('.enter_task input'),
        $button = $('.enter_task button'),
        $button_clear = $('.clear'),
        flag = false;

    $input.focus();

    function addTask(listItem) {
        $('.new').append('<div class="wrap"></div>');
        $('.new .wrap:empty').animate({height: '+=30px'});
        setTimeout(function () {
            $('.new .wrap:empty').append('<div class="create"><div class="icon" dissabled><a href=""><i class="fa fa-square-o"></i></a></div><div class="task"><li>' + listItem + '</li></div><div class="icon2"><a href=""><i class="fa fa-times"></i></a></div></div>');
        }, 400);
    }

    function addMarked(listMarked) {
        $('.finished').prepend('<div class="wrap"></div>');
        $('.finished .wrap:empty').animate({height: '+=30px'});
        setTimeout(function () {
            $('.finished .wrap:empty').append('<div class="createMarked"><div class="iconMarked"><a href=""><i class="fa fa-check-square-o"></i></a></div><div class="task"><li>' + listMarked + '</li></div><div class="icon2"><a href=""><i class="fa fa-times"></i></a></div></div>');
        }, 500);
    }

    function removeListItem(self) {
        setTimeout(function () {
            $(self.parent()).fadeOut(300);
            $(self.parent().parent()).slideUp(1000);
        }, 300);
        setTimeout(function () {
            $(self.parent().parent()).remove();
        }, 2000);
    }

    $button.on('click', function (e) {
        var listItem;
        e.preventDefault();
        if ($input.val() !== "") {
            listItem = $('.enter_task input').val();
            addTask(listItem);
            $input.val("").focus();
        } else {
            $input.focus();
        }
    });

    $button_clear.on('click', function (e) {
        e.preventDefault();
        $('.localStor').remove();
    });

    $(document).on('click', '.icon', function () {
        var self,
            listMarked;

        if (flag) {
            return false;
        }
        flag = true;

        $('i', this).replaceWith('<i class="fa fa-check-square-o"></i>').attr({disabled: true});
        self = $(this);
        removeListItem(self);
        $('.hr1').show(300);

        listMarked = $(this).next().text();
        setTimeout(function () {
            addMarked(listMarked);
        }, 300);
        setTimeout(function () {
            flag = false;
        }, 500);
    });

    $(document).on('click', '.iconMarked', function () {
        var self, listItem;
        if (flag) {
            return false;
        }
        flag = true;

        $('i', this).replaceWith('<i class="fa fa-square-o"></i>');

        self = $(this);
        removeListItem(self);

        listItem = $(this).next().text();
        setTimeout(function () {
            addTask(listItem);
        }, 300);
        setTimeout(function () {
            flag = false;
        }, 500);

        setTimeout(function () {
            if ($('.finished').children().length < 2) {
                $('.hr1').hide(300);
            }
        }, 700);
    });

    $(document).on('click', '.icon2', function () {
        var self = $(this);
        $(self.parent()).fadeOut(300);
        setTimeout(function () {
            $(self.parent().parent()).slideUp(1000);
        }, 300);
        setTimeout(function () {
            $(self.parent().parent()).remove();
        }, 20);
    });

}(jQuery));