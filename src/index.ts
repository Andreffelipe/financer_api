import { configApp } from './config/config';
import app from './frameworks/web/server';

app.listen(configApp.PORT, () => console.log(`server on in port ${configApp.PORT}`));
