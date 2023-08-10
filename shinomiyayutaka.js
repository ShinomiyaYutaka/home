let menuChangeWait = 400;
let menumode = 0;
let setTimes = [];
let mailAddress = 'yutaka.s.arts';
let gmail = '@gmail.com';

menus = ['Main', 'About', 'Character', 'Content', 'Link', 'Work', 'Contact'];
menus_id = ['main_card_', 'about_card_', 'character_card_', 'content_card_', 'link_card_', 'Work', 'contact_card_'];


$(function () {
    $('.news').load('news.html');
});

$(window).on('load', function () {
    allHide();
    $('.gmail_address').html(mailAddress + gmail);
    let flag = localStorage.getItem("comic_world");
    if (flag == "broken" || flag == "true") {
        $('.comic_b').addClass('state');
    } else {
        $('.comic_n').addClass('state');
    }
    enterLoad();
    setTimeout(() => {
        $('.loading').addClass('loaded_e');
    }, 1200);
    setTimeout(() => {
        menuChange(menus[menumode]);
    }, 2800);
});

function enterLoad() {
    let i = 0;
    $('.enter').each(function (j, e) {
        setTimeout(function () {
            $(e).addClass('loaded_e');
        }, 2000 + i * 80);
        i++;
    });
}

$('.enter').on('click', function () {
    if (this.dataset.id == menumode) return;
    $('.enter').removeClass('now');
    $(this).addClass('now');
    cancelLoad();
    menumode = this.dataset.id;
    menuChange(menus[menumode]);
    return false;
});

$('.character_box_exp_icon').on('click', function () {
    if (this.dataset.url) {
        window.open(this.dataset.url, '_blank');
        return false;
    }
});

$('.chara_select_box').on('click', function () {
    $('.character_id_box').removeClass('loaded_chara');
    $('#chara_id_box_' + this.dataset.id).addClass('loaded_chara');
});

$('.link_block_pad').on('click', function () {
    if (this.dataset.url) {
        window.open(this.dataset.url, '_blank');
        return false;
    }
    $('.dialog_mail').addClass('show');
});

$('.content_block_pad').on('click', function () {
    if (this.dataset.url) {
        window.open(this.dataset.url, '_blank');
        return false;
    }
    window.open('https://shinomiyayutaka.github.io/comic1/comic_one/comic/', '_self');
});

$('.btn_gmail_copy').on('click', function () {
    navigator.clipboard.writeText(mailAddress + gmail);
    $('.gmail_address_get_copied').addClass('show');
});

$('.dialog_mail_close').on('click', function () {
    $('.dialog_mail').removeClass('show');
    $('.gmail_address_get_copied').removeClass('show');
});

$('.dialog_contact_close').on('click', function () {
    $('.dialog_contact').removeClass('show');
});

$('input').on("keydown", function (e) {
    if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
        return false;
    } else {
        return true;
    }
});

let submitted = false;
function check() {
    if (window.confirm('送信してよろしいですか？')) { // 確認ダイアログを表示
        submitted = true;
        return true; // 「OK」時は送信を実行
    }
    else { // 「キャンセル」時の処理
        return false; // 送信を中止
    }
}
$('.hidden_iframe').on('load', function() {
    if (submitted) {
        submitted = false;
        document.input_form.reset();
        $('.dialog_contact').addClass('show');
    }
});

function loadAnim(className, time) {
    let timeId = setTimeout(function () {
        $(className).show();
        $(className).addClass('loaded');
    }, time);
    setTimes.push(timeId);
}

function cancelLoad() {
    for (let timeId of setTimes) {
        clearTimeout(timeId);
    }
    setTimes = [];
}

function menuChange(menu) {
    $('.loaded').removeClass('loaded');
    setTimeout(() => {
        allHide();
    }, menuChangeWait);
    loadAnim('.' + menu, menuChangeWait);
    cardShow();
}

function allHide() {
    for (let menu of menus) {
        $('.' + menu).hide();
    }
}

function cardShow() {
    let cnt_card = $('[id^="' + menus_id[menumode] + '"]').length;
    for (let num = 0; num < cnt_card; num++) {
        loadAnim('#' + menus_id[menumode] + num, menuChangeWait + num * 60);
    }
}