/*
* Sequencer.js 
* Author:S.F.
* Copyright (c) 2014 Satoshi Fujiwara. All rights reserved.
*/
/// <reference path="../../scripts/jquery-2.1.0-vsdoc.js" />
/// <reference path="./nsx1.js" />
/// <reference path="../../scripts/bootstrap-slider.js" />
/// <reference path="../../scripts/jquery.knob.js" />
/// <reference path="./text2sysex.js" />
/// <reference path="./SMFreader.js" />
/// <reference path="./app.js" />
/// <reference path="./recorder.js" />
/// <reference path="./sequencer.js" />
/// <reference path="./recorderWorker.js" />

function Sequence_editor(song,sequencer)
{
  this.song = song;
  this.sequencer = sequencer;
}