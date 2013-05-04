var morse = require('morse');
var childProcess = require('child_process');
var async = require('async');

// defining desired signal
var encoded = morse.encode('SOS');

function onoff (duration, callback) {
  // bash command to switch light on
  childProcess.exec('xset led 3',function (error, stdout, stderr){

  });
  
  setTimeout(function(){
    // bash command to switch light off
    childProcess.exec('xset -led 3',function (error, stdout, stderr){
      callback();
    });
  }, duration);

}

encoded = encoded.replace(/\s+/g, ''); 

arr = encoded.split('');

function ownlog(item, cb){
  if(item == '-'){
    // duration of a dash
    duration = 2000;
  }
  else if(item == '.'){
    // duration of a dot
    duration = 500;
  }
  else {
    duration = 0;
    cb();
  }
  onoff(duration,function(){
    console.log(item + ' ' + duration);
  });
  setTimeout(function(){
    cb(); 
  },300 + duration);
}

async.eachSeries(arr, ownlog, function(err){
    // if any of the saves produced an error, err would equal that error
    if (err) throw err;
});

