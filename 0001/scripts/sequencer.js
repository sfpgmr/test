/*
* Sequencer.js 
* Author:S.F.
* Copyright (c) 2014 Satoshi Fujiwara. All rights reserved.
*/


function MidiEvent(step,channel,event)
{
  this.step = step;
  this.channel = channel;
  this.event = event;
}

MidiEvent.prototype.toFormatStr = function ()
{
  return ("      " + this.step.toString()).slice(-6) + " " +
  ("  " + this.channel.toString()).slice(-2) + " " + 
  this.event.toFormatStr();
}

MidiEvent.prototype.play = function (sequencer, time,step)
{
  this.event.play(sequencer,this,time,step);
}

function Note(note,gate,velocity)
{
  this.note = note;
  this.gate = gate;
  this.velocity = velocity;
  this.noteon = new Uint8Array(3);
  this.noteoff = new Uint8Array(3);
}

Note.prototype.compile = function()
{
  this.noteon.set([0x90, this.note, this.velocity]);
  this.noteoff.set([0x90, this.note, 0]);
}

Note.prototype.play = function (sequencer, event,time,step)
{
//  console.log(performance.now() + " " + time + " " + this.toFormatStr());
  sequencer.send([0x90 | event.channel,this.note,this.velocity],time);
  sequencer.send([0x80 | event.channel,this.note,0x40],time + sequencer.convertStepToTime(this.gate));
}

var noteData = [];

{
  var nt = ["C ", "C#", "D ", "D#", "E ", "F ", "F#", "G ", "G#", "A ", "A#", "B "];
  for (var i = 0; i < 127;++i)
  {
    var oct = parseInt(i / 12) + 1;
    var ntno = i % 12;
    noteData.push(nt[ntno] + oct.toString());
  }
}

Note.prototype.toFormatStr = function ()
{
  return noteData[this.note] + " " + ("      " + this.gate.toString()).slice(-6) + " " + ("   " + this.velocity.toString()).slice(-3);
}

function ProgramChange(val)
{
  this.val = val;
  this.data = new Uint8Array(2);
}

ProgramChange.prototype.compile = function ()
{
  this.data.set([0xc0,this.val]);
}

ProgramChange.prototype.play = function (sequencer, event, time,step)
{
  sequencer.send([0xc0 | event.channel,this.val],time);
}

ProgramChange.prototype.toFormatStr = function ()
{
  return "Program Change " +
  ("   " + this.val.toString()).slice(-3);
}

function ChannelPressure(val)
{
  this.val = val;
  this.data = new Uint8Array(2);
}

ChannelPressure.prototype.compile = function ()
{
  this.data.set([0xd0,this.val]);
}

ChannelPressure.prototype.play = function (sequencer, event, time,step)
{
  sequencer.send([0xd0 | event.channel, this.val], time);
}

ChannelPressure.prototype.toFormatStr = function()
{
  return "Channel Pressure " +
  ("   " + this.val.toString()).slice(-3);
}

function PolyphonicKeyPressure(note,val)
{
  this.note = note;
  this.val = val;
  this.data = new Uint8Array(3); 
}

PolyphonicKeyPressure.prototype.compile = function ()
{
  this.data.set([0xa0, this.note, this.value]);
}

PolyphonicKeyPressure.prototype.play = function (sequencer, event, time,step)
{
  sequencer.send([0xa0 | event.channel, this.note, this.value], time);
}

PolyphonicKeyPressure.prototype.toFormatStr = function()
{
  return "Polyphonic KeyPressure " +
    noteData[this.note] + " " +
    ("   " + this.val.toString()).slice(-3);
}

function PitchBend(val)
{
  this.val = val;
  this.data = new Uint8Array(3);
}

PitchBend.prototype.compile = function ()
{
  this.set([0xe0,this.val >> 7,this.val & 0x7f]);
}

