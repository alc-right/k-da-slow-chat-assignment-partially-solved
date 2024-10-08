import express, { Request, Response , Application } from 'express';
import cors from 'cors';
import path from "path";
import fs from 'fs';

const messagesFilePath= path.resolve(__dirname, '../db/messages.json');

const app: Application = express();
const port = 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    preflightContinue: true,
  }),
);

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hej från backend');
  //favoritedUsers = JSON.parse(fs.readFileSync(messagesFilePath  , 'utf8'));
});

app.get('/messages', (req: Request, res:Response) => {
  const messages = JSON.parse(fs.readFileSync(messagesFilePath, 'utf8'));

  res.status(200).json(messages);
  // Skicka tillbaka alla message som vi har lagrat; vart? db/fil,
  //
})

app.post('/messages', (req: Request, res:Response) => {
  const message = req.body.message;
  
  const testPerson =  {
    "name": "Leo-Karl"
  };
  const messagesFromDb = JSON.parse(fs.readFileSync(messagesFilePath, { encoding: 'utf-8' }));

  messagesFromDb.push(message);
  
  fs.writeFileSync(messagesFilePath, JSON.stringify(messagesFromDb));
  // Req.body från frontend, värdet från input field, skickas när man klickar submit. 
  // Lagra det meddelandet i våran db/fil
  res.status(201).json(testPerson);
});

app.listen(port, () => {
  console.log(`Server is running 🚀 at http://localhost:${port}\n'Cmd + click' the link above ☝️ to open it in the browser.`);
});