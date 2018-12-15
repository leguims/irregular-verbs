/**
 * Model and controller for the Irregular Verbs web app
 *
 * @author Ilya Ilyankou - Guillaume Rousselot (french translation)
 * @version 0.9
 */

var index = 0; // index of verb in dictionary
var form = 0;  // first, second or third (0, 1, 2 or 3 respectively)
var show = 0;  // first, second or third (0, 1, 2 or 3 respectively)
var correct = 0; // counter of correct answers
var altogether = 0;  // counter of all attempts
var inputTag = '<input type="text" id="myInput" autocomplete="off">';
var level = "";
var timerOk = 0; // Timer to freeze display if answer is OK
var timerKo = 0; // Timer to freeze display if answer is KO

// Initializing the dictionary
var dict =
[
    // ['be', 'was/were', 'been', 'быть'],
    ['bear', 'bore', 'borne/born', 'supporter/mettre au monde'],
    ['beat', 'beat', 'beaten', 'battre'],
    ['become', 'became', 'become', 'devenir'],
    ['begin', 'began', 'begun', 'commencer'],
    // ['bend', 'bent', 'bent', 'гнуть'],
    // ['bite', 'bit', 'bitten', 'кусать'],
    ['bleed', 'bled', 'bled', 'saigner'],
    ['blow', 'blew', 'blown', 'souffler'],
    // ['break', 'broke', 'broken', 'ломать, разрушать'],
    ['bring', 'brought', 'brought', 'apporter'],
    ['build', 'built', 'built', 'construire'],
    // ['burn', 'burned/burnt', 'burned/burnt', 'гореть'],
    // ['burst', 'burst', 'burst', 'лопаться, взрываться'],
    ['buy', 'bought', 'bought', 'acheter'],
    // ['catch', 'caught', 'caught', 'ловить'],
    // ['choose', 'chose', 'chosen', 'выбирать'],
    ['come', 'came', 'come', 'venir'],
    // ['cost', 'cost', 'cost', 'стоить'],
    ['creep', 'crept', 'crept', 'ramper'],
    ['cut', 'cut', 'cut', 'couper'],
    ['dig', 'dug', 'dug', 'creuser'],
    ['do', 'did', 'done', 'faire'],
    // ['draw', 'drew', 'drawn', 'рисовать, чертить'],
    // ['dream', 'dreamed/dreamt', 'dreamed/dreamt', 'мечтать'],
    ['drink', 'drank', 'drunk', 'boire'],
    ['drive', 'drove', 'driven', 'conduire'],
    ['eat', 'ate', 'eaten', 'manger'],
    // ['fall', 'fell', 'fallen', 'падать'],
    // ['feed', 'fed', 'fed', 'кормить'],
    // ['feel', 'felt', 'felt', 'чувствовать'],
    ['fight', 'fought', 'fought', 'se battre'],
    // ['find', 'found', 'found', 'находить'],
    ['fly', 'flew', 'flown', 'voler (air)'],
    // ['forget', 'forgot', 'forgotten', 'забывать'],
    // ['forgive', 'forgave', 'forgiven', 'прощать'],
    // ['freeze', 'froze', 'frozen', 'замерзать'],
    ['get', 'got', 'got', 'obtenir'],
    // ['give', 'gave', 'given', 'давать'],
    ['go', 'went', 'gone', 'aller'],
    ['grow', 'grew', 'grown', 'grandir'],
    ['hang', 'hung', 'hung', 'suspendre'],
    // ['have', 'had', 'had', 'иметь'],
    // ['hear', 'heard', 'heard', 'слышать'],
    // ['hide', 'hid', 'hidden', 'прятаться'],
    // ['hit', 'hit', 'hit', 'ударять'],
    // ['hold', 'held', 'held', 'держать'],
    ['hurt', 'hurt', 'hurt', 'faire mal'],
    // ['keep', 'kept', 'kept', 'держать, хранить'],
    // ['kneel', 'knelt', 'knelt', 'становиться на колени'],
    // ['know', 'knew', 'known', 'знать'],
    ['lay', 'laid', 'laid', 'poser'],
    // ['lead', 'led', 'led', 'вести, влиять, руководить'],
    // ['learn', 'learned/learnt', 'learned/learnt', 'учиться'],
    // ['leave', 'left', 'left', 'покидать, оставлять'],
    ['lend', 'lent', 'lent', 'preter'],
    ['let', 'let', 'let', 'laisser'],
    // ['lie', 'lay', 'lain', 'обманывать, лгать'],
    // ['light', 'lit', 'lit', 'освещать'],
    ['lose', 'lost', 'lost', 'perdre'],
    // ['make', 'made', 'made', 'делать, создавать'],
    // ['mean', 'meant', 'meant', 'означать'],
    // ['meet', 'met', 'met', 'встречать'],
    ['pay', 'paid', 'paid', 'payer'],
    // ['put', 'put', 'put', 'класть'],
    // ['read', 'read', 'read', 'читать'],
    ['ride', 'rode', 'ridden', 'chevaucher'],
    ['ring', 'rang', 'rung', 'sonner'],
    ['rise', 'rose', 'risen', 'se lever'],
    ['run', 'ran', 'run', 'courir'],
    ['say', 'said', 'said', 'dire'],
    // ['see', 'saw', 'seen', 'видеть'],
    // ['sell', 'sold', 'sold', 'продавать'],
    ['send', 'sent', 'sent', 'envoyer'],
    ['set', 'set', 'set', 'regler'],
    ['sew', 'sewed', 'sewn', 'coudre'],
    // ['shake', 'shook', 'shaken', 'трясти'],
    ['shine', 'shone', 'shone', 'briller'],
    ['shoot', 'shot', 'shot', 'tirer un coup de feu'],
    ['show', 'showed', 'shown', 'montrer'],
    // ['shut', 'shut', 'shut', 'закрывать'],
    // ['sing', 'sang', 'sung', 'петь'],
    // ['sink', 'sank', 'sunk', 'тонуть, погружаться'],
    // ['sit', 'sat', 'sat', 'сидеть'],
    ['shrink', 'shrank', 'shrunk', 'retrecir'],
    // ['sleep', 'slept', 'slept', 'спать'],
    // ['slide', 'slid', 'slid', 'скользить'],
    // ['smell', 'smelled/smelt', 'smelled/smelt', 'нюхать, пахнуть'],
    // ['speak', 'spoke', 'spoken', 'говорить'],
    ['spend', 'spent', 'spent', 'depenser'],
    // ['spill', 'spilled/spilt', 'spilled/spilt', 'проливать'],
    // ['spoil', 'spoiled/spoilt', 'spoiled/spoilt', 'портить, наносить ущерб'],
    // ['stand', 'stood', 'stood', 'стоять'],
    // ['steal', 'stole', 'stolen', 'воровать, красть'],
    ['stick', 'stuck', 'stuck', 'coller'],
    ['sting', 'stung', 'stung', 'piquer'],
    // ['swim', 'swam', 'swum', 'плавать'],
    // ['take', 'took', 'taken', 'брать'],
    // ['teach', 'taught', 'taught', 'учить'],
    ['tear', 'tore', 'torn', 'déchirer'],
    ['swear', 'swore', 'sworn', 'jurer'],
    // ['tell', 'told', 'told', 'говорить, сообщать'],
    ['think', 'thought', 'thought', 'penser'],
    // ['throw', 'threw', 'thrown', 'бросать'],
    // ['understand', 'understood', 'understood', 'понимать'],
    // ['wake', 'woke', 'woken', 'просыпаться, бодрствовать'],
    ['wear', 'wore', 'worn', 'porter'],
    // ['win', 'won', 'won', 'выиграть'],
    ['write', 'wrote', 'written', 'écrire'],
    // ['can', 'could', 'been able', 'мочь, уметь, быть способным'],
    // ['must', 'had to', 'had to', 'должен, обязан'],
    ['bet', 'bet', 'bet', 'parier'],
    // ['misunderstand', 'misunderstood', 'misunderstood', 'неправильно понимать'],
    // ['broadcast', 'broadcast', 'broadcast', 'вещать (по радио, ТВ)'],
];

