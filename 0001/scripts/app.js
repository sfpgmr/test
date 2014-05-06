/// <reference path="/scripts/jquery-2.1.0-vsdoc.js" />
/// <reference path="./scripts/nsx1.js" />
/// <reference path="/scripts/bootstrap-slider.js" />
/// <reference path="/scripts/jquery.knob.js" />
/// <reference path="./scripts/WebMIDIAPI.js" />
/// <reference path="./scripts/text2sysex.js" />
/// <reference path="./scripts/SMFreader.js" />
/// <reference path="./scripts/sequencer.js" />

// midi out select modal

//var $midiOutModal=$("#midiOutSelM").modal({
//    show: false
//});
//$("#divSetOutput").on("click", function() {
//    $midiOutModal.modal("show");
//});
//$("#midiOutSelM").on("shown.bs.modal", function(event) {
//    clearAllAlertMessageInModal("divMidiOutSelWarning");
//    showMidiInOutSelM("divMidiOutSelWarning", "OUT");
//});
//$("#midiOutSelM").on("hidden.bs.modal", function(event) {
//    clearAllAlertMessageInModal("divMidiOutSelWarning");
//});

//// midi in select modal
//var $midiInModal=$("#midiInSelM").modal({
//    show: false
//});
//$("#divSetInput").on("click", function() {
//    $midiInModal.modal("show");
//});
//$("#midiInSelM").on("shown.bs.modal", function(event) {
//    clearAllAlertMessageInModal("divMidiInSelWarning");
//    showMidiInOutSelM("divMidiInSelWarning", "IN");
//});
//$("#midiInSelM").on("hidden.bs.modal", function(event) {
//    clearAllAlertMessageInModal("divMidiInSelWarning");
//});

//function clearAllAlertMessageInModal(parentElem) {
//    var messageInModal=document.getElementById(parentElem);
//    while(messageInModal.firstChild) {
//        messageInModal.removeChild(messageInModal.firstChild);
//    }
//}

//function showMidiInOutSelM(elem, checkType) {
//    var message="", className="", elemName="";
//    switch(checkType) {
//      case "IN":
//        elemName="divSetInput";
//        if(outputs.length<1) {
//            message="Please Connect MIDI input devices to use.";
//        } else {
//            message="Select MIDI input device.";
//            className="alert alert-info";
//        }
//        break;
//      case "OUT":
//        elemName="divSetOutput";
//        if(outputs.length<1) {
//            message="Please Connect MIDI output devices. This application needs at least one MIDI Device.";
//            className="alert alert-danger";
//        } else {
//            message="Select MIDI output device.";
//            className="alert alert-info";
//        } 
//        break;
//    }

//    if(message!="") {
//        var divAlert=document.createElement("div");
//        divAlert.className=className;
//        divAlert.innerHTML=message;
//        document.getElementById(elem).appendChild(divAlert);
//    }
//    var type="click";
//    var e=document.createEvent('MouseEvent');
//    var b=document.getElementById(elemName);
//    e.initEvent(type, true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
//    b.dispatchEvent(e);
//}

// sing mode
/*
var singMode="inputtext"; // autodoremi
document.getElementById("inputTextMode").addEventListener("click", function(event){
    singMode="inputtext";
    document.getElementById("inputText").removeAttribute("disabled");
    document.getElementById("inputTextButton").removeAttribute("disabled");
    document.getElementById("modeName").innerHTML="<span class=\"glyphicon glyphicon-pencil\"></span> InputText</span>";

    // automatically send text
    var type="click";
    var e=document.createEvent('MouseEvent');
    var b=document.getElementById("inputTextButton");
    e.initEvent(type, true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    b.dispatchEvent(e);    
});

document.getElementById("autoDoremiMode").addEventListener("click", function(event){
    singMode="autodoremi";
    document.getElementById("inputText").setAttribute("disabled", "disabled");
    document.getElementById("inputTextButton").setAttribute("disabled", "disabled");
    document.getElementById("setletter").innerHTML=" --";
    document.getElementById("modeName").innerHTML="<span class=\"glyphicon glyphicon-music\"></span> DoReMi</span>";
});

*/
//Web MIDI API
//var MIDI;
//var inputs, outputs;
//var mIn, mOut;

