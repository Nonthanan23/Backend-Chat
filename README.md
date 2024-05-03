this is quick redo of the project 

GET	/api/broadcast	hämta alla meddelanden som skickats till broadcast kanalen
POST	/api/broadcast	skapa ett nytt meddelande i broadcast kanalen
GET	/api/channel/	hämtar en lista över kanaler.
GET	/api/channel/:id	hämtar alla meddelanden i specifik kanal
PUT	/api/channel/	skapar en ny kanal. Kanalens namn ska skickas med.
POST	/api/channel/:id	skapa ett nytt meddelande i en specifik kanal som tidigare har skapats. Innehållet i ett meddelande bör vara minst anvsändare och innehåll.
DELETE	/api/channel/:id	tar bort en identiferad kanal som tidigare annonserats ut. (kräver auth) VG

this is api project create with no frontend work so check with thunderclient or insomnia. etc..
