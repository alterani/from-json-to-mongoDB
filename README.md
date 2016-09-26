# from-json-to-mongoDB
This software is an utility to import json files into your database mongodb. It works in nodes environment.

#System requirements
- nodejs
- mongodb

#Installation command
<p>Only first time</p>
<p><CODE>npm install</CODE></p>

#Start command
<p>To execute script type this command:</p>
<p><CODE>node json-to-mongo.js</CODE> </p>


#Config file
## All settings are defined in parameters.json file. 
<p>In order to setup your parameters use json syntax.</p> 
<p>Before to run check and configure your setting in this file.</p>

Under, you can see description for each parameters:

- <b>input_directory:</b> This is a local path on your machine. Input directory path. Where your files json are stored.

- <b>dbhost:</b> Hostname or ip address where mongodb service is running.

- <b>dbport:</b> Port number where mongodb service is running.

- <b>dbname:</b> Database name.

- <b>collectionname:</b> Collection Name.