//navigator.requestMIDIAccess({sysex: true}).then( scb, ecb );
//function scb(access) {
//    MIDI = access;
//    outputs=MIDI.outputs();
//    inputs=MIDI.inputs();
//    if(MIDI.sysexEnabled)
//    {
//      alert("sysex support");
//    }

//    // MIDI IN
//    var mi=document.getElementById("midiInSel");
//    for(var i=0; i<inputs.length; i++) {
//        // in modal
//        mi.options[i]=new Option(inputs[i]["name"], i);

//        document.getElementById("midiInSelB").addEventListener("click", function ()
//        {
//          var selIdx = document.getElementById("midiInSel").selectedIndex;
//          mIn = inputs[selIdx];
//          $("#midiInSelM").modal("hide");
//          document.getElementById("setInput").innerHTML = inputs[selIdx].name;
//          /*
//          document.getElementById("divSetInput").style.setProperty("background-color", "#5cb85c");
//          document.getElementById("divSetInput").style.setProperty("border-color", "#5cb8af");
//          document.getElementById("divSetInput").style.setProperty("color", "#ffffff");
//          */

//          mIn.onmidimessage = function (event)
//          {
//            if (typeof mOut == "object")
//            {
//              mOut.send(event.data);
///*              switch (singMode)
//              {
//                case "inputtext":
//                  mOut.send(event.data);
//                  break;
//                case "autodoremi":
//                  if (event.data[0] == 0x80 || event.data[0] == 0x90)
//                  {
//                    var w = nsx1.getSysExByNoteNo(event.data[1]);
//                    var now = window.performance.now();
//                    mOut.send(w[0]);
//                    switch (w[1])
//                    {
//                      case 'n':
//                        mOut.send(event.data, now + 3);
//                        break;
//                      case 's':
//                        mOut.send(event.data, now);
//                        mOut.send([event.data[0], event.data[1], 0x00], now + 100); //note off
//                        mOut.send(event.data, now + 100);
//                        mOut.send([event.data[0], event.data[1], 0x00], now + 300); //note off
//                        mOut.send(event.data, now + 300);
//                        break;
//                    }
//                  } else
//                  {
//                    mOut.send(event.data);
//                  }
//                  break;
//              }*/
//            }
//          };
//        });
//    }
//    
//    // MIDI OUT
//    var mo=document.getElementById("midiOutSel");
//    for(var i=0; i<outputs.length; i++) {
//        // in modal
//        mo.options[i]=new Option(outputs[i]["name"], i);
//    }
//    // set device in modal
//    document.getElementById("midiOutSelB").addEventListener("click", function(){
//        var selIdx=document.getElementById("midiOutSel").selectedIndex;
//        selectMidiOut(selIdx);
//        $("#midiOutSelM").modal("hide");

//        // send word
//        var type="click";
//        var e=document.createEvent('MouseEvent');
//        var b=document.getElementById("inputTextButton");
//        e.initEvent(type, true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
//        b.dispatchEvent(e);
//    });
//}

//function ecb(message) {
//    console.log("error", message);
//}

//function disableButton(type) {
//    if(type=="output") {
//        var a="midiout";
//        var b="output";
//    } else if(type=="input"){
//        var a="midiin";
//        var b="select";
//    }
//    document.getElementById(a).setAttribute("disabled", "disabled");
//    document.getElementById(b).setAttribute("disabled", "disabled");
//}


// NSX-1
/*
document.getElementById("inputTextButton").addEventListener("click", function(){
    // check whether midi out is set or not
    if(typeof mOut!="object") {
        showMidiInOutSelM("divMidiOutSelWarning", "OUT", "resetAllController");
        return;
    }

    var text=document.getElementById("inputText").value;
    var sysEx=nsx1.getSysExByText(text);
    var now=window.performance.now();
    for(var i=0; i<sysEx.length; i++) {
        mOut.send(sysEx[i], now+i*10);
    }
    document.getElementById("setletter").innerHTML=text;
});*/