PitchBend.prototype.play = function (sequencer, event, time, step)
{
  console.log(this.toFormatStr() + " " + [0xe0 | event.channel, this.val & 0x7f, this.val >> 7 ].toString());
  sequencer.send([0xe0 | event.channel, this.val & 0x7f, this.val >> 7], time);
}

PitchBend.prototype.toFormatStr = function()
{
  return "Pitch Bend " +
  ("      " + this.val.toString()).slice(-6);
}

function ControlChange(val1,val2)
{
  this.val1 = val1;
  this.val2 = val2;
  this.data = new Uint8Array(3);
}

ControlChange.prototype.compile = function ()
{
  this.data.set([0xB0, this.val1, this.val2]);
}

ControlChange.prototype.play = function (sequencer, event, time,step)
{
  sequencer.send([0xB0 | event.channel,this.val1,this.val2],time);
}

var cc = [
"00 Bank Select MSB",
"01 Modulation MSB",
"02",
"03",
"04 Foot Control MSB",
"05 Portamento Time MSB",
"06 Data Entry MSB",
"07 Main Volume MSB",
"08 Balance Control MSB",
"09 ",
"0A Panpot MSB",
"0B Expression MSB",
"0C",
"0D",
"0E",
"0F",
"10",
"11",
"12",
"13",
"14",
"15",
"16",
"17",
"18",
"19",
"1A",
"1B",
"1C",
"1D",
"1E",
"1F",
"20 Bank Select LSB",
"21 Modulation LSB",
"22",
"23",
"24 Foot Control LSB",
"25 Portamento Time LSB",
"26 Data Entry LSB",
"27 Main Volume LSB",
"28 Balance Control LSB",
"29 ",
"2A Panpot LSB",
"2B Expression LSB",
"2C",
"2D",
"2E",
"2F",
"30",
"31",
"32",
"33",
"34",
"35",
"36",
"37",
"38",
"39",
"3A",
"3B",
"3C",
"3D",
"3E",
"3F",
"40 Sustain (Damper)",
"41 Portamento",
"42 Sostenuto",
"43 Soft Pedal",
"44",
"45 Hold 2 (Freeze)",
"46",
"47 Harmonic Content",
"48 Rlease Time",
"49 Attack Time",
"4A Brightness",
"4B Decay Time",
"4C Vibrato Rate",
"4D Vibrato Depth",
"4E Vibrato Delay",
"4F",
"50 General Purpose Controller (Articulation 1)",
"51 General Purpose Controller (Articulation 2)",
"52 General Purpose Controller ",
"53 General Purpose Controller ",
"54 Portamento Control",
"55",
"56",
"57",
"58",
"59",
"5A",
"5B Effect1 Depth (Reverb Send Level)",
"5C Tremolo Depth",
"5D Effect3 Depth (Chorus Send Level)",
"5E Effect4 Depth (Variation Send Level)",
"5F Phaser Depth",
"60 RPN Increment",
"61 RPN Decrement",
"62 NRPN LSB",
"63 NRPN MSB",
"64 RPN LSB",
"65 RPN MSB",
"66",
"67",
"68",
"69",
"6A",
"6B",
"6C",
"6D",
"6E",
"6F",
"70",
"71",
"72",
"73",
"74",
"75",
"76",
"77",
"78 All Sound Off",
"79 Reset All Controllers",
"7A",
"7B All Note Off",
"7C Omni Off",
"7D Omni On",
"7E Mono",
"7F Poly"
];

ControlChange.prototype.toFormatStr = function ()
{
  return "Control Change " + cc[this.val1] + " "
   + ("   " + this.val2.toString()).slice(-3);
}

function SysEx(dataArray)
{
  this.data = new Uint8Array(dataArray.length - 1);
  var j = 0;
  for(var i = 0;i < dataArray.length;++i)
  {
    if(i != 1)
    {
      this.data[j] = dataArray[i];
      ++j;
    }
  }
 // this.data = dataArray;
}

SysEx.prototype.compile = function()
{
 
}

