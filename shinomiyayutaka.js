let menuChangeWait = 400;
let menumode = 4;
let setTimes = [];
let mailAddress = 'yutaka.s.arts';
let gmail = '@gmail.com';

menus = ['Main', 'About', 'Character', 'Content', 'Link', 'Work', 'Contact', 'Art'];
menus_id = ['main_card_', 'about_card_', 'character_card_', 'content_card_', 'link_card_', 'work_card_', 'contact_card_', 'art_card_'];


$(function () {
    $('.news').load('news.html');
});

$(function () {
    $('.works').load('works.html');
});

$(window).on('load', function () {
    allHide();
    if (navigator.userAgent.indexOf('Android') > 0) {
        $('.use_svh').addClass('android');
    }   

    // 音楽歴
    let music_text = $('#music_h').text();

    var date1 = new Date(2023, 9, 19);
    var date2 = new Date();
    var termDay = (date2 - date1) / 86400000;
    let yy = Math.floor(termDay / 365);
    let mm = Math.floor((termDay - 365 * yy) / 30);

    music_text = music_text.replace('yy',yy);
    $('#music_h').text(music_text.replace('mm',mm));

    $('.gmail_address').text(mailAddress + gmail);
    let flag = localStorage.getItem("comic_world");
    if (flag == "broken" || flag == "true") {
        $('.comic_b').addClass('state');
    } else {
        $('.comic_n').addClass('state');
    }
    enterLoad();
    setTimeout(() => {
        $('.loading').addClass('loaded_e');
    }, 0);
    setTimeout(() => {
        menuChange(menus[menumode]);
    }, 0);
});

function enterLoad() {
    let i = 0;
    $('.enter').each(function (j, e) {
        setTimeout(function () {
            $(e).addClass('loaded_e');
        }, 60 + i * 80);
        i++;
    });
}

$('.enter').on('click', function () {
    $('.enter_wrap').removeClass('ld');
    if (this.dataset.id == menumode) return;
    $('.enter').removeClass('now');
    cancelLoad();
    menumode = this.dataset.id;
    menuChange(menus[menumode]);
    return false;
});

$('.enter_open').on('click', function () {
    $('.enter_wrap').toggleClass('ld');
    return false;
});

$('.enter_wall').on('click', function () {
    $('.enter_wrap').removeClass('ld');
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

$('.contact_exp_mail').on('click', function () {
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
    $('#enter_id_' + menumode).addClass('now');
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