//function selectMidiOut(selIdx) {
//    mOut = outputs[selIdx];
//    document.getElementById("setOutput").innerHTML=outputs[selIdx].name;
//    initEffects();
//    /*
//    document.getElementById("divSetOutput").style.setProperty("background-color", "#5cb85c");
//    document.getElementById("divSetOutput").style.setProperty("border-color", "#5cb8af");
//    document.getElementById("divSetOutput").style.setProperty("color", "#ffffff");*/
//}

function panic(out)
{
  for (var i = 0; i < 16; ++i)
  {
    var msg = [0xB0 | i, 0x79, 0x00];
    out.send(msg);

    var msg = [0xB0 | i, 0x7B, 0x00];
    out.send(msg);

    var msg = [0xB0 | i, 0x78, 0x00];
    out.send(msg);
  }
}

function allNoteOff(out)
{
  for (var i = 0; i < 16; ++i)
  {
    var msg = [0xB0 | i, 0x7B, 0x00];
    out.send(msg);

  }
}

function allSoundOff(out)
{
  for (var i = 0; i < 16; ++i)
  {
    var msg = [0xB0 | i, 0x78, 0x00];
    out.send(msg);
  }
}

// pianoRoll
/*
var pRoll=new PianoRoll();
pRoll.render();
pRoll.movePos({x:0, y:-600});

pRoll.noteOnFunc=function(message, time) {
    var event={ };
    event.data=message;
    switch(singMode) {
      case "inputtext":
        mOut.send(event.data);
        break;
      case "autodoremi":
        if(event.data[0]==0x80 || event.data[0]==0x90) {
            var w=nsx1.getSysExByNoteNo(event.data[1]);
            var now=window.performance.now();
            mOut.send(w[0], now+3);
            switch(w[1]) {
              case 'n':
                mOut.send(event.data);
                break;
              case 's':
                var now=window.performance.now();
                mOut.send(event.data, now);
                mOut.send([event.data[0], event.data[1], 0x00], now+100); //note off
                mOut.send(event.data, now+100);
                mOut.send([event.data[0], event.data[1], 0x00], now+300); //note off
                mOut.send(event.data, now+300);
                break;
            }
        } else {
            mOut.send(event.data);
        }
        break;
    }

    //mOut.send(message, time);
};
pRoll.noteOffFunc=function(message, time) {
    mOut.send(message, time);
};

pRoll.exportNoteStackFunc=function() {
    var inputtext=document.getElementById("inputText").value;
    var content=JSON.stringify({ inputText:inputtext, noteStack: this.noteStack});
    var blob = new Blob([ content ], { "type" : "text/plain" });

    var objectURL = (window.URL || window.webkitURL).createObjectURL(blob);
    var e = document.createEvent('MouseEvent');
    var a = document.createElement('a');
    
    //create element of "a" and set file name in download attribute
    a.download = "test.txt";
    a.href = objectURL;
    
    //fire click event
    e.initEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
};

pRoll.importNoteStackFunc=function(event) {
    var files=event.target.files;
    var out=null;
    
    var that=pRoll;
    var reader=new FileReader();
    reader.onload=function() {
        out=reader.result;

        //var content=JSON.stringify({ inputText:inputtext, noteStack: this.noteStack});
        var contents=JSON.parse(out);
        that.noteStack=contents.noteStack;

        
        document.getElementById("inputText").value=contents.inputText;
        var e = document.createEvent('MouseEvent');
        var b=document.getElementById("inputTextButton");

        //fire click event
        e.initEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        b.dispatchEvent(e);
        
    };
    reader.readAsText(files[0], "utf-8");
};


document.getElementById("actionDelete").addEventListener("click", function(event){
    pRoll.deleteNote();
}, false);

document.getElementById("start").addEventListener("click", function(event){
    // check whether midi out is set or not
    if(typeof mOut!="object") {
        showMidiInOutSelM("divMidiOutSelWarning", "OUT", "resetAllController");
        return;
    }
    
    var tempo=document.getElementById("tempo").value;
    pRoll.moveCurrent(tempo);

    // control button
    document.getElementById("start").setAttribute("disabled", "disabled");
}, false);

document.getElementById("stop").addEventListener("click", function(event){
    // check whether midi out is set or not
    if(typeof mOut!="object") {
        showMidiInOutSelM("divMidiOutSelWarning", "OUT", "resetAllController");
        return;
    }
    
    var tempo=document.getElementById("tempo").value;
    pRoll.stopCurrent();
    // control button
    document.getElementById("start").removeAttribute("disabled");
}, false);

document.getElementById("zero").addEventListener("click", function(event){
    // check whether midi out is set or not
    if(typeof mOut!="object") {
        showMidiInOutSelM("divMidiOutSelWarning", "OUT", "resetAllController");
        return;
    }
    
    pRoll.backPointerToZero();
}, false);

document.getElementById("fileExport").addEventListener("click", function(event){
    pRoll.exportNoteStackFunc();
}, false);

document.getElementById("fileImport").addEventListener("change", pRoll.importNoteStackFunc, false);
*/