SysEx.prototype.play = function (sequencer, event, time,step)
{
  //  for (var i = 0; i < this.data.length; ++i)
  //  {
  //    sequencer.send([this.data[i]], time + i * 10);
  //  }
 //  sequencer.send(this.data, time);
  sequencer.send(this.data, time);
}

SysEx.prototype.toFormatStr = function ()
{
  var sysexstr = "";
  for (var i = 0; i < this.data.length; ++i)
  {
    sysexstr += ("00" + this.data[i].toString(16)).slice(-2) + " ";
  }
  return "SysEx: " + sysexstr;
}

function MetaEvent(metaType,metaData)
{
  this.metaType = metaType;
  this.metaData = metaData;
}

MetaEvent.prototype.compile = function()
{
}

var metaType = 
[
"00 Sequence No.",
"01 Text",
"02 Copyright",
"03 Track Name",
"04 Instrument Name",
"05 Lyrics",
"06 Marker",
"07 Cue Point",
"08 Program Name",
"09 Device Name",
"0A",
"0B",
"0C",
"0D",
"0E",
"0F",
"10",
"11",
"12",
"13",
"14",
"15",
"16",
"17",
"18",
"19",
"1A",
"1B",
"1C",
"1D",
"1E",
"1F",
"20 MIDI Channel Prefix",
"21 Port Select",
"22",
"23",
"24",
"25",
"26",
"27",
"28",
"29",
"2A",
"2B",
"2C",
"2D",
"2E",
"2F Track End",
"30",
"31",
"32",
"33",
"34",
"35",
"36",
"37",
"38",
"39",
"3A",
"3B",
"3C",
"3D",
"3E",
"3F",
"40",
"41",
"42",
"43",
"44",
"45",
"46",
"47",
"48",
"49",
"4A",
"4B",
"4C",
"4D",
"4E",
"4F",
"50",
"51 Tempo",
"52",
"53",
"54 SMPTE Offset",
"55",
"56",
"57",
"58 Rythm",
"59 Major",
"5A ",
"5B Effect1 Depth (Reverb Send Level)",
"5C Tremolo Depth",
"5D Effect3 Depth (Chorus Send Level)",
"5E Effect4 Depth (Variation Send Level)",
"5F Phaser Depth",
"60 RPN Increment",
"61 RPN Decrement",
"62 NRPN LSB",
"63 NRPN MSB",
"64 RPN LSB",
"65 RPN MSB",
"66",
"67",
"68",
"69",
"6A",
"6B",
"6C",
"6D",
"6E",
"6F",
"70",
"71",
"72",
"73",
"74",
"75",
"76",
"77",
"78",
"79",
"7A",
"7B",
"7C",
"7D",
"7E",
"7F"
];

MetaEvent.prototype.toFormatStr = function ()
{
  var str = metaType[this.metaType] + " ";
  for (var i = 0; i < this.metaData.length; ++i)
  {
    str += ("00" + this.metaData[i].toString(16)).slice(-2) + " ";
  }
  return str;
}

MetaEvent.prototype.play = function (sequencer, event, time,step)
{
  
}

function SetTempo()
{
  this.QuarterNoteMilliSec =  0 ;
  this.bpm = 0 ;
}

SetTempo.prototype.setQuarterNoteMicroSec = function (value)
{
  this.QuarterNoteMilliSec = value / 1000.0;
  this.bpm = 60.0 * 1000.0 * 1000.0 / value;
}

SetTempo.prototype.play = function (sequencer, event, time,step)
{
  sequencer.setTempoMap(time,step,this.bpm);
}

SetTempo.prototype.toFormatStr = function ()
{
  return "Set Tempo " + this.bpm.toString();
}

 
function Track(name,comment,output)
{
  this.name = name;
  this.comment = comment?comment:"";
  this.output = output?output:null;
  this.events = [];
}

function Song(name)
{
  this.name = name;
  this.comment = "";
  this.copyright = "";
  this.tracks = [];
}

function TrackInfo()
{
  this.step = 0;
  this.index = 0;
}

