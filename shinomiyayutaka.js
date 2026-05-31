const mailAddress = 'yutaka.s.arts';
const gmail = '@gmail.com';
const menuChangeWait = 400;
const menus = ['About', 'Music', 'Link', 'Work', 'Contact'];
const menus_id = ['about_card_', 'music_card_', 'link_card_', 'work_card_', 'contact_card_'];
const musicCount = 9;

let menumode = 1;
let setTimes = [];

//$(function () {
//    $('.news').load('news.html');
//});
$(function () {
    //実績
    $('.works').load('works.html');

    //URLパラメータ：メニューID指定
    let params = new URLSearchParams(document.location.search);
    if (params.get("m") != null) {
        menumode = parseInt(params.get("m"), 10)
        if (menumode >= menus.length || menumode < 0) {
            menumode = 1;
        }
    }

    //MUSIC
    let musicFlexCount = 0;
    let musicId = '';
    for (let mc = 0; mc < musicCount; mc++) {
        //flexの追加
        if (mc % 4 == 0) {
            musicFlexCount++;
            $('.music_content').append(`<div class="music_block_flex" id="${'music_block_flex_' + musicFlexCount}"></div>`);
        }
        //musicId生成
        musicId = ('000' + (musicCount - mc)).slice(-3);
        //カードの追加
        $('#music_block_flex_' + musicFlexCount).append(`
            <div class="music_block_pad" id="music_card_${mc}" data-musicId="${musicId}">
                <div class="music_block">
                    <div class="music_block_icon">
                        <img class="img_wall" src="images/n.png"></img>
                        <img class="music_block_icon_img" src="images/mv/${musicId}/${musicId}_01.png" alt="thumbnail">
                    </div>
                    <div class="music_block_line">
                    </div>
                </div>
            </div>
        `);
        //タイトル生成
        $('#music_card_' + mc + ' > .music_block > .music_block_line').load('./music/music' + musicId + '.html .dialog_music_title_jp > p');
    }
});

$(window).on('load', function () {
    allHide();
    if (navigator.userAgent.indexOf('Android') > 0) {
        $('.use_svh').addClass('android');
    }

    //音楽歴
    let music_text = $('#music_h').text();

    var date1 = new Date(2023, 9, 19);
    var date2 = new Date();
    var termDay = (date2 - date1) / 86400000;
    let yy = Math.floor(termDay / 365);
    let mm = Math.floor((termDay - 365 * yy) / 30);

    music_text = music_text.replace('yy', yy);
    $('#music_h').text(music_text.replace('mm', mm));

    //メールアドレス
    $('.gmail_address').text(mailAddress + gmail);

    //漫画ギミック
    let flag = localStorage.getItem("comic_world");
    if (flag == "broken" || flag == "true") {
        $('.comic_b').addClass('state');
    } else {
        $('.comic_n').addClass('state');
    }

    //表示開始
    enterLoad();
    setTimeout(() => {
        $('.loading').addClass('loaded_e');
    }, 0);
    setTimeout(() => {
        //URLパラメータ：MisicID指定
        let params = new URLSearchParams(document.location.search);
        if (params.get("music") != null) {
            let mId = parseInt(params.get("music"), 10)
            if (0 < mId && mId <= musicCount) {
                let musicId = ('000' + mId).slice(-3);
                menumode = 1;
                musicDialogChange(musicId);
                //ダイアログ表示
                $('.dialog_music').addClass('show');
            }
        }
        menuChange(menus[menumode]);
    }, 0);
});

//メニュースライド表示アニメーション
function enterLoad() {
    let i = 0;
    $('.enter').each(function (j, e) {
        setTimeout(function () {
            $(e).addClass('loaded_e');
        }, 60 + i * 80);
        i++;
    });
}

//クリック：メニュー
$('.enter').on('click', function () {
    $('.enter_wrap').removeClass('ld');
    if (this.dataset.id == menumode) return;
    $('.enter').removeClass('now');
    cancelLoad();
    menumode = this.dataset.id;
    menuChange(menus[menumode]);
    return false;
});

//メニュー切り替え
function menuChange(menu) {
    $('#enter_id_' + menumode).addClass('now');
    $('.loaded').removeClass('loaded');
    setTimeout(() => {
        allHide();
    }, menuChangeWait);
    loadAnim('.' + menu, menuChangeWait);
    cardShow();
}

//カード表示
function cardShow() {
    let cnt_card = $('[id^="' + menus_id[menumode] + '"]').length;
    for (let num = 0; num < cnt_card; num++) {
        loadAnim('#' + menus_id[menumode] + num, menuChangeWait + num * 30);
    }
}

//メニューカード非表示
function allHide() {
    for (let menu of menus) {
        $('.' + menu).hide();
    }
}

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

//クリック：MUSICカード
$('body').on('click', '.music_block_pad', function () {
    //musicId取得
    let id = this.dataset.musicid;
    musicDialogChange(id);
    //ダイアログ表示
    $('.dialog_music').addClass('show');
});

//クリック：リンクカード
$('.link_block_pad').on('click', function () {
    if (this.dataset.url) {
        window.open(this.dataset.url, '_blank');
        return false;
    }
    //メール
    $('.dialog_mail').addClass('show');
});

//クリック：メールカード
$('.contact_exp_mail').on('click', function () {
    $('.dialog_mail').addClass('show');
});

//クリック：コンテンツカード
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

//ダイアログ：MUSIC　内容切り替え
function musicDialogChange(id) {
    //メインイメージ切り替え
    $('.music_main_img').attr('src', 'images/mv/' + id + '/' + id + '_01.png');
    //サブイメージ切り替え
    $('#music_sub_img_01').attr('src', 'images/mv/' + id + '/' + id + '_01.png');
    $('#music_sub_img_02').attr('src', 'images/mv/' + id + '/' + id + '_02.png');
    $('#music_sub_img_03').attr('src', 'images/mv/' + id + '/' + id + '_03.png');
    $('#music_sub_img_04').attr('src', 'images/mv/' + id + '/' + id + '_04.png');
    //枠の切り替え
    $('.dialog_music_sub').removeClass('selected');

    //各種リンク欄切り替え
    $('.dialog_music_link_area').load('./music/music' + id + '.html .dialog_music_link_content');
    //説明文切り替え
    $('.dialog_music_info_area').load('./music/music' + id + '.html .dialog_music_info_content');
}

//ダイアログ：MUSIC　とじるボタン
$('.dislog_music_close_icon_pc, .dislog_music_close_icon_tab').on('click', function () {
    $('.dialog_music').removeClass('show');
});

//ダイアログ：MUSIC　外側クリック
$('.dialog_music').on('click', function (e) {
    if ($(e.target).hasClass('dialog_music show')) {
        $('.dialog_music').removeClass('show');
    }
});

//クリック：MUSIC　サブイメージ
$('.dialog_music_sub').on('click', function () {
    //枠の切り替え
    $('.dialog_music_sub').removeClass('selected');
    $(this).addClass('selected');
    //メインイメージの切り替え
    $('.music_main_img').attr('src', $(this).find('.music_sub_img').attr('src'));
});

//ダイアログ：メール　とじるボタン
$('.dialog_mail_close').on('click', function () {
    $('.dialog_mail').removeClass('show');
    $('.gmail_address_get_copied').removeClass('show');
});

//ダイアログ：コンタクト　とじるボタン
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
$('.hidden_iframe').on('load', function () {
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