function sendCC(out,val1,val2,ch)
{
  if (!ch) ch = 0;
  if(out)
  {
    var msg = [0xb0 | ch,val1,val2];
    out.send(msg);
  }
}

function initEffects(out)
{
  if(out)
  {
    sendCC(out,7,64); // Volume
    sendCC(out,1,0); // Mod
    sendCC(out,0x5b, 0); // reverb
    sendCC(out,0x5d, 0); // chorus
    sendCC(out,0x5e, 0); // variation
  }
}

var song;

function parseSMF(file)
{
  song = new Song(file.name);
  song.stepsPerBeat = file.ticksPerBeat;
  for(var i = 0;i < file.numTracks;++i)
  {
    var track = midiFile.tracks[i];
    var trackName = track.trackName ? track.trackName : "";
    var songTrack = new Track(trackName);
    song.tracks.push(songTrack);
    var events = track.events;
    var noteBuffer = [];
    var step_bkp = 0;
    for(var j = 0,l = events.length;j < l;++j)
    {
      var ev = events[j];
      var step = ev.delta;
      if(step)
      {
        for(var k = 0;k < noteBuffer.length;++k)
        {
          if(noteBuffer[k])
          {
            noteBuffer[k].event.gate += step;
          }
        }
      }
      step += step_bkp;
      step_bkp = 0;
      switch(ev.type)
      {
        case "MIDI":
          switch (ev.midiEventType)
          {
            case 0x08: // Note Off
              for (var k = 0; k < noteBuffer.length; ++k)
              {
                if (noteBuffer[k] && (noteBuffer[k].event.note == ev.parameter1) && (noteBuffer[k].channel == ev.midiChannel))
                {
                  noteBuffer[k] = null;
                }
              }
              step_bkp = step;
              break;
            case 0x09: // Note On

              if (ev.parameter2 > 0)
              {
               /* var found = false
                for (var k = 0; k < noteBuffer.length; ++k)
                {
                  if (noteBuffer[k] && (noteBuffer[k].event.note == ev.parameter1) && (noteBuffer[k].channel == ev.midiChannel))
                  {
                    found = true;
                  }
                }
                if (found)
                {
                  step_bkp = step;
                } else
                {*/
                  var noteEvent = new MidiEvent(step, ev.midiChannel, new Note(ev.parameter1, 0, ev.parameter2));
                  songTrack.events.push(noteEvent);
                  noteBuffer.push(noteEvent);
//                }
              } else
              {
                { // ベロシティ0 つまり Note Off
                  for (var k = 0; k < noteBuffer.length; ++k)
                  {
                    if (noteBuffer[k] && (noteBuffer[k].event.note == ev.parameter1) && (noteBuffer[k].channel == ev.midiChannel))
                    {
                      noteBuffer[k] = null;
                    }
                  }
                }
                step_bkp = step;
              }
              break;
            case 0xa: // Polyphonic Key Pressure
              songTrack.events.push(new MidiEvent(step, ev.midiChannel, new PolyphonicKeyPressure(ev.parameter1, ev.parameter2)));
              break;
            case 0xb: // Control Change
              songTrack.events.push(new MidiEvent(step, ev.midiChannel, new ControlChange(ev.parameter1, ev.parameter2)));
              break;
            case 0xc: // Program Change
              songTrack.events.push(new MidiEvent(step, ev.midiChannel, new ProgramChange(ev.parameter1)));
              break;
            case 0xd: // Channel Pressure
              songTrack.events.push(new MidiEvent(step, ev.midiChannel, new ChannelPressure(ev.parameter1)));
              break;
            case 0xe: // Pitch Bend
              
              songTrack.events.push(new MidiEvent(step, ev.midiChannel, new PitchBend(ev.parameter1 | ev.parameter2 << 7)));
              break;
          }
          break;
        case "sysex":
          songTrack.events.push(new MidiEvent(step, 0, new SysEx(ev.metaData)));
          break;
        case "meta":
          switch (ev.metaType)
          {
            case 0x00: // Sequence No.
              break;
            case 0x01: // Text
              for (var t = 0; t < ev.metaData.length; ++t)
              {
                song.comment += String.fromCharCode(ev.metaData[t]);
              }
              break;
            case 0x02: // 著作権表示
              for (var t = 0; t < ev.metaData.length; ++t)
              {
                song.copyright += String.fromCharCode(ev.metaData[t]);
              }
              break;
            case 0x2f: // End Of Track
              songTrack.events.push(new MidiEvent(step,0,new EndOfTrack(i)));
              break;
            case 0x51: // Set Tempo
              {
                var setTempo = new MidiEvent(step, 0, new SetTempo());
                setTempo.event.setQuarterNoteMicroSec((ev.metaData[0] << 16) + (ev.metaData[1] << 8) + (ev.metaData[2]));
                songTrack.events.push(setTempo);
              }
              break;
            default:
              songTrack.events.push(new MidiEvent(step, 0, new MetaEvent(ev.metaType, ev.metaData)));
              break;
          }
          break;
      } 
    }
  }
}

