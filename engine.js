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
    // Step 1
    ['bear', 'bore', 'borne/born', 'supporter/mettre au monde'],
    ['beat', 'beat', 'beaten', 'battre'],
    ['become', 'became', 'become', 'devenir'],
    ['begin', 'began', 'begun', 'commencer'],
    ['bleed', 'bled', 'bled', 'saigner'],
    ['blow', 'blew', 'blown', 'souffler'],
    ['bring', 'brought', 'brought', 'apporter'],
    ['build', 'built', 'built', 'construire'],
    ['buy', 'bought', 'bought', 'acheter'],
    ['come', 'came', 'come', 'venir'],
    ['creep', 'crept', 'crept', 'ramper'],
    ['cut', 'cut', 'cut', 'couper'],
    ['dig', 'dug', 'dug', 'creuser'],
    ['do', 'did', 'done', 'faire'],
    ['drink', 'drank', 'drunk', 'boire'],
    ['drive', 'drove', 'driven', 'conduire'],
    ['eat', 'ate', 'eaten', 'manger'],
    ['fight', 'fought', 'fought', 'se battre'],
    ['fly', 'flew', 'flown', 'voler (air)'],
    ['get', 'got', 'got', 'obtenir'],
    ['go', 'went', 'gone', 'aller'],
    ['grow', 'grew', 'grown', 'grandir'],
    ['hang', 'hung', 'hung', 'suspendre'],
    ['hurt', 'hurt', 'hurt', 'faire mal'],
    ['lay', 'laid', 'laid', 'poser'],
    ['lend', 'lent', 'lent', 'preter'],
    ['let', 'let', 'let', 'laisser'],
    ['lose', 'lost', 'lost', 'perdre'],
    ['pay', 'paid', 'paid', 'payer'],
    ['ride', 'rode', 'ridden', 'chevaucher'],
    ['ring', 'rang', 'rung', 'sonner'],
    ['rise', 'rose', 'risen', 'se lever'],
    ['run', 'ran', 'run', 'courir'],
    ['say', 'said', 'said', 'dire'],
    ['send', 'sent', 'sent', 'envoyer'],
    ['set', 'set', 'set', 'regler'],
    ['sew', 'sewed', 'sewn', 'coudre'],
    ['shine', 'shone', 'shone', 'briller'],
    ['shoot', 'shot', 'shot', 'tirer un coup de feu'],
    ['show', 'showed', 'shown', 'montrer'],
    ['shrink', 'shrank', 'shrunk', 'retrecir'],
    ['spend', 'spent', 'spent', 'depenser'],
    ['stick', 'stuck', 'stuck', 'coller'],
    ['sting', 'stung', 'stung', 'piquer'],
    ['tear', 'tore', 'torn', 'déchirer'],
    ['swear', 'swore', 'sworn', 'jurer'],
    ['think', 'thought', 'thought', 'penser'],
    ['wear', 'wore', 'worn', 'porter'],
    ['write', 'wrote', 'written', 'écrire'],
    ['bet', 'bet', 'bet', 'parier'],
    // ------
    // Step 2
    ['bite', 'bit', 'bitten', 'mordre'],
    ['break', 'broke', 'broken', 'casser'],
    ['burn', 'burnt', 'burnt', 'bruler'],
    ['catch', 'caught', 'caught', 'attraper'],
    ['feed', 'fed', 'fed', 'nourir'],
    ['feel', 'felt', 'felt', 'ressentir'],
    ['have', 'had', 'had', 'avoir'],
    ['hear', 'heard', 'heard', 'entendre'],
    ['hide', 'hid', 'hidden', 'cacher'],
    ['know', 'knew', 'known', 'savoir'],
    ['learn', 'learnt', 'learnt', 'apprendre'],
    ['put', 'put', 'put', 'mettre'],
    ['shake', 'shook', 'shaken', 'secouer'],
    ['shut', 'shut', 'shut', 'fermer'],
    ['sing', 'sang', 'sung', 'chanter'],
    ['sink', 'sank', 'sunk', 'couler/sombrer'],
    ['swing', 'swung', 'swung', 'se balancer'],
    ['take', 'took', 'taken', 'prendre'],
    ['teach', 'taught', 'taught', 'enseigner'],
    ['throw', 'threw', 'thrown', 'jeter'],
    // ------
    // Step 3
    // ['be', 'was/were', 'been', 'быть'],
    // ['bend', 'bent', 'bent', 'гнуть'],
    // ['burst', 'burst', 'burst', 'лопаться, взрываться'],
    // ['choose', 'chose', 'chosen', 'выбирать'],
    // ['cost', 'cost', 'cost', 'стоить'],
    // ['draw', 'drew', 'drawn', 'рисовать, чертить'],
    // ['dream', 'dreamed/dreamt', 'dreamed/dreamt', 'мечтать'],
    // ['fall', 'fell', 'fallen', 'падать'],
    // ['find', 'found', 'found', 'находить'],
    // ['forget', 'forgot', 'forgotten', 'забывать'],
    // ['forgive', 'forgave', 'forgiven', 'прощать'],
    // ['freeze', 'froze', 'frozen', 'замерзать'],
    // ['give', 'gave', 'given', 'давать'],
    // ['hit', 'hit', 'hit', 'ударять'],
    // ['hold', 'held', 'held', 'держать'],
    // ['keep', 'kept', 'kept', 'держать, хранить'],
    // ['kneel', 'knelt', 'knelt', 'становиться на колени'],
    // ['lead', 'led', 'led', 'вести, влиять, руководить'],
    // ['leave', 'left', 'left', 'покидать, оставлять'],
    // ['lie', 'lay', 'lain', 'обманывать, лгать'],
    // ['light', 'lit', 'lit', 'освещать'],
    // ['make', 'made', 'made', 'делать, создавать'],
    // ['mean', 'meant', 'meant', 'означать'],
    // ['meet', 'met', 'met', 'встречать'],
    // ['read', 'read', 'read', 'читать'],
    // ['see', 'saw', 'seen', 'видеть'],
    // ['sell', 'sold', 'sold', 'продавать'],
    // ['sit', 'sat', 'sat', 'сидеть'],
    // ['sleep', 'slept', 'slept', 'спать'],
    // ['slide', 'slid', 'slid', 'скользить'],
    // ['smell', 'smelled/smelt', 'smelled/smelt', 'нюхать, пахнуть'],
    // ['speak', 'spoke', 'spoken', 'говорить'],
    // ['spill', 'spilled/spilt', 'spilled/spilt', 'проливать'],
    // ['spoil', 'spoiled/spoilt', 'spoiled/spoilt', 'портить, наносить ущерб'],
    // ['stand', 'stood', 'stood', 'стоять'],
    // ['steal', 'stole', 'stolen', 'воровать, красть'],
    // ['swim', 'swam', 'swum', 'плавать'],
    // ['tell', 'told', 'told', 'говорить, сообщать'],
    // ['understand', 'understood', 'understood', 'понимать'],
    // ['wake', 'woke', 'woken', 'просыпаться, бодрствовать'],
    // ['win', 'won', 'won', 'выиграть'],
    // ['can', 'could', 'been able', 'мочь, уметь, быть способным'],
    // ['must', 'had to', 'had to', 'должен, обязан'],
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
