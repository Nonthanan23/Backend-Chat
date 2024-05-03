this is quick redo of the project 

this is api project create with no frontend work so check with thunderclient or insomnia. etc..

![Skärmbild 2024-05-03 165331](https://github.com/Nonthanan23/Backend-Chat/assets/143596393/af262ff3-a86c-4970-8305-25c9213600e1)

Hej och välkomna jag heter nonthanan wanpen 
Och det här är min chat room api som jag kom till den har inga frontend och jag valde insomnia för att testa dem

först så har jag GET /api/broadcast` hämtar alla meddelanden från en specifik "broadcast"-kanal, avsedd för meddelanden till alla 
POST /api/broadcast` gör det möjligt för teammedlemmar att posta nya meddelanden till broadcast-kanalen, vilket säkerställer att alla får kritiska uppdateringar samtidigt.

GET /api/channels` listar alla kanaler, vilket gör att man kan se olika kommunikationsströmmar, kanske tillägnade specifika ämnen eller projekt.
PUT /api/channels` möjliggör skapandet av nya kanaler, vilket är avgörande för att organisera diskussioner kring nya projekt eller specifika team.

POST /api/channels/:id` möjliggör postning av nya meddelanden till en specifik kanal, vilket underlättar kommunikationen för kanalen

GET /api/channels/:id` hämtar meddelanden från en specifik kanal med dess unika ID, vilket hjälper att komma ikapp med missade diskussioner.

DELETE /api/channels/:channelId` tillåter radering av en kanal och alla dess associerade meddelanden, användbart för att rensa upp efter projektavslutning eller när en diskussionskanal inte längre behövs.

Och MongoDB-databas används för att lagra kanaler och meddelanden, vilket utnyttjar MongoDB:s förmåga att hantera stora mängder data effektivt.
- Applikationen säkerställer att den väsentliga "broadcast"-kanalen skapas om den inte finns, vilket är avgörande för att alltid ha en standardkommunikationskanal tillgänglig