function generateVerb() {
  hideAnswer();

    index = Math.floor(Math.random() * dict.length);
    form = Math.floor(Math.random() * 4);
    
  var entry = dict[index];

  if(level == "Hard")
  {
    do {show = Math.floor(Math.random() * 4);}while(form==show);
    
    $('#first').text("[Infinitive]");
    $('#second').text("[Simple Past]");
    $('#third').text("[Past Participle]");
    $('#local').text("[francais]");

    switch (show) {
      case 0:
        $('#first').text(entry[0]);
        break;
      case 1:
        $('#second').text(entry[1]);
        break;
      case 3:
        $('#local').text(entry[3]);
        break;
      default:
        $('#third').text(entry[2]);
    }
  }
  else
  {
    $('#first').text(entry[0]);
    $('#second').text(entry[1]);
    $('#third').text(entry[2]);
    $('#local').text(entry[3]);
  }

  switch (form) {
    case 0:
      $('#first').html(inputTag);
      break;
    case 1:
      $('#second').html(inputTag);
      break;
    case 3:
      $('#local').html(inputTag);
      break;
    default:
    $('#third').html(inputTag);
  }

    $('#myInput').focus();
}


function checkVerb() {
    var myInput = $("#myInput").val().trim().toLowerCase();
  myInput = '$' + myInput + '$';

  //var correctInput = '$' + dict[index][form].replace('/', '$') + '$';
  var correctInput = '$' + dict[index][form] + '$'; // Needs all possibilities
  var timer = 0;

  if(level == "Hard")
  {
    var entry = dict[index];
    switch (form) {
      case 0:
        $('#second').text(entry[1]);
        $('#third').text(entry[2]);
        $('#local').text(entry[3]);
        break;
      case 1:
        $('#first').text(entry[0]);
        $('#third').text(entry[2]);
        $('#local').text(entry[3]);
        break;
      case 3:
        $('#first').text(entry[0]);
        $('#second').text(entry[1]);
        $('#third').text(entry[2]);
        break;
      default:
        $('#first').text(entry[0]);
        $('#second').text(entry[1]);
        $('#local').text(entry[3]);
    }
  }

  if (correctInput.indexOf(myInput) > -1) {
    correct++;
    $("#myInput").css({backgroundColor: 'YellowGreen'});
    timer = timerOk;
  } else {
    $('#myInput').css({backgroundColor: 'DarkSalmon'});
    showAnswer();
    timer = timerKo;
  }

  setTimeout(generateVerb, timer);

  updateCounters();
}

function updateCounters() {
  $('#counterCorrect').text(correct);
  $('#counterAltogether').text(altogether);
}

function showAnswer() {
  $('#answer').text(dict[index][form]).show();
}

function hideAnswer() {
  $('#answer').hide();
}

$(document).ready(function() {
    level = $("#level").attr("value");
    if(level == "Hard")
    {
      timerOk = 3000;
      timerKo = 4000;
    }
    else
    {
      timerOk = 1500;
      timerKo = 3000;
    }

    generateVerb();

    $("form").submit(function () {
    altogether++;
        if ($("#myInput").attr("value") == "") {return false;}
        $("#myInput").attr({disabled: 'disabled'});
        checkVerb();
        return false;
    });
});