function dumpInfo(target)
{
  var str = "";
  for (var i = 0; i < song.tracks.length;++i )
  {
    str += "【Track " + i + " " + song.tracks[i].name + "】<br/>";
    var events = song.tracks[i].events;
    for(var j = 0;j < events.length;++j)
    {
      var s = events[j].toFormatStr();
      str += s + "<br/>";
    }
  }
  target.html(str);
}

function displayInfo(song)
{
  $('#info').html('');
  var table = $('<table>', { 'id': 'songinfo','class':'table table-bordered' })
  .append($('<thead>').append($('<tr>').html('<th>Trk</th><th>Name</th><th>Port</th><th>CH</th><th>Data</th>')))
  .appendTo('#info');
  var tbody = $('<tbody>').appendTo('#songinfo');
  for(var i = 0;i < song.tracks.length;++i)
  {
    var row = $('<tr>',{'id':'track' + i});
    var track = song.tracks[i];

    var select = $('<select>', { 'type': 'text', 'class': 'form-control', 'trackNo': i.toString(), 'id': 'output' + ('00' + i.toString()).slice(-2) })
    .on('change', function (e)
    {
      var self = $(e.target);
      sequencer.setTrackOutput(parseInt(self.attr('trackNo')),parseInt(self.val()));
    })
    ;
    
    var outputs = sequencer.midiAccess.outputs();
    for(var j = 0,len = outputs.length;j < len;++j)
    {
      var output = outputs[j];
      $('<option>').val(j).text(output.name).appendTo(select);
    };
    
    row
     .append($('<td>').text(i))
     .append($('<td>').text(track.name))
     .append($('<td>').append(select))
     .append($('<td>').text('CH'))
     .append($('<td>').append($('<canvas>',{'id':'trackData' + i,'height':'12px','width':'300px'})));
    tbody.append(row);
  }
}