function Tempo(time,step,bpm,stepsPerBeat)
{
  this.time = time;
  this.step = step;
  this.bpm = bpm;
  this.quaterNoteMilliSec = (60000.0 / bpm);
  this.milliSecPerStep = (60000.0 / bpm) / stepsPerBeat ;
  this.stepsPerBeat = stepsPerBeat;
}

function Sequencer(output)
{
  this.output = output;
  this.song = null;
  this.stepsPerBeat = 480.0;
  this.status = "stop";
  this.trackInfos = [];
  this.startTime = 0.0;
  this.tempoMap = [];
  this.tempo = null;
  this.initTempoMap(120.0);
  this.id = null;
}

Sequencer.prototype.initTempoMap = function (tempo)
{
  this.tempoMap = [];
  this.setTempoMap(0.0, 0, tempo);
}
Sequencer.prototype.setTempoMap = function (time, step, bpm)
{
  var tempo = this.tempoMap[this.tempoMap.length - 1];
  if (tempo && tempo.step == step && tempo.bpm == bpm)
  {
    return;
  }
  this.tempo = new Tempo(time, step, bpm, this.stepsPerBeat);
  this.tempoMap.push(this.tempo);
  $(this).trigger("tempoChange");
}

Sequencer.prototype.getTime = function(step)
{
  var tempo = this.tempo;
  var time = tempo.time + this.convertStepToTime(step - tempo.step);
  return time;
}

Sequencer.prototype.convertStepToTime = function(step)
{
  return this.tempo.milliSecPerStep * step;
}

Sequencer.prototype.setSong = function (song)
{
  if (this.status != "stopped")
  {
    this.stop();
  }
  this.song = song;
  this.stepsPerBeat = song.stepsPerBeat;
  this.initTracks();
  if(this.output)
  {
    $(this).trigger('ready');
  }
}

Sequencer.prototype.setOutput = function (output)
{
  if(output)
  {
    this.output = output;
    
  }
}

Sequencer.prototype.initTracks = function ()
{
  this.initTempoMap(120.0);
  this.trackInfos = [];
  for (var i = 0,l = this.song.tracks.length; i < l; ++i)
  {
    this.trackInfos.push(new TrackInfo());
  }
}


Sequencer.prototype.start = function ()
{
  if (!song || this.status == "playing" || !this.output) return;

  this.status = "playing";
  this.initTracks();
  this.startTime = performance.now();
  this.play();
  var self = this;
  this.id = window.setInterval(function () { self.play(); }, 100);
}

Sequencer.prototype.stop = function ()
{
  if (!Song || this.status == "stopped") return;
  clearInterval(this.id);
  this.id = null;
  if (this.output)
  {
    allSoundOff(this.output);
  }
  this.status = "stopped";
}

Sequencer.prototype.pause = function()
{
  
}

Sequencer.prototype.rew = function()
{
  
}

Sequencer.prototype.play = function ()
{
  var tracks = this.song.tracks;
  var maxStep = this.tempo.step + (performance.now() - this.startTime - this.tempo.time + 200.0) / this.tempo.milliSecPerStep;
  for (var i = 0, len = tracks.length; i < len; ++i)
  {
    var track = tracks[i];
    var trackInfo = this.trackInfos[i];
    var index = trackInfo.index;

    while (index < track.events.length)
    {
      var event = track.events[index];
      var step = event.step;
      //    trackInfo.step += step;
      if ((trackInfo.step + step) < maxStep)
      {
        trackInfo.step += step;
        var time = this.getTime(trackInfo.step);
        event.play(this, time, trackInfo.step);
        ++index;
      } else
      {
        break;
      }
    }
    trackInfo.index = index;
  }
}

Sequencer.prototype.send = function (event, time)
{/*
  var hex = "";
  for (var i = 0; i < event.length; ++i)
  {
    hex += ('00' + event[i].toString(16)).slice(-2) + " ";
  }
  console.log(performance.now() + " " + time + " " + hex);*/
  this.output.send(event, time + this.startTime);
}