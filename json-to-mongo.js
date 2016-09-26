// File json-to-mongo.js

var parameters = require('./parameters.json');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://" + parameters.dbhost + ":" +parameters.dbport + "/" + parameters.dbname;
var stringafile;

fs.readdir(parameters.input_directory,function(err, files){
	
	// Gestione errore
	if (err) throw err;

	// Look su elenco dei file
	for(var i = 0; i < files.length; i++){
		

		if(files[i] != ".DS_Store")
		{
			console.log("");
			console.log("Reading file " + files[i] + " ......");
			console.log("");

			var dati = fs.readFileSync(parameters.input_directory + '/'+ files[i],'utf8','r'); 
			if (dati)
			{
				stringafile = stringafile + dati;
		
			} // fine if (dati)
		} // fine if(files[i] != ".DS_Store")
	
	} // Fine for su nomi file in directory

	var miocont = 0;
	if(stringafile.length > 0)
	{
		while(miocont < stringafile.length && stringafile[miocont] != "{" ){
			miocont++;
		}
		var len = stringafile.length; 
		stringafile = stringafile.substring(miocont,len);	
	}
	
	// se l'ultimo carattere è una , lo elimino
	if(stringafile.length > 0 && stringafile[stringafile.length-1] == ",")
	{
		var len = stringafile.length; 
		stringafile = stringafile.substring(0,len-1);
	}

	// se il file json non è contenuto in delle parentesi quadre le aggiunto.
	if(stringafile.length > 0 && stringafile[0] != "[")
	{
		stringafile = "["+stringafile+"]";
	}

	if(stringafile.length > 0)
	{
		var array_lead = new Array;
		array_lead= JSON.parse(stringafile);
	
	}
	
	// CONNESSIONE A DB
	MongoClient.connect(url, function(err, db) 
	{
  		assert.equal(null, err);
		insertDocuments(db, function() { db.close();}, array_lead); //end call insertDocuments
	}); //end MongoClient.Connect


}); // fine fs.readdir

//FUNZIONE INSERT IN DATABASE
var insertDocuments = function(db, callback, mioarray) {
  // Get the documents collection
  
  var collection = db.collection(parameters.collectionname);
  // Insert some documents
  collection.insertMany(mioarray, function(err, result) {
    assert.equal(err, null);
    assert.equal(mioarray.length, result.result.n);
    assert.equal(mioarray.length, result.ops.length);
    console.log("Inserted "+ mioarray.length +" documents into the collection");
    callback(result);
  });
}