var sequencer = null;

$().ready(function ()
{
  var holder = $('#holder');
  navigator.requestMIDIAccess({ sysex: true }).then
  (function (access)
  {
    //MIDIアクセス取得成功
    sequencer = new Sequencer(access);
    $(sequencer).on('tempoChange', function (e)
    {
      $('#tempo').val(e.target.tempo.bpm);
    });

    $(sequencer).on('ready', function ()
    {
      $('#start').removeAttr('disabled');
      $('#stop').attr('disabled', 'disabled');
    });

    $(sequencer).on('playing', function ()
    {
      $('#start').attr('disabled', 'disabled');
      $('#stop').removeAttr('disabled', 'disabled');
    });

    $(sequencer).on('stopped', function ()
    {
      $('#start').removeAttr('disabled');
      $('#stop').attr('disabled', 'disabled');
    });


    if (window.File && window.FileReader)
    {
      holder.on('dragover', function () { $(this).addClass('hover'); return false; });
      holder.on('dragend', function () { $(this).removeClass('hover'); return false; });
      holder.on('drop', function (e)
      {
        this.className = '';
        e.preventDefault();
        var file = e.originalEvent.dataTransfer.files[0],
            reader = new FileReader();
        reader.onload = function (event)
        {
          decodeSMF(event.target.result);
          parseSMF(midiFile);
          $('#holder').text("SMFファイル(" + file.name + ")を読み込みました。");
          //dumpInfo($('#info'));
          sequencer.setSong(song);
          displayInfo(song);
          //sequencer.play();
          // dumpFileInfo($('#info')[0]);
        };
        reader.onerror = function (event)
        {
          alert("Error: " + reader.error);
        };
        reader.readAsArrayBuffer(file);
        return false;
      });
    }

    $('#start').attr('disabled', 'disabled');
    $('#stop').attr('disabled', 'disabled');


    $('input.slider').slider();

    $('#volume').on('slide', function (e)
    {
      sendCC(7, e.value);
    });

    $('#modulation').on('slide', function (e)
    {
      sendCC(1, e.value);
    });

    $('#reverbSend').on('slide', function (e)
    {
      sendCC(0x5b, e.value);
    });

    $('#chorusSend').on('slide', function (e)
    {
      sendCC(0x5d, e.value);
    });

    $('#variationSend').on('slide', function (e)
    {
      sendCC(0x5e, e.value);
    });

    $('#start').on('click', function (e)
    {
      sequencer.start();
      if (sequencer.status == "playing")
      {
        $('#start').attr('disabled', 'disabled');
        $('#stop').removeAttr('disabled');
      }
    });

    $('#stop').on('click', function (e)
    {
      sequencer.stop();
      if (sequencer.status == "stopped")
      {
        $('#start').removeAttr('disabled');
        $('#stop').attr('disabled', 'disabled');
      }
    });

    // Panic Button
    //$('#resetAllController').on('click', function (event)
    //{
    //  // check whether midi out is set or not
    //  if (typeof mOut != "object")
    //  {
    //    showMidiInOutSelM("divMidiOutSelWarning", "OUT", "resetAllController");
    //    return;
    //  }

    //  panic(mOut);

    //  // control button
    //  //document.getElementById("start").removeAttribute("disabled");

    //  var type = "click";
    //  var e = document.createEvent('MouseEvent');
    //  var b = document.getElementById("stop");
    //  e.initEvent(type, true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    //  b.dispatchEvent(e);

    //});

  },
  // MIDIAccess 取得失敗
  function (fail)
  {
    console.log("error", message);
    alert('error' + messeage);
  });
});